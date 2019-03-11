import React, { Component } from 'react'
import firebase from 'firebase'

class HomePage extends Component {

    constructor(props){
        super(props)
        this.state = {
            isProducts: false,
            products: null,
            newProduct: {
                nombre: null,
                desc: null,
                cantidad: null
            }
        }
    }

    componentDidMount = () => {
        firebase.firestore().collection('products_crud')
            .onSnapshot((products)=>{
                let products_array = []
                products.forEach((product)=>{
                    products_array.push(product.data())
                })
                this.setState({products: products_array, isProducts: true})
            })
    }


    updateName=(e)=>{
      //let nombre=this.state.newProduct.nombre
      //let {nombre} = this.state.newProduct
      let product = this.state.newProduct
      product.nombre=e.target.value
      this.setState({newProduct:product})
    }
    updateDesc=(e)=>{
        let product = this.state.newProduct
        product.desc=e.target.value
        this.setState({newProduct:product})
    }

    updateCantidad = (e) => {
        let product = this.state.newProduct
        product.cantidad = e.target.value
        this.setState({newProduct: product})
    }

    createProduct = (e) => {
        firebase.firestore().collection('products_crud').add(this.state.newProduct)
            .then(()=>{
                alert("Producto añadido correctamente")
                let copy = this.state.newProduct
                copy.nombre = ""
                copy.desc = ""
                copy.cantidad = ""
                this.setState({newProduct: copy})
            })
            .catch((err)=>{
                alert("No se pudo crear el producto, checa la consola")
                console.log(err)
            })
    }

    render(){
        return (
            <div className="container">
                <div className="products_container">
                    {this.state.isProducts ?
                        this.state.products.map((product, index)=>(
                            <p>Nombre: {product.nombre}    Descripcion: {product.desc}    Cantidad: {product.cantidad} </p>
                        ))
                        :null
                    }
                </div>

                <div className="products_form">
                    <p>Sube tu producto a la tiendita</p>

                    <input type="text" 
                        value={this.state.newProduct.nombre} 
                        placeholder="Nombre" 
                        onChange={(e)=>this.updateName(e)}
                    />

                    <input type="text" 
                        value={this.state.newProduct.desc} 
                        placeholder="Descripción"
                        onChange={(e)=>this.updateDesc(e)}
                    />

                    <input type="number" 
                        placeholder="Cantidad" 
                        onChange={(e)=>this.updateCantidad(e)} 
                        value={this.state.newProduct.cantidad} 
                    />

                    <button onClick={(e)=>this.createProduct(e)}>Subir</button>
                </div>
            </div>
        )
    }
}

export default HomePage

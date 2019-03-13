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
            },
            action: "Subir",
            idProductToEdit: null
        }
    }
/*
{
    nombre: "aesdg",
    desc: "sdgf",
    cantidad: "sfdgf",
    id: "SFHSHJHDG"
}
*/
    componentDidMount = () => {
        firebase.firestore().collection('products_crud')
            .onSnapshot((products)=>{
                let products_array = []
                products.forEach((product)=>{
                    //product.id -> Aqui viene el nombre del documento (id)
                    let product_object = product.data()
                    product_object.id = product.id
                    products_array.push(product_object)
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
        if(this.state.action === "Subir")
        {
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
        else //Actualizar el producto
        {
            firebase.firestore().collection('products_crud').doc(this.state.idProductToEdit)
            .set(this.state.newProduct)
            .then(()=>alert("Producto actualizado correctamente"))
            .catch((err)=>{
                alert("No se pudo actualizar el producto")
                console.log(err)
            })
        }
        
    }

    updateProduct = (e, id) => {
        e.preventDefault()
        let productToEdit = this.state.products.filter((product)=>product.id === id)[0]
        console.log(productToEdit)
        this.setState({newProduct: productToEdit, action: "Actualizar", idProductToEdit: id})
    }

    cancelUpdate = () => {
        let copy = this.state.newProduct
        copy.nombre = ""
        copy.desc = ""
        copy.cantidad = ""
        copy.id = ""
        this.setState({newProduct: copy, action: "Subir", idProductToEdit: null})
    }

    deleteProduct = (e, id) => {
        e.preventDefault()
        if(window.confirm("¿Estás seguro de querer eliminar este producto?"))
        {
            firebase.firestore().collection("products_crud").doc(id).delete()
                .then(()=>alert("Producto eliminado correctamente"))            
                .catch((err)=>{
                    alert("No se puedo eliminar el producto")
                    console.log(err)
                })
        }
    }

    render(){
        return (
            <div className="container">
                <div className="products_container">
                    {this.state.isProducts ?
                        this.state.products.map((product, index)=>(
                            <div key={index}>
                                <p>Nombre: {product.nombre}    Descripcion: {product.desc}    Cantidad: {product.cantidad} </p>
                                <button onClick={(e)=>this.updateProduct(e, product.id)}>Editar</button>
                                <button onClick={(e)=>this.deleteProduct(e, product.id)}>Eliminar</button>
                            </div>
                        ))
                        :
                        <p>Cargando datos para ti papucho</p>
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

                    <button onClick={(e)=>this.createProduct(e)}>{this.state.action}</button>

                    {
                        this.state.action === "Actualizar" ? 
                            <button onClick={this.cancelUpdate}>Perdón, la cagué, quiero subir producto</button>
                            : null
                    }
                </div>
            </div>
        )
    }
}

export default HomePage

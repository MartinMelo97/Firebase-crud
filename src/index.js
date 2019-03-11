import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import{ BrowserRouter } from 'react-router-dom'
import firebase from 'firebase'

firebase.initializeApp({
        apiKey: "AIzaSyAfUID5SQ2qlWGTA8Jvdf_2nhUJDXoXHxo",
        authDomain: "farmaciabackend2.firebaseapp.com",
        databaseURL: "https://farmaciabackend2.firebaseio.com",
        projectId: "farmaciabackend2",
        storageBucket: "",
        messagingSenderId: "1092955129378"
    })

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

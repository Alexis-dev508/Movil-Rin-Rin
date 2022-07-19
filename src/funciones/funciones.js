import firebase from '../database/firebase';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
const db = firebase.db;
const auth = firebase.auth;
const storage = firebase.firebase.storage();



let Funciones = class{
    constructor(nombre, tamano, precio, ingredientes, tipo, Path){
        this.nombre = nombre,
        this.tamano = tamano,
        this.precio = precio,
        this.ingredientes = ingredientes,
        this.tipo = tipo,
        this.Path = Path,
        this.Blob = fetch(Path).then(r => r.blob())
       
    }
    
    nuevoProducto = async() =>{
        let array = this.Path.split('/');
        let name = array[array.length -1];
        console.log( 'nombre ' + this.nombre)
        console.log( 'tamaño ' + this.tamano)
        console.log( 'precio ' + this.precio)
        console.log( 'ingredientes ' +this.ingredientes)
        await db.collection(this.tipo).doc().set({
            nombrePizza: this.nombre,
            tamañoPizza: this.tamano,
            precioPizza: this.precio,
            ingredientesPizza: this.ingredientes
        }).then((result) =>{
            console.log( this.tipo + ' agregada!!');

        }).catch((result) =>{
            console.log('Error: ' + result);
        })

        // 'file' comes from the Blob or File API
        storage.ref('pizzas').child('imagenes/'+ name).put(this.Blob).then((snapshot) => {
            console.log('Uploaded a base64 or file!');
        }).catch((result) =>{
            console.log('Error: ' + result)
        });
     }
   
    
}
export default Funciones

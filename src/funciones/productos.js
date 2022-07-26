import firebase from '../database/firebase';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
const db = firebase.db;
const auth = firebase.auth;
const storage = firebase.firebase.storage();



let Productos =  class{
    constructor(nombre, tamano, precio, ingredientes, tipo, Path){
        this.nombre = nombre,
        this.tamano = tamano,
        this.precio = precio,
        this.ingredientes = ingredientes,
        this.tipo = tipo,
        this.Path = Path
    }
    
    nuevoProducto = async() =>{
        let array = this.Path.split('/');
        let name = array[array.length -1];
        var Blob = await fetch(this.Path).then(r => r.blob())
        var downloadUrl = ''
        // 'file' comes from the Blob or File API
       await storage.ref('pizzas').child('imagenes/'+ name).put(Blob).then(async function(snapshot) {
            await snapshot.ref.getDownloadURL().then(function(imgurl){
                downloadUrl = imgurl
                console.log(`Enlace de descarga de la imagen: ${downloadUrl} imgurl: ${imgurl}` )
                console.log('Uploaded a base64 or file!');
            })
           
        })


        console.log( 'nombre ' + this.nombre)
        console.log( 'tamaño ' + this.tamano)
        console.log( 'precio ' + this.precio)
        console.log( 'ingredientes ' +this.ingredientes)
       
        console.log('direccion de descarga: ' + downloadUrl)       
        await db.collection(this.tipo).doc().set({
            nombrePizza: this.nombre,
            tamañoPizza: this.tamano,
            precioPizza: this.precio,
            ingredientesPizza: this.ingredientes,
            downloadUrl: downloadUrl
        }).then((result) =>{
            console.log( this.tipo + ' agregada!!');

        }).catch((result) =>{
            console.log('Error: ' + result);
        })

  
     }
     
   
    
}
export default Productos

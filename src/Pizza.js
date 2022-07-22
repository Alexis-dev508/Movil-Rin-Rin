import { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, StyleSheet, ScrollView, FlatList} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import  firebase  from './database/firebase';
import Pelicula from './Pelicula';

export default function Pizza({navigation}){
    const db = firebase.db;
    const auth = firebase.auth;
    const storage = firebase.firebase.storage();
    let [productos, setProductos] = useState([])

   const productosFunc = (tipo) =>{
    db.collection(tipo).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
       
            let producto ={
                id: doc.id,
                nombre: doc.data().nombrePizza,
                precio: doc.data().precioPizza,
                tamano: doc.data().tamañoPizza,
                ingredientes: doc.data().ingredientes
            }
            productos.push(producto)
            
        });
    });
   }

   useEffect(()=>{
    productosFunc('pizzas')
   }, [])
       
   
   
   return(
    <ScrollView>
        
            <View style = {{color: 'red'}}>
            { productos.map( (p) => (
                <Pelicula key={p.id} nombre ={p.nombre} precio={p.precio}/>
            ) )}
            </View>
           
          
    </ScrollView> 
    );
}
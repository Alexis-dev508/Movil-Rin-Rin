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
    let productosP = []

   const productosFunc = async(tipo) =>{
    await db.collection(tipo).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
       
            let producto ={
                key: doc.id,
                nombre: doc.data().nombrePizza,
                precio: doc.data().precioPizza,
                tamano: doc.data().tamañoPizza,
                ingredientes: doc.data().ingredientes,
                downloadUrl: doc.data().downloadUrl
            }
            productosP.push(producto)
            
        });
        setProductos(productosP)
    });
   }

   
       
   
   
   return(
    <ScrollView>
        {
            useEffect(()=>{
                productosFunc('pizzas')
               }, [2])
        }
            <View style = {estilos.body}>
            { productos.map( (p) => (
                <Pelicula key={p.key} nombre ={p.nombre} precio={p.precio} downloadUrl= {p.downloadUrl}/>
            ) )}
            </View>
           
          
    </ScrollView> 
    );
}
const estilos = StyleSheet.create({
    body:{
        flex:1,
        alignItems: 'center',
        flexDirection: 'row'
    }
})
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from './src/database/firebase';

export default function App() {
  const db = firebase.db;
  const auth = firebase.auth;
  const storage = firebase.firebase.storage();

  const traerPizzas = async ()=>{
      console.log('hola')
       db.collection("pizzas").doc('DXo9TinFHr7mZIJcZ0H2').get().then((p)=>{
  
              console.log(p.data().nombrePizza)
      
      }).catch((errr)=>{
          console.log(errr.code +' '+ errr.message);
      })
      // console.log(pizzas.docs)
  
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title='Traer info' onPress={traerPizzas}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

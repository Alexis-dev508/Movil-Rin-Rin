import { useState } from 'react';
import {View, Button, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import  firebase  from './database/firebase';

export default function RegistrarPizza({navigation}){
    const db = firebase.db;
    const auth = firebase.auth;
    const storage = firebase.firebase.storage();

    const [state, setState] = useState({
        nombrePizza:'',
        tamanoPizza:'',
        precioPizza:'',
        ingredientesPizza: '',
    });
    const handleTextChange = (name, value) =>{
        setState({...state,[name]:value})
    }


    const nuevaPizza = async() =>{
        console.log( state.nombrePizza)
        console.log( state.tamanoPizza)
        console.log( state.precioPizza)
        console.log( state.ingredientesPizza)

        await db.collection('pizzas').doc().set({
            nombrePizza: state.nombrePizza,
            tamañoPizza: state.tamanoPizza,
            precioPizza: state.precioPizza,
            ingredientesPizza: state.ingredientesPizza,
        }).then((result) =>{
            console.log('Pizza agregada!!');

        }).catch((result) =>{
            console.log('Error: ' + result);
        })
    }
  

 
    return(
    <ScrollView>
          <View style={estilos.body}>
            <View style={estilos.imagen}>
              
                <TextInput 
                    style={estilos.input}
                    placeholder='Nombre de la Pizza'
                    onChangeText={(n)=>handleTextChange('nombrePizza', n)}
                />
                <TextInput 
                    style={estilos.input}
                    placeholder='Tamaño de la Pizza (rebanadas)'
                    onChangeText={(n)=>handleTextChange('tamanoPizza', n)}
                    keyboardType='email-address'
                />
                <TextInput 
                    style={estilos.input}
                    placeholder='Precio de la Pizza'
                    onChangeText={(n)=>handleTextChange('precioPizza', n)}
                    keyboardType='email-address'
                />
                <TextInput 
                    style={estilos.input}
                    placeholder='Ingredientes de la pizza'
                    onChangeText={(n)=>handleTextChange('ingredientesPizza', n)}
                    keyboardType='email-address'
                />
            </View>
        </View>
        <Button title="Guardar Pizza" onPress={nuevaPizza}></Button>
    </ScrollView>

    )
    
}
export const estilos = StyleSheet.create({
    body:{
        flex:1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
        top: 150
    
    },
    imagen_perfil:{
        width: 250,
        height: 250,
        borderRadius: 150,
        borderWidth: 0.5,
        borderColor: 'purple',
    },
    imagen:{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        top: -150,
    },
    input:{
        borderWidth: 0.5,
        borderColor: 'purple',
        marginHorizontal: 20,
        paddingHorizontal:10,
        margin: 10,
        borderRadius: 15,
        padding: 7,
        width:300,
        
    }
});
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
// import * as Linking from 'expo-linking'
export default function Pelicula({nombre, precio}){
   
 
    return(
        
        <TouchableOpacity  activeOpacity={0.5}>
            <View style = {estilos.cardContainer} >
      
                <Text style={estilos.titulo}>{nombre}</Text>
                <Text style={estilos.descripcion}>{precio}</Text>

            </View>
        </TouchableOpacity>
        
    )
}
const estilos = StyleSheet.create({
    cardContainer:{
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        opacity: 0.9,
        borderRadius: 15,
        top: 40,
        alignItems: 'center',
        height:350,
    },
    cardImage:{
        width:300,
        maxHeight: 200,
    },
    titulo:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    descripcion:{
        maxWidth: '90%',
        textAlign: 'justify'
    }
})
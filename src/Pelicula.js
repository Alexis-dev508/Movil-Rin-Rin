import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from "react-native"
import { black, white } from "react-native-paper/lib/typescript/styles/colors"
// import * as Linking from 'expo-linking'
export default function Pelicula({nombre, precio, downloadUrl}){
   
 
    return(
        
        <TouchableOpacity style={estilos.opacityContainer}  activeOpacity={0.5}>
            <View style = {estilos.cardContainer} >
                    <Image source={{uri: downloadUrl}} resizeMode="cover"  style={{ width: '100%', height: '60%' }} />

                    <View>
                        <Text></Text>
                    <Text style={estilos.titulo}>{nombre}</Text>
                    <Text style={estilos.descripcion}>Precio:${precio}</Text>
                    <Text></Text>
                    </View>
                    
            </View>
        </TouchableOpacity>
        
    )
}
const estilos = StyleSheet.create({
    cardContainer:{
        backgroundColor: '#1694E0',
        opacity: 0.9,
        top: 40,
        alignItems: 'center',
        height:300,
        width:180,
        maxWidth:300,
        
       
    },
    cardImage:{
        width:300,
        maxHeight: 180,
        paddingBottom: 10,
    },
    titulo:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
        color: 'white',
        backfaceVisibility:'visible'
    },
    descripcion:{
        maxWidth: '90%',
        textAlign: 'center',
        color: 'white',
    },
    opacityContainer:{
        padding: 10
    }
})
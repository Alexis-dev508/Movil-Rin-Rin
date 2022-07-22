import { useState, useEffect } from 'react';
import {View, Text, ScrollView, Button, TextInput, Image, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import {FontAwesome} from 'react-native-vector-icons';
import  firebase  from './database/firebase';
import { estilos } from './RegistrarPizza';


const DetalleProducto = ({navigation, nombre, descripcion, ingredientes, tamano })=>{
    const db = firebase.db;
    const auth = firebase.auth;
    const storage = firebase.firebase.storage();


    const [state, setState] = useState({
      combinacion1: 0,
      combinacion2: 0,
      backgroundColorTipo1: '#E1D5D9',
      backgroundColorTipo2: '#E1D5D9',
      backgroundColorIngr1: '#E1D5D9',
      backgroundColorIngr2: '#E1D5D9',
      backgroundColorIngr3: '#E1D5D9',
      backgroundColorIngr4: '#E1D5D9',
    });
    const [arrayIngr, setArrayIngr] = useState([])
    const [arrayTipo, setArrayTipo] = useState([])
   
    var arrayIngrP = []
    var arrayTipoP = []


    var imagen = require("./img/cuadrada.jpg");
   const cambiarColor= (objeto) =>{
    try {
        setState({...state,[objeto.nombreElem]: '#E1D5D9'})
    } catch (error) {
        
    }
   
   }
    var validarIngr = (ingr, elemento)=>{
        if(arrayIngr.length >= 2){
            console.log('entro al eliminar')
            let objElim = arrayIngr.shift();
            console.log(`Eliminado: ${objElim.nombreElem}`)
            useEffect(cambiarColor(objElim), [])
            
            console.log(`Se cambio ${state.backgroundColorIngr1}`)
            const obj = {
                nombreIngr: ingr,
                nombreElem: elemento,
            }
            arrayIngrP.push(obj)
            setArrayIngr([...arrayIngr, obj]) 
        }
        else{
            console.log('entro al agregar 2')
            const obj = {
                nombreIngr: ingr,
                nombreElem: elemento,
            }
            arrayIngrP.push(obj)
            setArrayIngr([...arrayIngr, obj]) 
          
        }

        console.log(`Esto: ${arrayIngrP}`);
    }


    return(
        <ScrollView style= {estilosDetalle.body}>
  
                <View style={estilosDetalle.imageContainer}>
                    <Image source={imagen} style={estilosDetalle.image}/>
                </View>
                <View style={estilosDetalle.titleContainer}>
                    <Text style={estilosDetalle.title}>Pizza Cuadrada</Text>
                </View>
                <View style={estilosDetalle.detailsContainer}>
                    <View style={estilosDetalle.infoContainer}>
                    <Text style={estilosDetalle.infoTextUp}>precio</Text> 
                       <Text style={estilosDetalle.infoText}>$250</Text> 
                    </View>
                    <View style={estilosDetalle.infoContainer}>
                    <Text style={estilosDetalle.infoTextUp}>tamaño</Text> 
                        <Text style={estilosDetalle.infoText}>26 piezas</Text>
                    </View>
                </View>
                <Text style={estilosDetalle.infoText}>¿Cómo desea su pizza?</Text> 
                <View style={estilosDetalle.detailsContainer}>
                    <TouchableOpacity onPress={()=> {console.log(`Esto es lo que trae:${arrayIngr.forEach((p)=>{console.log(p.nombreElem)})}`)}}>
                        <View style={estilosDetalle.infoContainer}>
                        <Text style={estilosDetalle.infoText2}>Combinada</Text> 
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={estilosDetalle.infoContainer}>
                            <Text style={estilosDetalle.infoText2}>Mitad y mitad</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={estilosDetalle.infoText}>¿Qué ingredientes desea?</Text> 
                <ScrollView style={estilosDetalle.detailsContainer2}>
                    <View style={estilosDetalle.detailsContainer2}>
                        <TouchableOpacity  onPress={()=> {validarIngr('pepperonni', 'backgroundColorIngr1'), setState({...state,['backgroundColorIngr1']:'#58545B'})}}>
                            <View style={{backgroundColor: state.backgroundColorIngr1,
                                margin: 25,
                                alignContent: 'center',
                                padding: 15,
                                width: 150
                            }}>
                        <Text style={estilosDetalle.infoText2}>Pepperoni</Text> 
                        </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=> {validarIngr('jamon', 'backgroundColorIngr2'),setState({...state,['backgroundColorIngr2']:'#58545B'})}}>
                            <View style={{backgroundColor: state.backgroundColorIngr2,
                                margin: 25,
                                alignContent: 'center',
                                padding: 15,
                                width: 150
                            }}>
                            <Text style={estilosDetalle.infoText2}>Jamón</Text>
                        </View>
                        </TouchableOpacity>
                    </View>


                    <View style={estilosDetalle.detailsContainer2} >

                        <TouchableOpacity onPress={()=> {validarIngr('salchicha', 'backgroundColorIngr3'),setState({...state,['backgroundColorIngr3']:'#58545B'})}}>
                            <View style={{backgroundColor: state.backgroundColorIngr3,
                                margin: 25,
                                alignContent: 'center',
                                padding: 15,
                                width: 150
                            }}>
                            <Text style={estilosDetalle.infoText2}>Salchicha</Text>
                        </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=> {validarIngr('champiñon', 'backgroundColorIngr4'),setState({...state,['backgroundColorIngr4']:'#58545B'})}}>
                            <View style={{backgroundColor: state.backgroundColorIngr4,
                                margin: 25,
                                alignContent: 'center',
                                padding: 15,
                                width: 150
                            }}>
                            <Text style={estilosDetalle.infoText2}>Champiñon</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

      
        </ScrollView>
    )
}


export default DetalleProducto;


const estilosDetalle = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#F6F2F6',
    },
 
    image: {
        width: '100%',
        height: 300
    },
    titleContainer:{
        width:'100%',
        backgroundColor: '#58545B',
        height: 50,

        alignItems: 'center',
        textAlignVertical: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    title: {
        color: 'white',
        fontWeight:'bold',
        fontSize: 20,
        opacity: 2,
        marginTop: 9,
        

    },
    detailsContainer:{
        flex:1,
        width: '100%',
        flexDirection: 'row',
    },

    infoContainer: {
        backgroundColor: '#E1D5D9',
        margin: 25,
        alignContent: 'center',
        padding: 15,
        width: 150
    },
    infoText:{
        fontSize:18,
        textAlign: 'center',
        fontWeight: 'bold',

    },
    infoTextUp:{
        fontSize:10,
        textAlign: 'center',
    },
    infoText2:{
        fontSize:15,
        textAlign: 'center',
        fontWeight: 'bold',

    },
    detailsContainer2:{
     display: 'flex',
     flexDirection: 'row', 
    },
    infoContainer2: {
        backgroundColor: '#E1D5D9',
        margin: 25,
        alignContent: 'center',
        padding: 15,
        width: 150
    },

});
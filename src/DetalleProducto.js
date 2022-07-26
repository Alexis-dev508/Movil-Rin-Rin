import { useEffect, useState } from 'react';
import {View, Text, ScrollView, Button, TextInput, Image, StyleSheet, TouchableOpacity, Switch, Modal, Alert} from 'react-native';
import  firebase  from './database/firebase';
import {AntDesign } from 'react-native-vector-icons';
import NumericInput from 'react-native-numeric-input'
import Pedidos from './funciones/pedidos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from 'react-native-storage';

export default function DetalleProducto({navigation, nombre, descripcion, ingredientes, tamano }){
    const db = firebase.db;
    const auth = firebase.auth;
    const storage = firebase.firebase.storage();
   //variables
   var [arrayIngr, setArrayIngr] = useState([])
   var [arrayTipo, setArrayTipo] = useState([])
   const [isEnabled, setIsEnabled] = useState(false);
   const [isEnabled2, setIsEnabled2] = useState(false);
   const [isEnabled3, setIsEnabled3] = useState(false);
   const [isEnabled4, setIsEnabled4] = useState(false);
   const [isEnabled5, setIsEnabled5] = useState(false);
   const [isEnabled6, setIsEnabled6] = useState(false);
   const [isEnabledDomicilio, setIsEnabledDomicilio] = useState(true);
   const [tipo1, setTipo1] = useState('');
   const [tipo2, setTipo2] = useState('');
   const [modalView, setModalView] = useState(false);
    const [domicilio, setDomicilio] = useState([])

   const [state, setState] = useState({
       callePrincipal: '',
       entreCalle1: '',
       entreCalle2: '',
       colorCasa: '',
       numeroCasa: '',
       nombreCliente: '',
       notasExtra: '',
       cantidadPizza: 0,
       numeroTelefono: '',
   });
    // Variables Local Storage
    var localstorage = new Storage({
        size: 1000,
        storageBackend: AsyncStorage,
        defaultExpires: null,
        enableCache:true,
    });
    global.localStorage = localstorage;

    async function guardarDomicilio( callePrincipal,entreCalle1,entreCalle2,colorCasa,numeroCasa,nombreCliente,notasExtra,cantidadPizza,numeroTelefono){ 
        console.log('Entre')
        if (isEnabledDomicilio){
            try {
                let array = ['callePrincipal','entreCalle1','entreCalle2','colorCasa','numeroCasa','nombreCliente','notasExtra','numeroTelefono'];
                let array2 = [callePrincipal,entreCalle1,entreCalle2,colorCasa,numeroCasa,nombreCliente,notasExtra,numeroTelefono]
                for (let i = 0; i < array.length; i++) {
                    localstorage.save({
                        key: `${array[i]}`,
                        data: array2[i] 
                    })  

                }
               
            } catch (error) {
                console.log(error)
            }
        }else{
            Alert.alert('No esta activado el switch')
        }
       
        
    }
    async function cargarDomicilio(){ 
        console.log('Entre')
      await  localstorage.getBatchData([
            {key: 'callePrincipal'},
            {key: 'entreCalle1'},
            {key: 'entreCalle2'},
            {key: 'colorCasa'},
            {key: 'numeroCasa'},
            {key: 'nombreCliente'},
            {key: 'notasExtra'},
            {key: 'numeroTelefono'}

        ]).then(results => {
            results.forEach(result => {
                console.log(results)
                setDomicilio(results)
            });
        }).then(results=>{
            let i = 0
            let array = ['callePrincipal','entreCalle1','entreCalle2','colorCasa','numeroCasa','nombreCliente','notasExtra','numeroTelefono'];
            array.forEach(elemento =>{
                setState({...state, [elemento]:domicilio[i]})
                i++
            })
        }).catch(error => console.log(error))
       
         
            
        
    }



   
    const handleTextChange = (name, value) =>{
        setState({...state,[name]:value})
    }

    const toggleSwitch = () =>  {
        setIsEnabled(previousState => !previousState);
        
        if(!isEnabled){
           setArrayIngr([...arrayIngr, 'Pepperoni'])
        }else{
            let index = arrayIngr.indexOf('Pepperoni');
            let eliminado =  arrayIngr.splice(index, 1);
            console.log(`Indice: ${index}  Eliminado ${eliminado}`)
        }
        console.log(`Toda la lista: ${arrayIngr}`)
    }
    const toggleSwitch2 = () => {
        setIsEnabled2(previousState => !previousState)
         if(!isEnabled2){
           setArrayIngr([...arrayIngr, 'Jamon'])
        }else{
            let index = arrayIngr.indexOf('Jamon');
            let eliminado =  arrayIngr.splice(index, 1);
            console.log(`Indice: ${index}  Eliminado ${eliminado}`)
        }
        console.log(`Toda la lista: ${arrayIngr}`)
    };
    const toggleSwitch3 = () => {
        setIsEnabled3(previousState => !previousState)
         if(!isEnabled3){
           setArrayIngr([...arrayIngr, 'Salchicha'])
        }else{
            let index = arrayIngr.indexOf('Salchicha');
            let eliminado =  arrayIngr.splice(index, 1);
            console.log(`Indice: ${index}  Eliminado ${eliminado}`)
        }
        console.log(`Toda la lista: ${arrayIngr}`)
    };
    const toggleSwitch4 = () => {
        setIsEnabled4(previousState => !previousState)
         if(!isEnabled4){
           setArrayIngr([...arrayIngr, 'Champiñon'])
        }else{
            let index = arrayIngr.indexOf('Champiñon');
            let eliminado =  arrayIngr.splice(index, 1);
            console.log(`Indice: ${index}  Eliminado ${eliminado}`)
        }
        console.log(`Toda la lista: ${arrayIngr}`)
    };
    const toggleSwitch5 = () => {
        setIsEnabled5(previousState => !previousState)
        if (!isEnabled5){
            setTipo1('Combinado')
            setTipo2('')
            setIsEnabled6(false)
        }else{
            setTipo1('')
           
        }   
    };
    const toggleSwitch6 = () => {
        setIsEnabled6(previousState => !previousState)
        if (!isEnabled6){
            setTipo2('Mitad y mitad')
            setTipo1('')
            setIsEnabled5(false)
        }else{
            setTipo2('')
           
        } 
    };
    const toggleSwitchDomicilio = () => {
        setIsEnabledDomicilio(previousState => !previousState)
      
    };
    var arrayIngrP = []
    var arrayTipoP = []


    var imagen = require("./img/cuadrada.jpg");
    
    useEffect(()=>cargarDomicilio, [])
    


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
                       <Text style={estilosDetalle.infoText} onPress={()=>{console.log(domicilio)}}>$250</Text> 
                    </View>
                    <View style={estilosDetalle.infoContainer}>
                    <Text style={estilosDetalle.infoTextUp}>tamaño</Text> 
                        <Text style={estilosDetalle.infoText} onPress={()=>{}}>26 piezas</Text>
                    </View>
                    
                </View>

                <View style={estilosDetalle.infoContainerNumeric}>
                    <Text style={estilosDetalle.infoText}>Elija la cantidad de pizzas que desea
                    
                    </Text>
                    <View style={{alignItems: 'center'}}>
                    <NumericInput  
                       onChange={value => setState({...state,['cantidadPizza']:value})} 
                       iconStyle={{ color: 'white' }} 
                       rightButtonBackgroundColor='#A5EEA0' 
                       leftButtonBackgroundColor='#E56B70'
                       rounded
                       minValue={1}
                       maxValue={10}
                       onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                       />
                       <Text style={estilosDetalle.infoTextUp}>{`Cantidad a pagar: $${state.cantidadPizza * 250}`}</Text> 
                    </View>
                    
                    
                </View>

                <Text style={estilosDetalle.infoText}>¿Cómo desea su pizza?</Text> 
                <View style={estilosDetalle.detailsContainer}>
                    <TouchableOpacity onPress={()=> {console.log(`Esto es lo que trae:${arrayIngr.forEach((p)=>{console.log(p)})}`)}}>
                        <View style={estilosDetalle.infoContainer}>
                        <Text style={estilosDetalle.infoText2}>Combinada
                        <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled5 ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch5}
                         
                                value={isEnabled5}
                            />
                        </Text> 
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={estilosDetalle.infoContainer}>
                            <Text style={estilosDetalle.infoText2}>Mitad y mitad
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled6 ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch6}
                         
                                value={isEnabled6}
                            />
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={estilosDetalle.infoText}>¿Qué ingredientes desea?</Text> 
                <ScrollView style={estilosDetalle.detailsContainer2}>
                    <View style={estilosDetalle.detailsContainer2}>
                        <TouchableOpacity >
                            <View style={estilosDetalle.infoContainer}>
                                <Text style={estilosDetalle.infoText2}>Pepperoni
                                <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                             />
                                </Text>
                         
                        </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity >
                            <View style={estilosDetalle.infoContainer}>
                            <Text style={estilosDetalle.infoText2}>Jamón{"\n"}
                           
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled2 ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch2}
                                value={isEnabled2}
                            />
                            </Text>
                            
                        </View>
                        </TouchableOpacity>
                    </View>


                    <View style={estilosDetalle.detailsContainer2} >

                        <TouchableOpacity>
                            <View style={estilosDetalle.infoContainer}>
                            <Text style={estilosDetalle.infoText2}>Salchicha
                            
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled3 ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch3}
                                value={isEnabled3}
                            />
                            </Text>
                            
                        </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity >
                            <View style={estilosDetalle.infoContainer}>
                            <Text style={estilosDetalle.infoText2}>Champiñon
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled4 ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch4}
                         
                                value={isEnabled4}
                            />
                            </Text>
                           
                        </View>
                        </TouchableOpacity>
                    </View>
                    <Button title='Ordenar Pizza' style={estilosDetalle.button} onPress={()=> {setModalView(true)}}/>
                </ScrollView>


                <Modal 
                    animationType='slide'
                    onDismiss={()=> console.log('close')}
                    onShow={()=>console.log('open')}
                    visible={modalView}
                    style={estilosDetalle.modalBody}
                >
                <TouchableOpacity onPress={()=> setModalView(false)}  style={estilosDetalle.closeButtonContainer}>
                    <AntDesign name="close" size={24} color="black"  style={estilosDetalle.closeButton}/>
                </TouchableOpacity>

            
                <View style={estilosDetalle.modalBody}>
                    <Text style = {{fontSize: 22, fontWeight: 'bold', margin: 10}}>¿A dónde desea que enviemos su pizza?</Text>
                    <TextInput 
                        style={estilosDetalle.input}
                        placeholder='Nombre del que recibira la pizza'
                        value={state.nombreCliente}
                        onChangeText={(n)=>handleTextChange('nombreCliente', n)}
                    />
                       <TextInput 
                        style={estilosDetalle.input}
                        placeholder='Numero de teléfono'
                        value={state.numeroTelefono}
                        onChangeText={(n)=>handleTextChange('numeroTelefono', n)}
                        keyboardType= 'decimal-pad'
                    />
                    <TextInput 
                        style={estilosDetalle.input}
                        placeholder='Calle principal'
                        value={state.callePrincipal}
                        onChangeText={(n)=>handleTextChange('callePrincipal', n)}
                    />
                    <TextInput 
                        style={estilosDetalle.input}
                        placeholder='Entre calle #1'
                        value={state.entreCalle1}
                        onChangeText={(n)=>handleTextChange('entreCalle1', n)}
                        
                    />
                     <TextInput 
                        style={estilosDetalle.input}
                        placeholder='Entre calle #2'
                        value={state.entreCalle2}
                        onChangeText={(n)=>handleTextChange('entreCalle2', n)}
                        
                    />
                    <TextInput 
                        style={estilosDetalle.input}
                        placeholder='Descripcion de la casa. Color, materiales, No. pisos, etc'
                        value={state.colorCasa}
                        onChangeText={(n)=>handleTextChange('colorCasa', n)}
                        keyboardType='email-address'
                    />
                    <TextInput 
                        style={estilosDetalle.input}
                        placeholder='Número de casa'
                        value={state.numeroCasa}
                        onChangeText={(n)=>handleTextChange('numeroCasa', n)}
                        keyboardType='decimal-pad'
                    />
                    <TextInput 
                        style={estilosDetalle.input}
                        placeholder='Escribe aqui mas referencias...'
                        value={state.notasExtra}
                        onChangeText={(n)=>handleTextChange('notasExtra', n)}
                        keyboardType='email-address'
                    />
                     <View>
                        <Text>
                            Guardar mi informacion de domicilio: 
                            <Switch
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={isEnabled3 ? "#f5dd4b" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitchDomicilio}
                                    value={isEnabledDomicilio}
                                />
                        </Text>
                     
                     </View>
                    
                

                    <Button title='Confirmar compra' style={estilosDetalle.button} onPress={()=>{
                        if(state.nombreCliente == '' ||state.cantidadPizza == 0|| state.callePrincipal == '' || state.entreCalle1 == '' ||state.colorCasa =='' ||state.entreCalle2 == ''|| state.numeroTelefono=='' || tipo1 == '' ){
                            Alert.alert('Ups!', `Favor de llenar todos los campos antes de continuar: ${tipo2}`)
                        }else{
                            
                            Alert.alert('¿Está seguro que desea ordenar?', `Su pedido: ${state.cantidadPizza} pizzas cuadradas de ${arrayIngr.toString()}. 
                            Total del pedido: $${state.cantidadPizza * 250}`, [
                                
                                {
                                  text: "Cancelar",
                                  onPress: () => setModalView(false),
                                  style: "cancel"
                                },
                                { text: "¡La quiero!", onPress: () => {
                                    const nuevoPedido = new Pedidos(state.callePrincipal,state.entreCalle1,state.entreCalle2,state.colorCasa,state.numeroCasa,state.nombreCliente,state.notasExtra,state.cantidadPizza, 'cuadrada', 250, arrayIngr, tipo1, tipo2, state.numeroTelefono );
                                    guardarDomicilio( state.callePrincipal,state.entreCalle1,state.entreCalle2,state.colorCasa,state.numeroCasa,state.nombreCliente,state.notasExtra,state.cantidadPizza,state.numeroTelefono)
                                    nuevoPedido.nuevoPedido()
                                } }
                              ])
                        }
                    }}/>
                </View>
            </Modal>

      
        </ScrollView>
    )
}



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
    infoContainerNumeric: {
        backgroundColor: '#E1D5D9',
        margin: 25,
        alignContent: 'center',
        padding: 15,
        width: 350,
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
        padding: 5,
        width: 150,
        flexDirection: 'row',
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    button:{width: '100%'},
    modalBody:{
        flex:1,

        alignItems: 'center',
        backgroundColor: 'white',
        alignContent: 'center',
        top: 20
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
        
    },
    closeButtonContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },

});
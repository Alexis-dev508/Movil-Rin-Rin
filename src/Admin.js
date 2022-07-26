
import { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, StyleSheet, ScrollView, Modal, Alert, TouchableOpacity, FlatList, StatusBar, Image, KeyboardAvoidingView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Ionicons, FontAwesome5, Foundation, AntDesign } from 'react-native-vector-icons';
import  firebase  from './database/firebase';
import Productos, * as funciones from './funciones/productos'
import * as ImagePicker from 'expo-image-picker';
import { setStatusBarTranslucent } from 'expo-status-bar';

const Admin = ({navigation}) =>{
    const db = firebase.db;
    const auth = firebase.auth;
    const storage = firebase.firebase.storage();
    const [data2, setData2] = useState([]);
    const [dataPedido, setDataPedido] = useState([]);
    var data=[];
    var dataP=[];


      const Item = ({ folio, nombrePizza, cantidadPizza, callePrincipal, calle1, calle2, colorCasa, numeroCasa, nombreCliente}) => (
        
            <View style={styles.item}>
                <TouchableOpacity>
                    <View><Text style={styles.text}><Text style={estilos.label}>Folio:</Text> {folio}</Text></View>
                    <View><Text style={styles.text}><Text style={estilos.label}>Pizza:</Text> {nombrePizza}</Text></View>
                    <View><Text style={styles.text}><Text style={estilos.label}>Cantidad:</Text> {cantidadPizza}</Text></View>
                    <View><Text style={styles.text}><Text style={estilos.label}>Domicilio:</Text> {callePrincipal} entre {calle1} y {calle2}</Text></View>
                    <View><Text style={styles.text}><Text style={estilos.label}>Color:</Text> {colorCasa}</Text></View>
                    <View><Text style={styles.text}><Text style={estilos.label}>Número:</Text> {numeroCasa}</Text></View>
                    <View><Text style={styles.text}><Text style={estilos.label}>Cliente:</Text> {nombreCliente}</Text></View>
                </TouchableOpacity>
            </View>
        
      );


      const renderItem =  ({ item }) => (
        <Item folio= {item.key} nombrePizza={item.nombrePizza} cantidadPizza={item.cantidadPizza} callePrincipal={item.callePrincipal} calle1={item.entreCalle1} calle2={item.entreCalle2} colorCasa={item.colorCasa} numeroCasa={item.numeroCasa} nombreCliente={item.nombreCliente}/>
      );

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
              data.push(producto)
                
            });
            setData2(data)
        });
       }
       const pedidosFunc = async(tipo) =>{
        await db.collection(tipo).get().then((querySnapshot) => {
             querySnapshot.forEach((doc) => {
            
                 let pedido ={
                    key: doc.id,
                    callePrincipal:doc.data().callePrincipal,
                    cantidadPizza: doc.data().cantidadPizza,
                    colorCasa: doc.data().colorCasa,
                    entreCalle1: doc.data().entreCalle1,                
                    entreCalle2: doc.data().entreCalle2,            
                    nombreCliente: doc.data().nombreCliente,           
                    nombrePizza: doc.data().nombrePizza,
                    notasExtra: doc.data().notasExtra,
                    numeroCasa: doc.data().numeroCasa,
                    tipo: doc.data().tipo,
                    total: doc.data().total
                    
                 }
               dataP.push(pedido)
                 
             });
             setDataPedido(dataP)
         });
        }

    const [state, setState] = useState({
        nombre:'',
        tamano:'',
        precio:'',
        ingredientes: '',
        tipo: '',
        modalPizzaView: false,
        productoIdArray: [],
        productoNombreArray: [],
        productoTamanoArray: [],
        productoPrecioArray: [],
        productoIngredientesArray: [],
    });
   
    const [Path, setPath] = useState('');


    const seleccionarImagen = async () => {
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64:true,
            // allowsEditing: true
        }
        let resultado = await ImagePicker.launchImageLibraryAsync()
        if (!resultado.cancelled){
            let ext = resultado.uri.split('.').pop();
            // setImagenBase64(resultado.base64);
            setPath(resultado.uri);
            
        }
    }   

    const handleTextChange = (name, value) =>{
        setState({...state,[name]:value})
    }
    
    return(
       
        <View>
             {
            
            useEffect(()=>{
                pedidosFunc('pedidos')
                console.log(dataP)
                }, [])
            
        }
                <Button title='Nueva Pizza' onPress={()=>{setState({...state, ['modalPizzaView']: true})}}/>
        <View style={estilos.titleContainer}>
                    <Text style={estilos.title}>Pedidos</Text>
                </View>
        <FlatList
                data={dataPedido}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        <ScrollView style={style.body}>
            
            <Modal 
                animationType='slide'
                onDismiss={()=> console.log('close')}
                onShow={()=>console.log('open')}
                visible={state.modalPizzaView}
                style={style.modalBody}
            >
                <TouchableOpacity onPress={()=> setState({...state,['modalPizzaView']:false})}  style={estilos.closeButtonContainer}>
                    <AntDesign name="close" size={24} color="black"  style={estilos.closeButton}/>
                </TouchableOpacity>

         
                <View style={estilos.modalBody}>
                    <Text style = {{fontSize: 22, fontWeight: 'bold', margin: 10}}>Registrar una nueva Pizza</Text>
                    <TextInput 
                        style={estilos.input}
                        placeholder='Nombre de la Pizza'
                        onChangeText={(n)=>handleTextChange('nombre', n)}
                    />
                    <TextInput 
                        style={estilos.input}
                        placeholder='Tamaño de la Pizza (rebanadas)'
                        onChangeText={(n)=>handleTextChange('tamano', n)}
                        keyboardType='decimal-pad'
                        
                    />
                    <TextInput 
                        style={estilos.input}
                        placeholder='Precio de la Pizza'
                        onChangeText={(n)=>handleTextChange('precio', n)}
                        keyboardType='decimal-pad'
                    />
                    <TextInput 
                        style={estilos.input}
                        placeholder='Ingredientes de la pizza'
                        onChangeText={(n)=>handleTextChange('ingredientes', n)}
                        keyboardType='email-address'
                    />
                    <Button title='Seleccioar Imagen' onPress={seleccionarImagen}/>
                

                    <Button title='Guardar' style={style.button} onPress ={()=> {
                        if(state.nombre == '' || state.precio == '' || state.tamano == '' || state.ingredientes == '' ){
                            Alert.alert('Ups!', 'Favor de llenar todos los campos antes de continuar')
                        }else{
                            const funcion = new Productos(state.nombre, state.tamano, state.precio, state.ingredientes, 'pizzas', Path);
                            funcion.nuevoProducto()
                        }
                        
                    }}/>
                </View>
            </Modal>
        </ScrollView>
        </View>
    )
}
export default Admin;
const style = StyleSheet.create({
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    button:{width: 2},
});
export const estilos = StyleSheet.create({
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
    label:{fontWeight: 'bold'},

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
    
});
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#E1D5D9',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,

    },
    title: {
      fontSize: 32,
    },
    text:{
        fontSize: 15,
    }
  });
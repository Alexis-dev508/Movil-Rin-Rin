
import { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, StyleSheet, ScrollView, Modal, Alert, TouchableOpacity} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Ionicons, FontAwesome5, Foundation, AntDesign } from 'react-native-vector-icons';
import  firebase  from './database/firebase';
import Funciones, * as funciones from './funciones/funciones'
import * as ImagePicker from 'expo-image-picker';
import { setStatusBarTranslucent } from 'expo-status-bar';

const Admin = ({navigation}) =>{
    const db = firebase.db;
    const auth = firebase.auth;
    const storage = firebase.firebase.storage();
  

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
    const [productoId, setProductoId] = useState([]);
    const [productoNombre, setProductoNombre] = useState([]);
    const [productoTamano, setProductoTamano] = useState([]);
    const [productoPrecio, setProductoPrecio] = useState([]);
    const [productoIngredientes, setProductoIngredientes] = useState([]);
    const [extencion, setExtencion] = useState("");
    const [Path, setPath] = useState('');
    const [File, setFile] = useState('');

    const seleccionarImagen = async () => {
        let options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            base64:true,
            // allowsEditing: true
        }
        let resultado = await ImagePicker.launchImageLibraryAsync(options)
        if (!resultado.cancelled){
            let ext = resultado.uri.split('.').pop();
            // setImagenBase64(resultado.base64);
            setPath(resultado.uri);
            setExtencion(ext)
        }
    }


   const traerProducto = async (tipo)=>{
        let productoId = [];
        let productoNombre = [];
        let productoTamano = [];
        let productoPrecio = [];
        let productoIngredientes = [];
       await db.collection(tipo).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                productoId.push(doc.id);
                productoNombre.push(doc.data().nombrePizza);
                productoTamano.push(doc.data().tamanoPizza);
                productoPrecio.push(doc.data().precioPizza);
                productoIngredientes.push(doc.data().ingredientesPizza);
                
            });
            setProductoId(productoId)
            setProductoNombre(productoNombre)
            setProductoTamano(productoTamano)
            setProductoPrecio(productoPrecio)
            setState({...state,['productoNombreArray']:productoNombre})
            setState({...state,['productoTamanoArray']:productoTamano})
            setState({...state,['productoPrecioArray']:productoPrecio})
            setState({...state,['productoIngredientesArray']:productoIngredientes})
            
        });
    
      
    }
       

    const handleTextChange = (name, value) =>{
        setState({...state,[name]:value})
    }

    // 
    useEffect(()=>{
       traerProducto('pizzas')
        console.log(productoId)
        console.log(productoNombre)
        tablaPizzas
    }, [])
    


    const [tablaPizzas, setTablaPizzas] = useState({
        
        tableHead: ['#', 'Nombre', 'Piezas', 'Precio'],
        tableData: [
          [productoId]
            
        ]
    })
    
    return(
        <ScrollView style={style.body}>
            <Button title='Crear Pizza' style={style.button} onPress={()=> setState({...state,['modalPizzaView']:true})}/>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <Row data={tablaPizzas.tableHead} style={style.head}/>
                <Rows data={tablaPizzas.tableData} style={style.text}/>
            </Table>



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
                            const funcion = new Funciones(state.nombre, state.tamano, state.precio, state.ingredientes, 'pizzas', Path);
                            funcion.nuevoProducto()
                        }
                        
                    }}/>
                </View>
            </Modal>
        </ScrollView>
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
    
    
});
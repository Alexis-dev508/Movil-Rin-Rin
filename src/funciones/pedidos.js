import firebase from '../database/firebase';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
const db = firebase.db;
const auth = firebase.auth;
const storage = firebase.firebase.storage();



let Pedidos = class{
    constructor(callePrincipal, entreCalle1, entreCalle2, colorCasa, numeroCasa,nombreCliente,notasExtra,cantidadPizza, nombrePizza, precio, arrayIngr, tipo1, tipo2, numeroTelefono ){

        this.callePrincipal= callePrincipal,
        this.entreCalle1=    entreCalle1,
        this.entreCalle2=    entreCalle2,
        this.colorCasa=      colorCasa,
        this.numeroCasa=     numeroCasa,
        this.nombreCliente=  nombreCliente,
        this.notasExtra=     notasExtra,
        this.nombre = nombrePizza,
        this.cantidadPizza = cantidadPizza,
        this.total= cantidadPizza * precio,
        this.ingredientes = arrayIngr.toString(),
        this.tipo1 = tipo1,
        this.tipo2 = tipo2,
        this.numeroTelefono = numeroTelefono
        this.fecha = new Date()
    }

    nuevoPedido = async() =>{

        let tipo  = ''
        if (this.tipo1 == ''){
            tipo = this.tipo2
        }else{
            tipo = this.tipo1
        }
        
        await db.collection('pedidos').doc().set({
            callePrincipal: this.callePrincipal,
            entreCalle1:    this.entreCalle1,
            entreCalle2:    this.entreCalle2,
            colorCasa:      this.colorCasa,
            numeroCasa:     this.numeroCasa,
            nombreCliente:  this.nombreCliente,
            notasExtra:     this.notasExtra,
            cantidadPizza:  this.cantidadPizza,
            nombrePizza: this.nombre,
            total: this.total,
            tipo: tipo,
            numeroTelefono:this.numeroTelefono,
            fecha: this.fecha,
            status: 'v'
        }).then((result) =>{
            console.log( 'Pedido agregado');

        }).catch((result) =>{
            console.log('Error: ' + result);
        })


        }
}
export default Pedidos;

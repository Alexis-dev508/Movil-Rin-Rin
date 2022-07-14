
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCe9AFCOQ1pf00xg2GYFSHdZ0R0WsCqHTg",
    authDomain: "rinrin-7d3d4.firebaseapp.com",
    projectId: "rinrin-7d3d4",
    storageBucket: "rinrin-7d3d4.appspot.com",
    messagingSenderId: "325462402381",
    appId: "1:325462402381:web:ec22d6e9d1e2fdf28e8304",
    measurementId: "G-QYX45K634S",
  }; 

  const app = firebase.initializeApp(firebaseConfig);

  const db = app.firestore();
  firebase.firestore().settings({experimentalForceLongPolling: true, merge: true});
  const auth = app.auth();

  export default{
    firebase,
    db,
    auth
  }
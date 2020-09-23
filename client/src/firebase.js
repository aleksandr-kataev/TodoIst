import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCUh_uWnoC9jSZ-kW9zW0-xrm47r8EHjt0',
  authDomain: 'todo-90cc6.firebaseapp.com',
  databaseURL: 'https://todo-90cc6.firebaseio.com',
  projectId: 'todo-90cc6',
  storageBucket: 'todo-90cc6.appspot.com',
  messagingSenderId: '75181480224',
  appId: '1:75181480224:web:5caeb0fea6213967be9f45',
  measurementId: 'G-WJ0KVWFR9Y',
});

export { firebaseConfig as firebase };

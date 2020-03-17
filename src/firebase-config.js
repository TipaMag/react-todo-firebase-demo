import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

export const app = firebase.initializeApp({
    apiKey: "AIzaSyCehSjYg8FgyisDoDlbXCcDHoCC4GrnnEw",
    authDomain: "react-todo-app-fbasedemo.firebaseapp.com",
    databaseURL: "https://react-todo-app-fbasedemo.firebaseio.com",
    projectId: "react-todo-app-fbasedemo",
    storageBucket: "react-todo-app-fbasedemo.appspot.com",
    messagingSenderId: "997845536632",
    appId: "1:997845536632:web:23471f6d839d6a1787c28d",
    measurementId: "G-L20W8P4BHQ"
})

export const base = firebase.firestore(app)
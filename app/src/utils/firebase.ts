import { initializeApp } from 'firebase/app'

export namespace FirebaseUtils {
    const firebaseConfig = {
        apiKey: "AIzaSyAFOPp7mg77VJtRzEiDpNLHLGUfayXbdP8",
        authDomain: "tcc-electrical-engineering.firebaseapp.com",
        projectId: "tcc-electrical-engineering",
        storageBucket: "tcc-electrical-engineering.appspot.com",
        messagingSenderId: "387380048271",
        appId: "1:387380048271:web:38eccc05304b05ad299bfa",
        measurementId: "G-362VJKH9WH"
    }

    export function initialize() {
        initializeApp(firebaseConfig)
    }
}
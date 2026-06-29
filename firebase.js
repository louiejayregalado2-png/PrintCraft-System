// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyCynqZ14nA41v5GDRXwvxbdcRmkeAfzV8M",

authDomain: "printcraft-system.firebaseapp.com",

projectId: "printcraft-system",

storageBucket: "printcraft-system.firebasestorage.app",

messagingSenderId: "1011335003199",

appId: "1:1011335003199:web:b3fef92a86a12e94728c8a",

measurementId: "G-Z1FYHM4T4K"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

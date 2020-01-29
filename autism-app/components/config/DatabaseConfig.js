import * as firebase from 'firebase';
import firestore from "firebase/firestore"

//Andrew
/*
let config = {
    apiKey: "AIzaSyAlY9-_gAdcySLPCcQC9nhdN1HlwMCgMVA",
    authDomain: "luminous-autism-app.firebaseapp.com",
    databaseURL: "https://luminous-autism-app.firebaseio.com",
    projectId: "luminous-autism-app",
    storageBucket: "luminous-autism-app.appspot.com",
    messagingSenderId: "778168364367",
    appId: "1:778168364367:web:c0921c034295be01f4e93a",
    measurementId: "G-1GCMSH8JQL"

};
*/

const firebaseConfig = {
    apiKey: "AIzaSyC703bHes1G2LkABHtyQrCSRf4pLj9VFcE",
    authDomain: "luminous-autism-application.firebaseapp.com",
    databaseURL: "https://luminous-autism-application.firebaseio.com",
    projectId: "luminous-autism-application",
    storageBucket: "luminous-autism-application.appspot.com",
    messagingSenderId: "926873838622",
    appId: "1:926873838622:web:7ba7ec2cf7208c75d97a0f",
    measurementId: "G-G4K9L1WRBZ"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
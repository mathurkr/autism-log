import * as firebase from 'firebase';
import firestore from "firebase/firestore"

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

firebase.initializeApp(config);

export default firebase;
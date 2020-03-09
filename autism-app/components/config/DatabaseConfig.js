import * as firebase from 'firebase';
import firestore from "firebase/firestore"

/*let config = {
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

var config = {
    apiKey: "AIzaSyA-ds-jn_zPyLFZ2PfYAHnJKFyPUtI6fBc",
    authDomain: "luminous-4c444.firebaseapp.com",
    databaseURL: "https://luminous-4c444.firebaseio.com",
    projectId: "luminous-4c444",
    storageBucket: "luminous-4c444.appspot.com",
    messagingSenderId: "943412298627",
    appId: "1:943412298627:web:c3ef2dae2a3a5f89a3ecb6"
};

firebase.initializeApp(config);

export default firebase;
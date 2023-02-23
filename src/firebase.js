import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCUzPUm2xu0xrUwlpSL6IcLMtpgXHlUpgw",
  authDomain: "cra-csr.firebaseapp.com",
  projectId: "cra-csr",
  storageBucket: "cra-csr.appspot.com",
  messagingSenderId: "911215413038",
  appId: "1:911215413038:web:ee45e2559622f940b85cbf",
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();

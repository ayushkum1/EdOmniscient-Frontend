import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3gWeFdRqyk-VQd41jUUvYlNchx0joiUc",
  authDomain: "collegedata-bc8d9.firebaseapp.com",
  databaseURL: "https://collegedata-bc8d9.firebaseio.com",
  projectId: "collegedata-bc8d9",
  storageBucket: "collegedata-bc8d9.appspot.com",
  messagingSenderId: "214131280810",
  appId: "1:214131280810:web:5300e506b1e07ec54079d3",
  measurementId: "G-DPQDRPX9E7",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase as default };

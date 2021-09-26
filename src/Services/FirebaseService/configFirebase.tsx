// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDx-JHliqD8emabRoDg0mh_HrbmTYcL81E",
  authDomain: "contact-list-react-demo.firebaseapp.com",
  projectId: "contact-list-react-demo",
  storageBucket: "contact-list-react-demo.appspot.com",
  messagingSenderId: "180667592290",
  appId: "1:180667592290:web:9a43e56bc32e45f80fab3b",
  measurementId: "G-9PD40D657J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
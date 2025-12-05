import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from "./components/App.jsx"
import "./styles/styles.css";
// import "./styles/proposal.css"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAINLIJy-d-jNY09ydz6O0fqevoPFFPB-s",
  authDomain: "project-homevest.firebaseapp.com",
  databaseURL: "https://project-homevest-default-rtdb.firebaseio.com",
  projectId: "project-homevest",
  storageBucket: "project-homevest.firebasestorage.app",
  messagingSenderId: "788914642826",
  appId: "1:788914642826:web:48b4c99f8311bfacafb273",
  measurementId: "G-XM0M8QTXS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BrowserRouter><App /></BrowserRouter>);
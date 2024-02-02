// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlyBphf0euicnTjOsWrcb5rdlfE_hUDJY",
  authDomain: "react-navite-project-985d8.firebaseapp.com",
  databaseURL: "https://react-navite-project-985d8-default-rtdb.firebaseio.com",
  projectId: "react-navite-project-985d8",
  storageBucket: "react-navite-project-985d8.appspot.com",
  messagingSenderId: "255608755262",
  appId: "1:255608755262:web:841769707a431415c9ed6f",
  measurementId: "G-V9JHZHH0P7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const tripsRef = collection(db, "trips");
export const epxensesRef = collection(db, "expenses");

export default app;

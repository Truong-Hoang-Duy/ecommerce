import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9tkhgHsP6eDZBnXnwe_fvHV2bdy79tPk",
  authDomain: "e-commerce-register-page.firebaseapp.com",
  projectId: "e-commerce-register-page",
  storageBucket: "e-commerce-register-page.appspot.com",
  messagingSenderId: "55733357316",
  appId: "1:55733357316:web:df1ed1fd589b8be55e9e51",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZEk_eD2Vte1oag7H5B1Q_qHp_aNGN5Yg",
  authDomain: "webvue-f6475.firebaseapp.com",
  projectId: "webvue-f6475",
  storageBucket: "webvue-f6475.appspot.com",
  messagingSenderId: "649400985437",
  appId: "1:649400985437:web:7cf75746c210d159beaab4",
  measurementId: "G-64EEC9WQ1B"
};


const myapp: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(myapp);

createApp(App).use(router).mount("#app");

export { db };

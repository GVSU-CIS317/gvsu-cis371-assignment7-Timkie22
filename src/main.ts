import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

const app = createApp(App);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User is signed in:", user);

    // Example: Redirect to home page if not already there
    if (router.currentRoute.value.path !== '/') {
      router.push('/');
    }

    // Additional logic: Store user's info in your app's state or perform other actions
    // ...
  } else {
    // User is signed out
    console.log("User is signed out");

    // Example: Redirect to login page if not already there
    if (router.currentRoute.value.path !== '/login') {
      router.push('/login');
    }

    // Additional logic: Clear user's info from your app's state or perform other actions
    // ...
  }
});

app.use(router).mount("#app");

export { db };

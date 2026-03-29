import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYVpT2zTw3Aap4hQamq6kWVRWPqbxAO5w",
  authDomain: "logicatransport-e6663.firebaseapp.com",
  projectId: "logicatransport-e6663",
  storageBucket: "logicatransport-e6663.firebasestorage.app",
  messagingSenderId: "949165929399",
  appId: "1:949165929399:web:f2bae235115978fdfcae32",
  measurementId: "G-6K34ERZMSK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbH_Sgu_8m_0dWckZ7Kjg-v9M3ZrRzi74",
  authDomain: "devmotors-d93d7.firebaseapp.com",
  projectId: "devmotors-d93d7",
  storageBucket: "devmotors-d93d7.firebasestorage.app",
  messagingSenderId: "789166558833",
  appId: "1:789166558833:web:28880806b2a7648ff695d0",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase, ref, set } from "firebase/database"
import { getAuth, User } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAsI2qLoPZpcA5QFp1Dnz8TiNbrCqr8XNk",
  authDomain: "digital-dahoam.firebaseapp.com",
  projectId: "digital-dahoam",
  storageBucket: "digital-dahoam.appspot.com",
  messagingSenderId: "532207686252",
  appId: "1:532207686252:web:5f455be6b61e787d11fe49",
  measurementId: "G-RB98YSRV64",
  databaseURL: "https://digital-dahoam-default-rtdb.europe-west1.firebasedatabase.app/",
}

export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
export const db = getDatabase(app)
export const auth = getAuth(app)
// export const firebaseCollection = collection(db, "user")

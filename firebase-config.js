// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAUDY7fzXdswCYseUV1fJCUR-hr9eSJY1A",
  authDomain: "marepalli-temple.firebaseapp.com",
  projectId: "marepalli-temple",
  storageBucket: "marepalli-temple.firebasestorage.app",
  messagingSenderId: "76158693870",
  appId: "1:76158693870:web:da41c2f87afda57f9c9eff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

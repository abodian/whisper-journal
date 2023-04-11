import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbL_FWcTUjPzUaBK-Zeh3veyLhyDkPb5s",
  authDomain: "whisper-journal-4ef93.firebaseapp.com",
  projectId: "whisper-journal-4ef93",
  storageBucket: "whisper-journal-4ef93.appspot.com",
  messagingSenderId: "782036524044",
  appId: "1:782036524044:web:659664b3838d92083ee229",
  measurementId: "G-DGXJYPT74B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;

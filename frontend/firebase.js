// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbL_FWcTUjPzUaBK-Zeh3veyLhyDkPb5s",
  authDomain: "whisper-journal-4ef93.firebaseapp.com",
  projectId: "whisper-journal-4ef93",
  storageBucket: "whisper-journal-4ef93.appspot.com",
  messagingSenderId: "782036524044",
  appId: "1:782036524044:web:659664b3838d92083ee229",
  measurementId: "G-DGXJYPT74B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

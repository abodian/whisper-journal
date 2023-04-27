import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import {FIREBASE_API_KEY} from "@env"
console.log(FIREBASE_API_KEY)

const firebaseConfig = {
  apiKey: `${FIREBASE_API_KEY}`,
  authDomain: "whisper-journal-4ef93.firebaseapp.com",
  projectId: "whisper-journal-4ef93",
  storageBucket: "whisper-journal-4ef93.appspot.com",
  messagingSenderId: "782036524044",
  appId: "1:782036524044:web:659664b3838d92083ee229",
  measurementId: "G-DGXJYPT74B",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

async function signInAnonymouslyForDevelopment() {
  if (__DEV__) {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Error during anonymous sign-in:", error);
    }
  }
}

signInAnonymouslyForDevelopment();

export { auth };
export default app;

// the below should be used for production

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyDbL_FWcTUjPzUaBK-Zeh3veyLhyDkPb5s",
//   authDomain: "whisper-journal-4ef93.firebaseapp.com",
//   projectId: "whisper-journal-4ef93",
//   storageBucket: "whisper-journal-4ef93.appspot.com",
//   messagingSenderId: "782036524044",
//   appId: "1:782036524044:web:659664b3838d92083ee229",
//   measurementId: "G-DGXJYPT74B",
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth();
// export default app;
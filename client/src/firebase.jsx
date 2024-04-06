import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAMh5PD3v6yHN7qs8JoO-vUmk4dzlY3kiY",
  authDomain: "pdfgpt-c11fa.firebaseapp.com",
  projectId: "pdfgpt-c11fa",
  storageBucket: "pdfgpt-c11fa.appspot.com",
  messagingSenderId: "776029359894",
  appId: "1:776029359894:web:e43e8bc672c4f8ed670a37",
  measurementId: "G-FRGBRBQVV7"
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
  
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
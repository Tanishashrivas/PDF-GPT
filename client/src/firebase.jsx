import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
// import Login from "./LoginComponents/Login";

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

export const signOutUser = async () => {
  try {
    await signOut(auth);
    sessionStorage.removeItem('tokenK');
    sessionStorage.removeItem('displayName');
    sessionStorage.removeItem('userName');
    // <Login />
    console.log('User signed out successfully!');
  } catch (error) {
    console.error('Error signing out:', error.message);
}
};

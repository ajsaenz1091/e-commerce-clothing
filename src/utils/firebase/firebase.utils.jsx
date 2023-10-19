import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDaNb8DxbBCq42l1Zc5wycoc2K33beYEKk",
    authDomain: "crwn-clothing-db-f5d63.firebaseapp.com",
    projectId: "crwn-clothing-db-f5d63",
    storageBucket: "crwn-clothing-db-f5d63.appspot.com",
    messagingSenderId: "208455391278",
    appId: "1:208455391278:web:d08e93afc09644994027bf"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    console.log(userAuth);
  };
  
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };
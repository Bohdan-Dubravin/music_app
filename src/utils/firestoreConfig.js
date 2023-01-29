import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyBDN9R6L1dARalZ6IZewqR3CbJ2ETb1LtA',
  authDomain: 'musicapp-a8b52.firebaseapp.com',
  projectId: 'musicapp-a8b52',
  storageBucket: 'musicapp-a8b52.appspot.com',
  messagingSenderId: '1074926483364',
  appId: '1:1074926483364:web:fb0c67c52b71bc019ff331',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth(app);
const songsCollection = collection(db, 'songs');
const commentsCollection = collection(db, 'comments');

export { auth, storage, app, db, songsCollection, commentsCollection };

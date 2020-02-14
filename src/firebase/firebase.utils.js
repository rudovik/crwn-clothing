import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAzNh4n8mqg-G_RQIplU-nNe3_7MAqVtbI',
  authDomain: 'crwn-db-a8e3a.firebaseapp.com',
  databaseURL: 'https://crwn-db-a8e3a.firebaseio.com',
  projectId: 'crwn-db-a8e3a',
  storageBucket: 'crwn-db-a8e3a.appspot.com',
  messagingSenderId: '650972295362',
  appId: '1:650972295362:web:432b21a368b26b7a2b4b5b',
  measurementId: 'G-9FDS87DRNQ'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

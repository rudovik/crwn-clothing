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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

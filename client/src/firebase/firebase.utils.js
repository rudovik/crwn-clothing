import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import directoryComponent from '../components/directory/directory.component';

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = async event => {
  event.preventDefault();
  await auth.signInWithPopup(googleProvider);
};

export default firebase;

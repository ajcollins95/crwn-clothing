import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBQi9zTRaQGuOfIGHX3xCAuU6sMjUQ2sCg",
  authDomain: "crwn-db-c5c37.firebaseapp.com",
  databaseURL: "https://crwn-db-c5c37.firebaseio.com",
  projectId: "crwn-db-c5c37",
  storageBucket: "crwn-db-c5c37.appspot.com",
  messagingSenderId: "150954350247",
  appId: "1:150954350247:web:e2014045128aff651a2d82"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()

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
      console.log('error creating user', error.message)
    }
  }

  return userRef;
}



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ propertyIsEnumerable,pt:'select_account' }) //always trigger google popup when auth is used
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
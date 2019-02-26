import firebase from "firebase/app";
import "firebase/auth";
import env from "../env";

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  databaseURL: env.FIREBASE_DATABASE_URL,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(firebaseConfig);

firebase
  .auth()
  .signInWithEmailAndPassword(env.FIREBASE_AUTH_MAIL, env.FIREBASE_AUTH_PASS)
  .catch(error => {
    const { code, message } = error;
    console.log("signIn --->error", message, code);
  });

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const {
      uid,
      displayName,
      email,
      emailVerified,
      photoURL,
      isAnonymous,
      providerData
    } = user;
  } else {
    // User is signed out.
    // ...
  }
});

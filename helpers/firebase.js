import firebase from "firebase";
import env from "../env";
let database, storage;
const init = () => {
  const config = {
    apiKey: env.FIREBASE_API_KEY,
    authDomain: env.FIREBASE_AUTH_DOMAIN,
    databaseURL: env.FIREBASE_DATABASE_URL,
    projectId: env.FIREBASE_PROJECT_ID,
    storageBucket: env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID
  };
  firebase.initializeApp(config);
  database = firebase.database();
};

init();

module.exports = init;
module.exports.database = database;

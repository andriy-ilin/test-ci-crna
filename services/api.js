import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

class ApiService {
  fb = firebase;

  signIn = (email, pass) =>
    this.fb.auth().signInWithEmailAndPassword(email, pass);

  fetchAllByEntityName = ref =>
    this.fb
      .database()
      .ref(ref)
      .once("value")
      .then(res => res.val());

  create = ({ data, link }) => {
    const date = new Date();
    const key = this.fb
      .database()
      .ref(link)
      .push().key;

    return this.fb
      .database()
      .ref(`${link}/${key}`)
      .set({ ...data, id: key, dateAdd: date.toISOString() });
  };

  createWithFullLink = ({ data, link, id }) => {
    const date = new Date();

    return this.fb
      .database()
      .ref(link)
      .set({ ...data, id, dateAdd: date.toISOString() });
  };
}

export default new ApiService();

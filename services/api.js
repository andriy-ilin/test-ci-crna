import firebase from "firebase/app";
import "firebase/database";

class ApiService {
  fb = firebase;

  fetchAllByEntityName = ref =>
    this.fb
      .database()
      .ref(ref)
      .once("value")
      .then(res => res.val());
}

export default new ApiService();

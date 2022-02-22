import firebase from "./FirebaseConfig";

const firestore = firebase.firestore();

const createDocument = (collection, document) => {
  return firestore.collection(collection).add(document);
};

const readDocument = (collection, id) => {
  return firestore.collection(collection).doc(id).get();
};

const updateDocument = (collection, id, document) => {
  return firestore.collection(collection).doc(id).update(document);
};

const FirestoreService = {
  createDocument,
  readDocument,
  updateDocument
};

export default FirestoreService;
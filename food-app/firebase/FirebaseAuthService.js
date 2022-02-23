import firebase from './FirebaseConfig';

const auth = firebase.auth();

const registerUser = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
};
const loginUser = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};
const logoutUser = () => {
    return auth.signOut();
};
const sendPasswordResetEmail = (email) => {
    auth.sendPasswordResetEmail(email);
};
const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider;
    return auth.signInWithPopup(provider);
};

const anonymousLogin = () => {
    return auth.signInAnonymously();
};

const FirebaseAuthSerivce = {
    auth,
    registerUser,
    loginUser,
    logoutUser,
    sendPasswordResetEmail,
    loginWithGoogle,
    anonymousLogin
};

export default FirebaseAuthSerivce;
import firebase from './firebase';

export const USER_KEY = "demo-key";

export const onSignIn = async (options, successCB, errorCB) => {
  const { email, password } = options;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    successCB();
  } catch (e) {
    errorCB(e);
  }
}

export const onSignUp = async (options, successCB, errorCB) => {
  const { email, password } = options;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((authData) => {
      debugger;
      console.log(authData);
    })
    .catch(e => errorCB(e));
}
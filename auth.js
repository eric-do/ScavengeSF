import firebase from './firebase';

export const USER_KEY = "demo-key";

export const onSignIn = async (options, successCB, errorCB) => {
  const { email, password } = options;
  console.log('Function: onSignIn()');
  try {
    console.log('Function: onSignIn.firebase.auth().signInWithEmailAndPassword()');
    //setTimeout(() => console.log('Running null function'), 2000);
    await firebase.auth().signInWithEmailAndPassword(email, password);
    successCB();
  } catch (e) {
    errorCB(e);
  }
}

export const onSignUp = async (options, successCB, errorCB) => {
  console.log('Function: onSignUp()');
  const { email, password } = options;
  
  setTimeout(() => console.log('Running null function'), 5000);
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((authData) => {
      console.log('createUserWithEmailAndPassword() then()');
      console.log(authData);
    })
    .catch(e => errorCB(e));
}
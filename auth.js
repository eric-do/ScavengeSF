import { AsyncStorage } from 'react-native';
import firebase from './firebase';

export const USER_KEY = "demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignUp = (options, successCB, errorCB) => {
  const { email, password } = options;
  try {
    const user = firebase.auth().createUserWithEmailAndPassword(email, password);
    successCB(user);
  } catch (e) {
    errorCB(e);
  }
}
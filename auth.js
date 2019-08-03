import firebase from './firebase';
import { Alert } from 'react-native';

export const onSignIn = async ({ email, password }, errorCB) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    Alert.alert(e.message);
    errorCB(e);
  }
}

export const onSignUp = async ({ email, password }, errorCB) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    Alert.alert(e.message);
    errorCB(e);
  }
}

export const signOut = async () => {
  try {
    await Alert.alert(
      'Confirm',
      'Are you sure you want to log out?',
      [
        {text: 'Yes', onPress: () => firebase.auth().signOut()},
        {
          text: 'Cancel',
          style: 'cancel',
        }
      ],
      {cancelable: false},
    );
  } catch (e) {
    Alert.alert('Something went wrong. Try again later.');
  }
}

export const getUserToken = async () => {
  const idToken = await firebase.auth().currentUser.getIdToken(true);
  return idToken;
}
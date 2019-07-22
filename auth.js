import { AsyncStorage } from 'react-native';

export const USER_KEY = "demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");
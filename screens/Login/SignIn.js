import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { button, textinput } from "../../styles/global";
import { onSignIn } from "../../auth";

export default ({ navigation }) => (
  <View style={styles.container}>
    <TextInput style={textinput} placeholder={"Username"} />
    <TextInput style={textinput} placeholder={"Password"} secureTextEntry />
    <TouchableOpacity
      onPress={() => onSignIn().then(() => navigation.navigate("SignedIn"))}
    >
      <View style={[styles.button, button]}>
        <Text style={styles.buttonText}>Sign in</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signUpBtn}>
          Sign up
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {},
  button: {
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  signUpBtn: {
    color: "gray",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 20
  }
});

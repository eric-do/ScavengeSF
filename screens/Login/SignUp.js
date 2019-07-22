import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button
} from "react-native";
import { button, textinput } from "../../styles/global";
import { onSignIn } from "../../auth";

export default ({ navigation }) => (
  <View style={styles.container}>
    <TextInput style={textinput} placeholder={"Email"} />
    <TextInput style={textinput} placeholder={"Username"} />
    <TextInput style={textinput} placeholder={"Password"} secureTextEntry />
    <TouchableOpacity
      onPress={() => onSignIn().then(() => navigation.navigate("SignedIn"))}
    >
      <View style={[styles.button, button]}>
        <Text style={styles.buttonText}>Sign up</Text>
      </View>
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
    color: "white"
  }
});

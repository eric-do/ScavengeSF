import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { button, textinput } from "../../styles/global";
import { onSignUp } from "../../auth";

//https://stackoverflow.com/questions/55855752/firebase-signinwithemailandpassword-not-firing-then-until-after-ui-focus-chan
//https://stackoverflow.com/questions/56725797/how-to-prevent-react-native-from-stucking-on-es6-promises
//https://stackoverflow.com/questions/56044770/ui-doesnt-update-until-tap-on-the-screen-when-setstate-is-called-inside-a-realm
//https://stackoverflow.com/questions/44867336/react-native-fetch-does-not-render-response-until-after-clicking-screen

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "eric@gmail.com",
      password: "password",
      error: "",
      loading: false
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleUsername(username) {
    this.setState({ username });
  }

  handleEmail(email) {
    this.setState({ email });
  }

  handlePassword(password) {
    this.setState({ password });
  }

  handleLogin() {
    const { email, password } = this.state;

    this.setState({ loading: true });

    onSignUp({ email, password }, this.handleError);
  }

  handleSuccess() {
    const loading = false;
    const { navigation } = this.props;

    this.setState({ loading });
    navigation.navigate("SignedIn");
  }

  handleError({ message }) {
    this.setState({ error: message, loading: false });
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={textinput}
            placeholder={"Email"}
            onChangeText={this.handleEmail}
            value={this.state.email}
          />
          <TextInput
            style={textinput}
            placeholder={"Username"}
            onChangeText={this.handleUsername}
            value={this.state.username}
          />
          <TextInput
            style={textinput}
            placeholder={"Password"}
            onChangeText={this.handlePassword}
            value={this.state.password}
            secureTextEntry
          />
          <TouchableOpacity onPress={this.handleLogin}>
            <View style={[styles.button, button]}>
              <Text style={styles.buttonText}>Sign up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.signInBtn}>Sign in</Text>
          </TouchableOpacity>
        </View>
        {this.state.loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center"
  },
  inputContainer: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {},
  button: {
    marginTop: 10
  },
  buttonText: {
    color: "white"
  },
  signUpBtn: {
    color: "red",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 20
  },
  signInBtn: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
    marginTop: 20
  },
  error: {
    color: "red"
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

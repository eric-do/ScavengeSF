import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { button, textinput } from "../../styles/global";
import { onSignIn } from "../../auth";
import firebase from "../../firebase";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "eric@gmail.com",
      password: "password",
      error: "",
      loading: false
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    firebase
      .auth()
      .onAuthStateChanged(user =>
        user
          ? navigation.navigate("SignedIn")
          : navigation.navigate("SignedOut")
      );
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
    onSignIn({ email, password }, this.handleError);
  }

  handleError({ message }) {
    this.setState({ error: message, loading: false });
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground
        style={styles.image}
        source={require("../../assets/city_bg.jpg")}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={130}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Scavenge</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={textinput}
              placeholder={"Email"}
              onChangeText={this.handleEmail}
              value={this.state.email}
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
                <Text style={styles.buttonText}>Sign in</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.signUpBtn}>Sign up</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        {this.state.loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : null}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    resizeMode: "cover",
    flex: 1
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 130,
    alignItems: "center"
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "75%",
    marginTop: 100
  },
  title: {
    color: "#58D68D",
    fontSize: 40,
    marginBottom: 10,
    fontWeight: "bold"
  },
  input: {
    backgroundColor: "white"
  },
  button: {
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  signUpBtn: {
    color: "white",
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

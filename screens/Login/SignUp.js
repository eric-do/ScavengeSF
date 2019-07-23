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
import firebase from "../../firebase";

//export default ({ navigation }) => (
export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
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

  componentDidMount() {
    const { navigation } = this.props;

    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        console.log("User is not validated");
        navigation.navigate("SignedOut");
      } else {
        console.log("User is validated");
        console.log(user);
        this.setState({ loading: false });
        navigation.navigate("SignedIn");
      }
    });
    console.log(this.unsubscribe);
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

    onSignUp({ email, password }, this.handleSuccess, this.handleError);
  }

  handleSuccess() {
    const loading = false;
    const { navigation } = this.props;

    console.log('Account was created');
    this.setState({ loading });
    navigation.navigate("SignedIn");
  }

  handleError(error) {
    console.error(error);
    this.setState({ error });
  }

  render() {
    return this.state.loading ? (
      <View style={styles.container}>
       <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View style={styles.container}>
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
        <Text style={styles.signUpBtn}>{this.state.loading}</Text>
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
  }
});

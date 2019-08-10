import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { button, textinput } from "../../styles/global";

export default class AddQuestion extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Question"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      landmark: {}
    };
    this.handleInput = this.handleInput.bind(this);
    this.navigateToAnswers = this.navigateToAnswers.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const landmark = navigation.getParam("landmark");
    this.setState({ landmark });
  }

  handleInput(text) {
    this.setState({ text });
  }

  navigateToAnswers() {
    const { navigation } = this.props;
    const landmark = navigation.getParam("landmark");
    const question = {
      text: this.state.text,
      landmarkId: landmark.id,
      answers: []
    }
    navigation.navigate("AddAnswer", {
      question
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={130}
      >
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          placeholder={"Enter your question"}
          onChangeText={this.handleInput}
          value={this.state.text}
        />
        <TouchableOpacity
          onPress={this.navigateToAnswers}
        >
          <View style={[styles.button, button]}>
            <Text style={styles.buttonText}>Next</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  textInput: {
    paddingLeft: 5,
    paddingRight: 5
  },
  picker: {
    width: "75%"
  },
  button: {
    marginTop: 10,
    backgroundColor: "#70EB92"
  },
  buttonText: {
    color: "white",
    fontSize: 16
  }
});

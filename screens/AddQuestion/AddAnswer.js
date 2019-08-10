import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { button, textinput } from "../../styles/global";

export default class AddAnswer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Answer"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      question: {}
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const  question  = navigation.getParam("question");
    this.setState({ question });
  }

  getUpdatedQuestion() {
    const question = {...this.state.question};
    question.answers.push({ text: this.state.text, correct: false });
    return question;
  }

  navigateNext() {
    const { navigation } = this.props;
    const question = this.getUpdatedQuestion();
    console.log(question);
    navigation.push("AddAnswer", {
      question
    });
  }

  navigateDone() {
    const { navigation } = this.props;
    const question = this.getUpdatedQuestion();
    navigation.navigate("QuestionSummary", {
      question
    });
  }

  handleInput(text) {
    this.setState({ text });
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
          placeholder={"Enter an answer"}
          onChangeText={(text) => this.handleInput(text)}
          value={this.state.text}
        />
        <TouchableOpacity
          onPress={() => this.navigateNext()}
        >
          <View style={[styles.nextButton, button]}>
            <Text style={styles.buttonText}>Next</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.navigateDone()}
        >
          <View style={[styles.doneButton, button]}>
            <Text style={styles.buttonText}>Done</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
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
  nextButton: {
    marginTop: 10,
    backgroundColor: "#70EB92"
  },
  doneButton: {
    marginTop: 10,
    backgroundColor: "#2AD7C2"
  },
  buttonText: {
    color: "white",
    fontSize: 16
  }
});

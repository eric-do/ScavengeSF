import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { button, textinput } from "../../styles/global";

export default class QuestionSummary extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Confirm"
    };
  };

  render() {
    return (
      <Text>
        TEST
      </Text>
    )
  }
}

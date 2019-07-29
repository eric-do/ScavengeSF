import React from "react";
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  StyleSheet,
  Picker,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { textinput } from "../../styles/global";

export default class AddQuestion extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Question"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(input) {
    this.setState({ input });
  }

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={130}
      >
        <Text>{navigation.getParam("name")}</Text>
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={4}
          placeholder={"Enter your question"}
          onChangeText={this.handleInput}
          value={this.state.input}
        />
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
  }
});

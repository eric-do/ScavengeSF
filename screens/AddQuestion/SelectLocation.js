import React from "react";
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  StyleSheet,
  Picker
} from "react-native";
import { button, textinput } from "../../styles/global";

export default class AddQuestion extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Select Location"
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      location: "San Francisco"
    };
    this.handlePicker = this.handlePicker.bind(this);
  }

  handlePicker(value, index) {
    this.setState({ location: value });
  }

  handleSubmit() {}

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text />
        <Picker
          selectedValue={this.state.location}
          style={styles.picker}
          onValueChange={(value, index) => this.handlePicker(value, index)}
        >
          <Picker.Item label="San Francisco" value="San Francisco" />
          <Picker.Item label="Tokyo" value="Tokyo" />
        </Picker>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddQuestion", {})}
        >
          <View style={[styles.button, button]}>
            <Text style={styles.buttonText}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  picker: {
    width: "75%"
  },
  button: {
    marginTop: 10
  },
  buttonText: {
    color: "white",
    fontSize: 16
  }
});

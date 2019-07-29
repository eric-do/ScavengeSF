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
import { getLocations } from "../../api";

export default class AddQuestion extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Select Location"
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      location: {},
      locations: []
    };
    this.handlePicker = this.handlePicker.bind(this);
  }

  componentDidMount() {
    getLocations(stateObj => {
      stateObj.location = stateObj.locations[0];
      this.setState(stateObj);
    });
  }

  handlePicker(location, index) {
    console.log(location);
    this.setState({ location });
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
          onValueChange={(location, index) => this.handlePicker(location, index)}
        >
          {this.state.locations.map(location => (
            <Picker.Item
              label={location.name}
              value={location}
              key={location.id}
            />
          ))}
        </Picker>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddQuestion", this.state.location)}
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

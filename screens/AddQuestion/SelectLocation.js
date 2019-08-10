import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Picker } from "react-native";
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
    getLocations(({ locations }) => {
      const location = locations[0];
      this.setState({ location, locations });
    });
  }

  handlePicker(locationName, index) {
    const location = this.state.locations.find(
      location => locationName === location.name
    );
    this.setState({ location, locationName });
  }

  handleSubmit() {}

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text />
        <Picker
          selectedValue={this.state.locationName}
          style={styles.picker}
          onValueChange={(value, index) => this.handlePicker(value, index)}
        >
          {this.state.locations.map(location => (
            <Picker.Item
              label={location.name}
              value={location.name}
              key={location.id}
            />
          ))}
        </Picker>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SelectLandmark", { location: this.state.location })
          }
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

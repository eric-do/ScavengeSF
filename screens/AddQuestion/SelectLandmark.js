import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Picker } from "react-native";
import { button, textinput } from "../../styles/global";
import { getLandmarks } from "../../api";

export default class SelectLandmark extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Select Landmark"
    };
  };
 
  constructor(props) {
    super(props);
    this.state = {
      landmarks: [],
      landmark: {},
      landmarkName: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const location = navigation.getParam("location");
    getLandmarks(location.id, ({ landmarks }) => {
      const landmark = landmarks[0];
      this.setState({ landmark, landmarks });
    });
  }

  handlePicker(landmarkName, index) {
    const landmark = this.state.landmarks.find(
      landmark => landmarkName === landmark.name
    );
    this.setState({ landmark, landmarkName });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={this.state.landmarkName}
          style={styles.picker}
          onValueChange={(value, index) => this.handlePicker(value, index)}
        >
          {this.state.landmarks.map(landmark => (
            <Picker.Item
              label={landmark.name}
              value={landmark.name}
              key={landmark.id}
            />
          ))}
        </Picker>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AddQuestion", {
              landmark: this.state.landmark
            })
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
    marginTop: 10,
    backgroundColor: "#70EB92"
  },
  buttonText: {
    color: "white",
    fontSize: 16
  }
});

import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Picker
} from "react-native";
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
      landmarks: []
    }
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const location = navigation.getParam("location");
    console.log("this is location");
    console.log(location);
    getLandmarks(location.id, stateObj => {
      console.log(stateObj);
      this.setState(stateObj);
    });
  } 
  render() {
    console.log(this.state.landmarks)
    return (
      <View>
        
      </View>
    )
  }
}

import React from "react";
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  StyleSheet,
  Picker
} from "react-native";

export default class AddQuestion extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Add Question"
    };
  };
  constructor(props) {
    super(props);
   
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Question here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  picker: {
    width: '75%'
  }
});

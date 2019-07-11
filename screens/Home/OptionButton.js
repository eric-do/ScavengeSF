import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

class OptionButton extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleButton() {
    this.props.setAnswer(this.props.answer);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.toggleButton()}>
        <View style={[styles.button, this.props.active ? styles.buttonActive : null]}>
          <Text style={this.props.active ? styles.textActive : styles.textInactive}>{this.props.answer.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    height: 50,
    width: '75%',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    borderColor: '#BDC3C7',
    borderWidth: 0.5,
    marginTop: 5
    },
  buttonActive: {
    backgroundColor: '#D6EAF8',
    borderColor: '#3498DB',
  },
  textInactive: {
    color: '#1B2631'
  },
  textActive: {
    color: '#3498DB'
  }
});

export default OptionButton;
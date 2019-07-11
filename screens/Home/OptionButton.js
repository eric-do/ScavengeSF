import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';

class OptionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  toggleButton() {
    const active = !this.state.active;
    this.props.setAnswer(this.props.answer);
    this.setState({ active });
  }

  render() {
    console.log('Active answer');
    console.log(this.props.activeAnswer);

    const active = this.props.activeAnswer && this.props.activeAnswer.id === this.props.answer.id ? true : false;
    return (
      <TouchableOpacity onPress={() => this.toggleButton()}>
        <View style={[styles.button, this.state.active ? styles.buttonActive : null]}>
          <Text style={this.state.active ? styles.textActive : styles.textInactive}>{this.props.answer.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
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
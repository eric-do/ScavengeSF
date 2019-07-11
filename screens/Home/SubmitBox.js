import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default SubmitBox = ({correct, handleQuestionAttempt}) => (
  <View style={[ styles.statusContainer, 
    correct === true ?  
    styles.correctBox : 
    correct === false ?
    styles.incorrectBox :
    null ]}>
    <TouchableOpacity onPress={handleQuestionAttempt}>
      <View style={[styles.button, correct === false ? styles.incorrectButton : styles.activeButton ]} >
        <Text style={{color: 'white'}}>{correct === null ? 'Check' : 'Continue'}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  statusContainer: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyBox: {
    flex: 1,
    height: 0.2
  },
  correctBox: {
    backgroundColor: '#48C9B0'
  },
  incorrectBox: {
    backgroundColor: '#E6B0AA'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 50,
    width: 200
  },
  inactiveButton: {
    backgroundColor: '#AAB7B8',
    color: 'white'
  },
  activeButton: {
    backgroundColor: '#17A589',
    color: 'white'
  },
  incorrectButton: {
    backgroundColor: '#EC7063',
    color: 'white'
  }
});
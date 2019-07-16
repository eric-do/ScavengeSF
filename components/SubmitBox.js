import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import VotesContainer from './VotesContainer';

export default SubmitBox = ({correct, handleQuestionAttempt, handleVote, direction}) => (
  <View style={[ styles.statusContainer, 
    correct === true ?  
    styles.correctBox : 
    correct === false ?
    styles.incorrectBox :
    null ]}>
    <View style={styles.messageContainer}>
      <Text style={[styles.statusMessage, correct === true ? styles.correctMessage : styles.incorrectMessage]}>
        {correct === null ? null : correct === true ? 'CORRECT!' : 'INCORRECT!'}
      </Text>
    </View>
    <View style={styles.buttonContainer} >
      <TouchableOpacity onPress={handleQuestionAttempt}>
        <View style={[styles.button, correct === false ? styles.incorrectButton : styles.activeButton ]} >
          <Text style={{color: 'white'}}>{correct === null ? 'CHECK' : 'CONTINUE'}</Text>
        </View>
      </TouchableOpacity>
    </View>
    {
      correct !== null 
      ? 
      <VotesContainer 
        handleVote={handleVote}
        direction={direction}/> 
      : 
      null
    }
   
  </View>
);

const styles = StyleSheet.create({
  statusContainer: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center'
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
  }, 
  statusMessage: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  correctMessage: {
    color: '#0E6655'
  },
  incorrectMessage: {
    color: '#922B21'
  }
});
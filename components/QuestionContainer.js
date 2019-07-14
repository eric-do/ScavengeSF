import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const QuestionContainer = ({ question }) => (
  <View>

    <View style={styles.textContainer}>
      <Text style={styles.questionText}>{question.text}</Text>
    </View>

    <View style={styles.buttonContainer}>

      <View style={styles.button}>
         <Text style={styles.buttonText}>Fun: {question.rating}/5</Text>
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Upvotes: 10</Text>
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Downvotes: 5</Text>
      </View>

    </View>

  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  questionText: {
    color: '#3498DB',
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#3498DB'
  }
})

export default QuestionContainer;
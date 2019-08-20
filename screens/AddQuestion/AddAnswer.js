import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';
import { button } from '../../styles/global';
import styles from './AddAnswerStyle';

const AddAnswer = props => {
  const { navigation } = props;
  const question = navigation.getParam('question');
  const [text, setText] = useState('');

  const getUpdatedQuestion = () => {
    const updatedQuestion = { ...question };
    updatedQuestion.answers.push({ text, correct: false });
    return updatedQuestion;
  };

  const navigateNext = () => {
    const question = getUpdatedQuestion();
    navigation.push('AddAnswer', {
      question,
    });
  };

  const navigateDone = () => {
    const question = getUpdatedQuestion();
    navigation.navigate('QuestionSummary', {
      question,
    });
  };

  const handleInput = text => {
    setText(text);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={130}
    >
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
        placeholder="Enter an answer"
        onChangeText={text => handleInput(text)}
        value={text}
      />
      <TouchableOpacity onPress={() => navigateNext()}>
        <View style={[styles.nextButton, button]}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateDone()}>
        <View style={[styles.doneButton, button]}>
          <Text style={styles.buttonText}>Done</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

AddAnswer.navigationOptions = () => ({
  title: 'Add Answer',
});

AddAnswer.defaultProps = {
  navigation: {},
};

AddAnswer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
    push: PropTypes.func,
  }),
};

export default AddAnswer;

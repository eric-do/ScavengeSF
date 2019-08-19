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
import styles from './AddQuestionStyle';

const AddQuestion = props => {
  const { navigation } = props;
  const landmark = navigation.getParam('landmark');
  const [ text, setText ] = useState('');

  const handleInput = text => {
    setText(text);
  };

  const navigateToAnswers = () => {
    const question = {
      text,
      landmarkId: landmark.id,
      answers: [],
    };

    navigation.navigate('AddAnswer', {
      question,
    });
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
        placeholder="Enter your question"
        onChangeText={handleInput}
        value={text}
      />
      <TouchableOpacity
        onPress={navigateToAnswers}
      >
        <View style={[styles.button, button]}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

AddQuestion.navigationOptions = () => ({
  title: 'Add Question',
});

AddQuestion.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }),
};

AddQuestion.defaultProps = {
  navigation: {},
};

export default AddQuestion;

import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import { addNewQuestion } from '../../api';
import { button } from '../../styles/global';
import styles from './QuestionSummaryStyle';

const QuestionSummary = props => {
  const { navigation } = props;
  const question = navigation.getParam('question');
  const { text, landmarkId } = question;
  const [answers, setAnswers] = useState(question.answers);

  const handleChange = (index, value) => {
    const newAnwers = [...answers];
    newAnwers[index].correct = value;
    setAnswers(newAnwers);
  };

  const handleSubmit = () => {
    const newQuestion = { text, landmarkId, answers };
    addNewQuestion(newQuestion, () => navigation.navigate('Scavenge'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.questionText}>{text}</Text>
      </View>
      <View style={styles.section}>
        <FlatList
          data={answers}
          keyExtractor={item => item.text}
          style={styles.list}
          renderItem={({ item, index }) => (
            <View style={styles.answerEntry}>
              <View style={styles.answerTextView}>
                <Text style={styles.answerText}>{item.text}</Text>
              </View>
              <View style={styles.answerToggle}>
                <Switch
                  onValueChange={bool => handleChange(index, bool)}
                  value={item.correct}
                />
              </View>
            </View>
          )}
        />
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => handleSubmit()}>
          <View style={[styles.button, button]}>
            <Text style={styles.buttonText}>Done</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

QuestionSummary.navigationOptions = () => ({
  title: 'Confirm',
});

QuestionSummary.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }),
};

QuestionSummary.defaultProps = {
  navigation: {},
};

export default QuestionSummary;

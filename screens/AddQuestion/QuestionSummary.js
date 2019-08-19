import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Switch
} from 'react-native';
import { addNewQuestion } from '../../api';
import { button } from '../../styles/global';

export default QuestionSummary = props => {
  const { navigation } = props;
  const question = navigation.getParam('question');
  const [ text, setText ] = useState(question.text);
  const [ landmarkId, setLandmarkId ] = useState(question.landmarkId);
  const [ answers, setAnswers ] = useState(question.answers);
  
  console.log(answers);

  const handleChange = (index, value) => {
    console.log('index: ' + index)
    console.log(answers);
    const newAnwers = [...answers];
    newAnwers[index].correct = value;
    setAnswers(newAnwers);
  };

  const handleSubmit = () => {
    const question = { text, landmarkId, answers };
    addNewQuestion(question, () => console.log('submitted'));
  };

  console.log('Rendering');

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
}

QuestionSummary.navigationOptions = ({ navigation }) => {
  return {
    title: 'Confirm'
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  section: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    flex: 1
  },
  questionText: {
    fontSize: 18
  },
  answerEntry: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  answerTextView: {
    width: '60%', 
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 20
  },
  answerToggle: {
    width: '40%', 
    alignItems: 'flex-start' ,
    justifyContent: 'center',
  },
  answerText: {
    fontSize: 16
  },
  textInput: {
    paddingLeft: 5,
    paddingRight: 5
  },
  picker: {
    width: '75%'
  },
  button: {
    marginTop: 10,
    backgroundColor: '#70EB92'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  list: {
    width: '100%'
  }
});

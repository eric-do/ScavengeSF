import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SERVER } from 'react-native-dotenv';
import AchievementModal from '../../components/AchievementModal';
import SubmitBox from './SubmitBox.js';
import OptionButton from './OptionButton.js';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      question: {},
      modalVisible: false,
      achievement: null,
      answer: null,
      correct: null
    }
    this.handleQuestionAttempt = this.handleQuestionAttempt.bind(this);
    this.handleModalVisibility = this.handleModalVisibility.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const question = navigation.getParam('question', null);
    const id = question.id;

    this.setState({ question });

    fetch(`${SERVER}answers?id=${id}`)
      .then(results => results.json())
      .then(answers => this.setState({ answers }))
      .catch(e => console.error(`Couldn't get data`, e));
  }

  setAnswer(answer) {
    console.log('Setting answer state to ' + answer.id + ': ' + answer.text)
    this.setState({ answer }, console.log(this.state.answer));
  }

  handleQuestionAttempt() {
    console.log(this.state.answer);
    const correct = this.state.answer ? this.state.answer.correct : false;
    const question = this.state.question;

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `userId=${1}&questionId=${question.id}`
    }

    if (correct) {
      fetch(`${SERVER}questions/`, options)
        .then(response => response.text())
        .then(data => { 
          const achievement = data ? JSON.parse(data) : null;
          const modalVisible = achievement ? true : false;
          this.setState({ achievement, modalVisible });
        })
        .catch(e => console.error('request failed', e));
    }
    this.setState({ correct: correct });
  }

  handleModalVisibility(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    const answers = this.state.answers;
    const correct = this.state.correct;

    return (
      <View>
        <View style={styles.answers}>
          <AchievementModal 
            visible={this.state.modalVisible} 
            handleModalVisibility={this.handleModalVisibility}
            achievement={this.state.achievement}/>
          <FlatList 
            data={answers}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <OptionButton key={item.id}
                            answer={item} 
                            setAnswer={this.setAnswer} 
                            activeAnswer={this.state.answer} />
            )}
          />
        </View>
        <SubmitBox correct={this.state.correct} handleQuestionAttempt={this.handleQuestionAttempt} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  answers: {
    paddingTop: 15,
    height: '75%'
  }
});

export default AnswerList;
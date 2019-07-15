import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AchievementModal from '../../components/AchievementModal';
import SubmitBox from '../../components/SubmitBox.js';
import OptionButton from '../../components/OptionButton.js';
import { getAnswerList, updateQuestionsCompleted } from '../../api';

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
    getAnswerList(id, (stateObj) => this.setState(stateObj));
  }

  setAnswer(newAnswer) {
    const answer = this.state.answer && this.state.answer.id === newAnswer.id ? null : newAnswer;    
    this.setState({ answer });
  }

  handleQuestionAttempt() {
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
      updateQuestionsCompleted(options, (stateObj) => this.setState(stateObj));
    }
    this.setState({ correct: correct });
  }

  handleModalVisibility(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    const question = this.props.navigation.getParam('question', null);
    const answers = this.state.answers;
    const correct = this.state.correct;

    return (
      <View>
        <View style={styles.answers}>
          <AchievementModal 
            visible={this.state.modalVisible} 
            handleModalVisibility={this.handleModalVisibility}
            achievement={this.state.achievement}/>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{question.text}</Text>
          </View>
          <FlatList 
            data={answers}
            extraData={this.state}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <OptionButton key={item.id}
                            answer={item} 
                            setAnswer={this.setAnswer} 
                            active={this.state.answer && this.state.answer.id === item.id ? true : false} />
             )}
          />
        </View>
        <SubmitBox correct={this.state.correct} handleQuestionAttempt={this.handleQuestionAttempt} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  answers: {
    paddingTop: 15,
    height: '75%'
  }
});

export default AnswerList;
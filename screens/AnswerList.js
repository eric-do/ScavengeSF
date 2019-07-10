import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SERVER } from 'react-native-dotenv';
import AchievementModal from '../components/AchievementModal'

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      question: {},
      modalVisible: false,
      achievement: null
    }
    this.handleQuestionAttempt = this.handleQuestionAttempt.bind(this);
    this.handleModalVisibility = this.handleModalVisibility.bind(this);
  }

  handleModalVisibility(modalVisible) {
    console.log('Toggling modal display');
    this.setState({ modalVisible });
  }

  handleQuestionAttempt(answer) {
    const correct = answer.correct;
    const question = this.state.question;

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `userId=${1}&questionId=${question.id}`
    }

    if (correct) {
      // Display confirmation the answer is correct
      // Call server with user's progress
      // Display achievement if one was earned
      console.log('Correct answer. Posting to DB.')
      fetch(`${SERVER}questions/`, options)
        .then(response => response.json())
        .then(achievement => { 
          //{id: 2, name: "SF Explorer", description: "Answer 5 questions about San Francisco", count: 5}
          console.log(achievement);
          this.setState({ achievement, modalVisible: true });

        })
        .catch(e => console.error('request failed', e));
    }

    this.setState({ correct: correct });
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

  render() {
    const answers = this.state.answers;

    return (
      <View>
        <AchievementModal 
          visible={this.state.modalVisible} 
          handleModalVisibility={this.handleModalVisibility}
          achievement={this.state.achievement}/>
        <FlatList 
          data={answers}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Text key={item.id}
                  onPress={() => this.handleQuestionAttempt(item)}>{item.text}</Text>
          )}
        />
      </View>
    );
  }

}

export default AnswerList;
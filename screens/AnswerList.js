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
      achievement: null,
      correct: null
    }
    this.handleQuestionAttempt = this.handleQuestionAttempt.bind(this);
    this.handleModalVisibility = this.handleModalVisibility.bind(this);
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

  handleModalVisibility(modalVisible) {
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
          console.log(achievement);
          this.setState({ achievement, modalVisible: true });

        })
        .catch(e => console.error('request failed', e));
    }
    this.setState({ correct: correct });
  }

  render() {
    const answers = this.state.answers;

    return (
      <View style={styles.answers}>
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

const styles = StyleSheet.create({
  answers: {
    paddingTop: 15
  }
});

export default AnswerList;
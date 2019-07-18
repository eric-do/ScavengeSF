import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getUpvotes, getDownvotes } from '../api';

export default class QuestionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: 0,
      downvotes: 0
    };
  }

  /**
   * ? Need to consider joining the two API calls into one
   */
  componentDidMount() {
    getUpvotes(this.props.question.id, upvotes => this.setState(upvotes));
    getDownvotes(this.props.question.id, downvotes => this.setState(downvotes));
  }

  render() {
    const { question } = this.props;
    const { upvotes, downvotes } = this.state;
    return (
      <View>

        <View style={styles.textContainer}>
          <Text style={styles.questionText}>{question.text}</Text>
        </View>

        <View style={styles.buttonContainer}>

          <View style={styles.button}>
             <Text style={styles.buttonText}>Fun: {question.rating}/5</Text>
          </View>

          <View style={styles.button}>
            <Text style={styles.buttonText}>Upvotes: {upvotes ? upvotes : 0}</Text>
          </View>

          <View style={styles.button}>
            <Text style={styles.buttonText}>Downvotes: {downvotes ? downvotes : 0}</Text>
          </View>

        </View>

      </View>
    );
  }
}

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
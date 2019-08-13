import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getUpvotes, getDownvotes } from '../api';
import UpvoteIcon from "./UpvoteIcon";
import DownvoteIcon from "./DownvoteIcon";
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
            <UpvoteIcon/>
            <Text style={styles.upvoteText}>{upvotes ? upvotes : 0}</Text>
          </View>

          <View style={styles.button}>
            <DownvoteIcon />
            <Text style={styles.downvoteText}>{downvotes ? downvotes : 0}</Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  questionText: {
    color: '#3498DB',
    fontWeight: 'bold'
  },
  buttonText: {
    color: '#3498DB'
  },
  upvoteText: {
    color: 'green',
    marginLeft: 5
  },
  downvoteText: {
    color: 'orange',
    marginLeft: 5
  }
})
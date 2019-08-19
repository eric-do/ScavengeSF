import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import AchievementModal from '../../components/AchievementModal';
import SubmitBox from '../../components/SubmitBox';
import OptionButton from '../../components/OptionButton';
import {
  getAnswerList,
  updateQuestionsCompleted,
  updateUserVote,
  getUserVote,
} from '../../api';
import { getUserToken } from '../../auth';
import styles from './AnswerListStyle';

const AnswerList = props => {
  const { navigation } = props;
  const [answers, setAnswers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [achievement, setAchievement] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [direction, setDirection] = useState(0);
  const userId = getUserToken();
  const question = navigation.getParam('question', null);

  useEffect(() => {
    getAnswerList(question.id, stateObj => {
      setAnswers(stateObj.answers);
    });

    getUserVote(userId, question.id, stateObj => {
      setDirection(stateObj.direction);
    });
  }, [userId, question.id]);

  const handleModalVisibility = isVisible => {
    setModalVisible(isVisible);
  };

  const updateAnswer = newAnswer => {
    console.log(answer);
    setAnswer(answer && answer.id === newAnswer.id ? null : newAnswer); 
  };

  /**
   * TODO: Fix this function so the "CONTINUE" button redirects away from the question
   */
  const handleQuestionAttempt = async () => {
    const isCorrect = answer ? answer.correct : false;
    const token = await getUserToken();

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `token=${token}&questionId=${question.id}`,
    };

    if (isCorrect) {
      await updateQuestionsCompleted(options, stateObj => {
        setAchievement(stateObj.achievement);
        setModalVisible(stateObj.modalVisible);
      });
    }
    setCorrect(isCorrect);
  };

  const handleVote = string => {
    const vote = {
      userId,
      questionId: question.id,
      direction: string.toLowerCase() === 'upvote' ? 1 : -1,
    };

    updateUserVote(vote, stateObj => setDirection(stateObj.direction));
  };

  return (
    <View>
      <View style={styles.answers}>
        <AchievementModal
          visible={modalVisible}
          handleModalVisibility={handleModalVisibility}
          achievement={achievement}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{question.text}</Text>
        </View>
        <FlatList
          data={answers}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <OptionButton
              key={item.id}
              answer={item}
              setAnswer={updateAnswer}
              active={!!(answer && answer.id === item.id)}
            />
          )}
        />
      </View>
      <SubmitBox
        correct={correct}
        handleQuestionAttempt={handleQuestionAttempt}
        handleVote={handleVote}
        direction={direction}
      />
    </View>
  );
};

AnswerList.defaultProps = {
  navigation: {},
};

AnswerList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }),
};

export default AnswerList;

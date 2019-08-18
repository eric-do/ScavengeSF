import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AchievementModal from '../../components/AchievementModal';
import SubmitBox from '../../components/SubmitBox.js';
import OptionButton from '../../components/OptionButton.js';
import { getAnswerList, updateQuestionsCompleted, 
         updateUserVote, getUserVote } from '../../api';
import { getUserToken } from '../../auth';          

export default AnswerList = props => {
  const { navigation } = props;
  const [ userId, setUserId ] = useState(1);
  const [ answers, setAnswers ] = useState([]);
  const [ question, setQuestion ] = useState(navigation.getParam('question', null));
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ achievement, setAchievement ] = useState(null);
  const [ answer, setAnswer ] = useState(null);
  // const answer = useAnswerHook();
  const [ correct, setCorrect ] = useState(null);
  const [ direction, setDirection ] = useState(0);

  useEffect( () => {
    console.log('using effect');
    getAnswerList(question.id, stateObj => {
      const { answers } = stateObj;
      setAnswers(answers);
    });

    getUserVote(userId, question.id, stateObj => {
      const { direction } = stateObj;
      setDirection(direction);
    });
  }, [answer]);

 
  const handleModalVisibility = modalVisible => {
    setModalVisible(modalVisible);  
  };


  const updateAnswer = newAnswer => setAnswer(answer && answer.id === newAnswer.id ? null : newAnswer);

  /**
   * TODO: Fix this function so the "CONTINUE" button redirects away from the question
   */
  const handleQuestionAttempt = async () => {
    const correct = answer ? answer.correct : false;
    const token = await getUserToken();

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `token=${token}&questionId=${question.id}`
    };

    if (correct) {
      await updateQuestionsCompleted(options, stateObj => {
        const { achievement, modalVisible } = stateObj;
        setAchievement(achievement);
        setModalVisible(modalVisible);
      });
    }
    setCorrect(correct);
  }

  const handleVote = string => {
    const questionId = question.id;
    const direction = string.toLowerCase() === 'upvote' ? 1 : -1;
    const vote = {
      direction,
      userId,
      questionId
    };
    
    updateUserVote(vote, stateObj => {
      const { direction } = stateObj;
      setDirection(direction);
    });
  }

  return (
    <View>
      <View style={styles.answers}>
        <AchievementModal 
          visible={modalVisible} 
          handleModalVisibility={handleModalVisibility}
          achievement={achievement}/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{question.text}</Text>
        </View>
        <FlatList 
          data={answers}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <OptionButton key={item.id}
                          answer={item} 
                          setAnswer={updateAnswer} 
                          active={answer && answer.id === item.id ? true : false} />
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
}

const useAnswerHook = (newAnswer) => {
  const [ answer, setAnswer ] = useState({});

  console.log('Using custom hook');
  useEffect(() => {
    const answer = answer && answer.id === newAnswer.id ? null : newAnswer;
    setAnswer(answer);
  })
  
  return answer;
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

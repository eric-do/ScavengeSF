import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ListBox from '../../components/ListBox';
import QuestionContainer from '../../components/QuestionContainer';
import { getQuestionList } from '../../api';
import styles from './QuestionListStyle';

const QuestionList = props => {
  const [questions, setQuestions] = useState([]);
  const { navigation } = props;
  const landmarkId = navigation.getParam('id', 1);

  useEffect(() => {
    getQuestionList(landmarkId, stateObj => {
      setQuestions(stateObj.questions);
    });
  }, [landmarkId]);

  return (
    <View style={styles.questions}>
      <FlatList
        data={questions}
        style={styles.list}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListBox
            key={item.id}
            pressHandler={() =>
              navigation.navigate('Answers', { question: item })
            }
          >
            <QuestionContainer question={item} />
          </ListBox>
        )}
      />
    </View>
  );
};

QuestionList.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('landmark').name,
});

QuestionList.defaultProps = {
  navigation: {},
};

QuestionList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }),
};

export default QuestionList;

import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListBox from '../../components/ListBox';
import QuestionContainer from '../../components/QuestionContainer';
import { getQuestionList } from '../../api';

class QuestionList extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('landmark').name
    }
  }
    
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 1);

    getQuestionList(id, (stateObj) => this.setState(stateObj));
  }

  render() {
    const questions = this.state.questions;
    return (
      <View style={styles.questions}>
        <FlatList
          data={questions}
          style={styles.list}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => ( 
            <ListBox 
              key={item.id}
              pressHandler={() => this.props.navigation.navigate('Answers', { question: item })}
            >
                <QuestionContainer question={item}/>
            </ListBox>                
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  questions: {
    alignItems: 'center'
  },
  text: {
    alignSelf: 'center'
  },
  list: {
    width: '100%'
  }
});

export default QuestionList;
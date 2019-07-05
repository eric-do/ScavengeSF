import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SERVER } from 'react-native-dotenv';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 1);

    fetch(`${SERVER}questions?id=${id}`)
      .then(response => response.json())
      .then(questions => this.setState({ questions }))
      .catch(e => console.error('Could not get data', e));
  }

  render() {
    const questions = this.state.questions;
    return (
      <View>
        <FlatList
          data={questions}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => ( 
            <Text key={item.id}
                  onPress={() => this.props.navigation.navigate('Answers', { id: item.id })}>{item.text}</Text>
          )}
        />
      </View>
    );
  }
}

export default QuestionList;
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 1);

    fetch(`http://localhost:3000/answers?id=${id}`)
      .then(results => results.json())
      .then(answers => this.setState({ answers }))
      .catch(e => console.error(`Couldn't get data`, e));
  }

  render() {
    const answers = this.state.answers;

    return (
      <View>
        <FlatList 
          data={answers}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Text key={item.id}>{item.text}</Text>
          )}
        />
      </View>
    );
  }

}

export default AnswerList;
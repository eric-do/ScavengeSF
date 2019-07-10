import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SERVER } from 'react-native-dotenv';

class AchievementList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      achievements: []
    }
  }

  componentDidMount() {
    fetch(`${SERVER}achievements?id=${1}`)
      .then(response => response.json())
      .then(achievements => this.setState({ achievements }))
      .catch(error => console.error('Error getting achievements', error));
  }

  render() {
    const achievements = this.state.achievements;
    console.log(achievements);
    return(
      <View>
        <FlatList 
          data={achievements}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default AchievementList;
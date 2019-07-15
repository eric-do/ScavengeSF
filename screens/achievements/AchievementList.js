import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListBox from '../../components/ListBox';
import { getAchievementList } from '../../api';

class AchievementList extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Achievements'
  });

  constructor(props) {
    super(props);
    this.state = {
      achievements: []
    }
  }

  componentDidMount() {
    getAchievementList(1, (stateObj) => this.setState(stateObj));
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
            <ListBox>
              <View style={styles.achievements}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </ListBox>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  achievements: {
   alignItems: 'center'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498DB',
    marginBottom: 10
  },
  description: {
    fontSize: 14,
  }
});

export default AchievementList;
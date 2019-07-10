import React from 'react';
import { StyleSheet, View} from 'react-native';
import { createStackNavigator, 
         createAppContainer, 
         createBottomTabNavigator } from 'react-navigation';
import { SERVER } from 'react-native-dotenv';
import LandmarkList from './screens/LandmarkList.js';
import QuestionList from './screens/QuestionList.js';
import AnswerList from './screens/AnswerList.js';
import AchievementList from './screens/AchievementList.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      landmarks: []
    }
  }

  componentDidMount() {
      fetch(`${SERVER}landmarks?id=${this.state.id}`)
        .then(data => data.json())
        .then(landmarks => { this.setState({ landmarks })})
        .catch(e => console.error('Couldn\'t get data', e));
  }

  render() {
    return (
      <View style={styles.container}>
        <LandmarkList landmarks={this.state.landmarks} navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  image: {
    width: 400,
    height: 200
  }
});

const HomeStack = createStackNavigator({
  Home: App,
  Questions: QuestionList,
  Answers: AnswerList
},
{
  initialRouteName: "Home"
});

const AchievementStack = createStackNavigator({
  Achievements: AchievementList
},
{
  initialRouteName: "Achievements"
});

export default createAppContainer(createBottomTabNavigator({
  Home: HomeStack,
  Achievements: AchievementStack  
}));

import React from 'react';
import { StyleSheet, View} from 'react-native';
import { createStackNavigator, 
         createAppContainer, 
         createBottomTabNavigator } from 'react-navigation';
import { SERVER } from 'react-native-dotenv';
import LocationList from './screens/Home/LocationList.js';
import LandmarkList from './screens/Home/LandmarkList.js';
import QuestionList from './screens/Home/QuestionList.js';
import AnswerList from './screens/Home/AnswerList.js';
import AchievementList from './screens/Achievements/AchievementList.js';

class App extends React.Component {
  static navigationOptions = {
    title: 'Scavenge SF',
  };

  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      locations: []
    }
  }

  componentDidMount() {
      // fetch(`${SERVER}landmarks?id=${this.state.id}`)
      //   .then(data => data.json())
      //   .then(landmarks => { this.setState({ landmarks })})
      //   .catch(e => console.error('Couldn\'t get data', e));
      fetch(`${SERVER}locations`)
      .then(data => data.json())
      .then(locations => this.setState({ locations }))
      .catch(e => console.error('Couldn\'t get data', e));
  }

  render() {
    return (
      <View style={styles.container}>
        <LocationList locations={this.state.locations} navigation={this.props.navigation}/>
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
  Landmarks: LandmarkList,
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

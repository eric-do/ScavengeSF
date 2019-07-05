import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableHighlight } from 'react-native';
import LandmarkList from './screens/LandmarkList.js';
import LandmarkView from './screens/LandmarkView.js';
import AnswerList from './screens/AnswerList.js';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { SERVER } from 'react-native-dotenv';


export const LOCALHOST = 'http://localhost:3000/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      landmarks: []
    }
  }

  componentDidMount() {
      fetch(`${LOCALHOST}landmarks?id=${this.state.id}`)
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

const AppNavigator = createStackNavigator({
  Home: App,
  Landmark: LandmarkView,
  Answers: AnswerList
})

export default createAppContainer(AppNavigator);

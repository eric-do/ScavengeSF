import React from 'react';
import { StyleSheet, 
         Text, 
         View, 
         FlatList, 
         TouchableHighlight,
         ImageBackground } from 'react-native';
import { SERVER } from '../../api';
import { getLandmarks } from '../../api';

console.log(SERVER);

export default class LandmarkList extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('location').name
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      landmarks: []
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 1);
    getLandmarks(id, stateObj => this.setState(stateObj));
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.landmarks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View>  
              <TouchableHighlight onPress={() => navigation.navigate('Questions', { id: item.id, landmark: item })} >
                <ImageBackground style={styles.image}
                       source={{ uri: `${SERVER}${item.url}` }} >
                  <View style={styles.thumbnailOverlay}>
                    <Text style={styles.thumbnailText}>{item.name}</Text>
                  </View>
                </ImageBackground>
              </TouchableHighlight>                       
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  image: {
    width: 400,
    height: 200
  },
  thumbnailOverlay: {
    position: 'absolute', 
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  thumbnailText: {
    color: 'white',
    fontSize: 30
  }
})
import React from 'react';
import { StyleSheet, 
         Text, 
         View, 
         FlatList, 
         TouchableHighlight,
         ImageBackground } from 'react-native';
import { SERVER } from 'react-native-dotenv';

export default LandmarkList = ({ landmarks, navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={landmarks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>  
            <TouchableHighlight onPress={() => navigation.navigate('Questions', { id: item.id })} >
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
};

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
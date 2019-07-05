import React from 'react';
import { StyleSheet, 
         Text, 
         View, 
         FlatList, 
         TouchableHighlight,
         Image } from 'react-native';

const LOCALHOST = 'http://localhost:3000/';

export default LandmarkList = ({ landmarks, navigation }) => {
  console.log(navigation);

  return (
    <View style={styles.container}>
      <FlatList
        data={landmarks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.container}
                  onPress={() => navigation.navigate('Landmark', { id: item.id })} >
              {item.name}
            </Text>    
            <TouchableHighlight onPress={() => navigation.navigate('Landmark', { id: item.id })} >
              <Image style={styles.image}
                     source={{ uri: `${LOCALHOST}${item.url}` }}
              />
            </TouchableHighlight>                       
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
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
})
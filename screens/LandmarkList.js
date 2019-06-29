import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';

export default LandmarkList = ({ landmarks }) => {
  //console.log(this.props.navigation);
  return (
  <View style={styles.container}>
    <FlatList
      data={landmarks}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Text style={styles.item}
              onPress={() => console.log(this)}>
          {item.name}
        </Text>
      )}
    />
  </View>);
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
  }
})
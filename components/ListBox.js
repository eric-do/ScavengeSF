import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const ListBox = ({pressHandler, children}) => (
  <TouchableOpacity onPress={pressHandler}>
    <View style={styles.box}>
      {children}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 150,
    width: '90%',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    }
  });

export default ListBox;
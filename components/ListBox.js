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
    borderRadius: 10,
    height: 150,
    width: '90%',
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'white',
    borderColor: '#3498DB',
    borderWidth: 0.5,
    }
  });

export default ListBox;
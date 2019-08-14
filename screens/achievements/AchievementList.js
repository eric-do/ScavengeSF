import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ListBox from '../../components/ListBox';
import { getAchievementList } from '../../api';

const AchievementList = props => {
  const [ achievements, setAchievements ] = useState(null);

  useEffect(() => {
    const { navigation } = props;
    navigation.addListener('didFocus', () => {
      getAchievementList(1, ({achievements}) => setAchievements(achievements))
    })
  }, [])


  return (
    <View style={styles.container}>
      <FlatList 
        data={achievements}
        keyExtractor={item => item.achievementId.toString()}
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


AchievementList.navigationOptions = ({ navigation }) => ({
  title: 'Achievements'
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAF2F8',
    flex: 1
  },
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
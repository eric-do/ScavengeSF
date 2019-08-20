import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ListBox from '../../components/ListBox';
import { getAchievementList } from '../../api';
import styles from './AchievementListStyle';

const AchievementList = () => {
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    getAchievementList(1, ({ achievements }) => setAchievements(achievements));
  }, []);

  console.log('rerender achievements');
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
};

AchievementList.navigationOptions = () => ({
  title: 'Achievements',
});

AchievementList.defaultProps = {
  navigation: {},
};

AchievementList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
    addListener: PropTypes.func,
  }),
};

export default AchievementList;

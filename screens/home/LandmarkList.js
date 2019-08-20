import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import { SERVER, getLandmarks } from '../../api';
import styles from './LandmarkListStyle';

const LandmarkList = props => {
  const [landmarks, setLandmarks] = useState([]);
  const { navigation } = props;
  const locationId = navigation.getParam('id', 1);

  useEffect(() => {
    getLandmarks(locationId, stateObj => {
      setLandmarks(stateObj.landmarks);
    });
  }, [locationId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={landmarks}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.landmarkCard}>
            <TouchableHighlight
              onPress={() =>
                navigation.navigate('Questions', {
                  id: item.id,
                  landmark: item,
                })
              }
            >
              <ImageBackground
                style={styles.image}
                source={{ uri: `${SERVER}${item.url}` }}
              >
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

LandmarkList.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('location').name,
});

LandmarkList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }),
};

LandmarkList.defaultProps = {
  navigation: {},
};

export default LandmarkList;

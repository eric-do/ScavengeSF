/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import PropTypes from 'prop-types';
import { SERVER, getLocations, validateToken } from '../../api';
import { signOut } from '../../auth';
import styles from './LocationListStyle';

const LocationList = props => {
  const [locations, setLocations] = useState([]);
  const { navigation } = props;

  useEffect(() => {
    getLocations(stateObj => {
      setLocations(stateObj.locations);
    });

    validateToken();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.locationCard}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Landmarks', {
                  id: item.id,
                  location: item,
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
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

LocationList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

LocationList.defaultProps = {
  navigation: {},
};

LocationList.navigationOptions = () => ({
  title: 'Scavenge',
  headerRight: (
    <TouchableOpacity onPress={signOut}>
      <FontAwesomeIcon style={styles.logout} icon="sign-out-alt" size={20} />
    </TouchableOpacity>
  ),
});

export default LocationList;

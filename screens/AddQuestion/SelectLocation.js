import React, { useEffect, useState } from 'react';
import {
  View, 
  TouchableOpacity, 
  Text,
  Picker, 
} from 'react-native';
import PropTypes from 'prop-types';
import { button } from '../../styles/global';
import { getLocations } from '../../api';
import styles from './SelectLocationStyle';

const SelectLocation = props => {
  const [location, setLocation] = useState({});
  const [locations, setLocations] = useState([]);
  const { navigation } = props;

  useEffect(() => {
    getLocations(({ locations }) => {
      setLocation(locations[0]);
      setLocations(locations);
    });
  }, []);

  const handlePicker = locationName => {
    setLocation(locations.find(loc => locationName === loc.name));
  };

  return (
    <View style={styles.container}>
      <Text />
      <Picker
        selectedValue={location.name}
        style={styles.picker}
        onValueChange={(value, index) => handlePicker(value, index)}
      >
        {
          locations.length > 0
            ? locations.map(locationList => (
              <Picker.Item
                label={locationList.name}
                value={locationList.name}
                key={locationList.id}
              /> 
            )) : null
        }
      </Picker>
      <TouchableOpacity
        onPress={() => navigation.navigate('SelectLandmark', { location })}
      >
        <View style={[styles.button, button]}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

SelectLocation.navigationOptions = () => ({
  title: 'Select Location',
});

SelectLocation.defaultProps = {
  navigation: {},
};

SelectLocation.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }),
};

export default SelectLocation;

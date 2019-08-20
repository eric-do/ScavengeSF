import React, { useEffect, useState } from 'react';
import {
  View, TouchableOpacity, Text, Picker, 
} from 'react-native';
import PropTypes from 'prop-types';
import { button } from '../../styles/global';
import { getLandmarks } from '../../api';
import styles from './SelectLandmarkStyle';

const SelectLandmark = props => {
  const [landmarks, setLandmarks] = useState([]);
  const [landmark, setLandmark] = useState({});
  const [landmarkName, setLandmarkName] = useState('');
  const { navigation } = props;
  const location = navigation.getParam('location');

  useEffect(() => {
    getLandmarks(location.id, ({ landmarks }) => {
      setLandmark(landmarks[0]);
      setLandmarks(landmarks);
    });
  }, [location.id]);

  const handlePicker = landmarkName => {
    const selectedLandmark = landmarks.find(landmark => (
      landmarkName === landmark.name
    ));
    setLandmark(selectedLandmark);
    setLandmarkName(landmarkName);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={landmarkName}
        style={styles.picker}
        onValueChange={value => handlePicker(value)}
      >
        {landmarks.map(landmark => (
          <Picker.Item
            label={landmark.name}
            value={landmark.name}
            key={landmark.id}
          />
        ))}
      </Picker>
      <TouchableOpacity
        onPress={() => navigation.navigate('AddQuestion', { landmark })}
      >
        <View style={[styles.button, button]}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

SelectLandmark.navigationOptions = () => ({
  title: 'Select Landmark',
});

SelectLandmark.defaultProps = {
  navigation: {},
};

SelectLandmark.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    getParam: PropTypes.func,
  }),
};

export default SelectLandmark;

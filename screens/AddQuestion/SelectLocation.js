import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Picker } from "react-native";
import { button, textinput } from "../../styles/global";
import { getLocations } from "../../api";

export default SelectLocation = props => {
  
  const [location, setLocation] = useState({});
  const [locations, setLocations] = useState([]);
  const { navigation } = props;

  console.log('before useeffect');
  useEffect(() => {
    getLocations(({ locations }) => {
      setLocation(locations[0]);
      setLocations(locations);
      console.log(locations);
    });
  }, []);

  const handlePicker = (locationName, index) => {
    setLocation(locations.find(location => locationName === location.name));
  }

  return (
    <View style={styles.container}>
      <Text />
      <Picker
        selectedValue={location.name}
        style={styles.picker}
        onValueChange={(value, index) => handlePicker(value, index)}
      >
        {
          locations.length > 0 ?
          locations.map(location => (
          <Picker.Item
            label={location.name}
            value={location.name}
            key={location.id}
          /> 
        )) : null
        }
      </Picker>
      <TouchableOpacity
        onPress={() => navigation.navigate("SelectLandmark", { location })}
      >
        <View style={[styles.button, button]}>
          <Text style={styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

SelectLocation.navigationOptions = ({ navigation }) => {
  return {
    title: "Select Location"
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  picker: {
    width: "75%"
  },
  button: {
    marginTop: 10,
    backgroundColor: "#70EB92"
  },
  buttonText: {
    color: "white",
    fontSize: 16
  }
});

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SERVER } from "../../api";
import { getLocations, validateToken } from "../../api";
import { signOut } from "../../auth";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default LocationList = props => {
  const [ locations, setLocations ] = useState([]);
  const { navigation } = props;

  useEffect(() => {
    getLocations(stateObj => {
      const { locations } = stateObj;
      setLocations(locations);  
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
                navigation.navigate("Landmarks", {
                  id: item.id,
                  location: item
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
}

LocationList.navigationOptions = ({ navigation }) => {
  return {
    title: "Scavenge",
    headerRight: (
      <TouchableOpacity onPress={signOut} >
        <FontAwesomeIcon
          style={styles.logout}
          icon="sign-out-alt"
          size={20}
          
        />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    width: "100%"
  },
  locationCard: {
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,

  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  image: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  thumbnailOverlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  thumbnailText: {
    color: "white",
    fontSize: 30
  },
  logout: {
    marginRight: 10,
    color: 'gray'
  }
});

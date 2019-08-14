import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  ImageBackground
} from "react-native";
import { SERVER } from "../../api";
import { getLandmarks } from "../../api";

export default LandmarkList = props => {
  const [ landmarks, setLandmarks ] = useState([]);
  const { navigation } = props;

  useEffect(() => {  
    const { navigation } = props;
    const id = navigation.getParam("id", 1);
    getLandmarks(id, stateObj => {
      const { landmarks } = stateObj;
      setLandmarks(landmarks);
    });
  }, []) 

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
                navigation.navigate("Questions", {
                  id: item.id,
                  landmark: item
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
}


LandmarkList.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("location").name
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF2F8",
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    width: "100%"
  },
  landmarkCard: {
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingLeft: 10,
    paddingRight: 10
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  image: {
    width: 400,
    height: 200
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
  }
});

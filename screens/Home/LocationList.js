import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Button
} from "react-native";
import { SERVER } from "../../api";
import { getLocations } from "../../api";
import { signOut } from "../../auth";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default class LocationList extends React.Component {
  static navigationOptions = ({ navigation }) => {
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

  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
  }

  componentDidMount() {
    getLocations(stateObj => this.setState(stateObj));
  }

  render() {
    const { locations } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={locations}
          keyExtractor={item => item.id.toString()}
          style={styles.list}
          renderItem={({ item }) => (
            <View>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    width: "100%"
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

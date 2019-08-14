import React, { useEffect, useState} from "react";
import { StyleSheet, View, FlatList } from "react-native";
import ListBox from "../../components/ListBox";
import QuestionContainer from "../../components/QuestionContainer";
import { getQuestionList } from "../../api";

export default (QuestionList = props => {
  const [ questions, setQuestions ] = useState([]);
  const { navigation } = props;

  useEffect(() => {
    getQuestionList(navigation.getParam("id", 1), stateObj => {
      const { questions } = stateObj;
      setQuestions(questions);
    });
  }, []);

  return (
    <View style={styles.questions}>
      <FlatList
        data={questions}
        style={styles.list}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ListBox
            key={item.id}
            pressHandler={() =>
              navigation.navigate("Answers", { question: item })
            }
          >
            <QuestionContainer question={item} />
          </ListBox>
        )}
      />
    </View>
  );
});

QuestionList.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("landmark").name
  };
};

const styles = StyleSheet.create({
  questions: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#EAF2F8"
  },
  text: {
    alignSelf: "center"
  },
  list: {
    width: "100%"
  }
});

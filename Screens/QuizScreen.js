import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
} from "react-native";

const { width, height } = Dimensions.get("window");

const QuizScreen = ({ route, navigation }) => {
  const {
    categoryName,
    categoryId,
    numberOfQuestions,
    difficulty,
  } = route.params;
  //   const [url, setUrl] = useState(null);
  const [QuestionBank, setQuestionBank] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);

  /*
  numerOfQuestions: 5,
          difficulty: easy,
  */
  useEffect(
    /// On Componenets Mount
    () => {
      const url = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
      console.log(url);
      if (!QuestionBank) {
        console.log("Start fetching Data");
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            console.log("data fetched");
            // console.log(data.results[0]);
            var array = [];
            data.results.map((questionData) => {
              const newQues = {
                question: questionData.question,
                correctAnswer: questionData.correct_answer,
                category: questionData.category,
                options: [
                  questionData.correct_answer,
                  questionData.incorrect_answers[0],
                  questionData.incorrect_answers[1],
                  questionData.incorrect_answers[2],
                ],
              };
              array.push(newQues);
            });

            setQuestionBank(array);
            setIsLoading(false);
            console.log(array[0]);
          })
          .catch((err) => console.log(err));
      }
    }
  );

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const optionTapped = (option) => {
    console.log(option);
    if (index < QuestionBank.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.popToTop();
    }
  };

  const currentQuestion = QuestionBank[index];
  return (
    <SafeAreaView style={styles.QuizScreen}>
      <Text style={styles.categoryTitle}>{currentQuestion.category}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.categoryTitle}>Question - </Text>
        <Text style={styles.categoryTitle}>{index + 1}</Text>
      </View>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option) => {
        return (
          <TouchableHighlight
            style={styles.answerButton}
            activeOpacity={0.6}
            underlayColor={
              option == currentQuestion.correctAnswer
                ? "lightgreen"
                : "palevioletred"
            }
            onPress={() => optionTapped(`${option}`)}
          >
            <Text>{option}</Text>
          </TouchableHighlight>
        );
      })}
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
  QuizScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  categoryTitle: {
    marginTop: 36,
    fontSize: 25,
    fontWeight: "bold",
  },
  questionContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  questionText: {
    // width: width - 50,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 20,
  },
  answerButton: {
    padding: 10,
    backgroundColor: `lightblue`,
    margin: 5,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 23,
    fontWeight: "bold",
    width: width - 50,
    height: 50,
  },
});

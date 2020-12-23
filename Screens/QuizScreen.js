import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
  ActivityIndicator,
  Alert
} from "react-native";

import {
  WIDTH,
  HEIGHT,
  heightReletive,
  widthReletive,
  heightPercent,
  widthPercent,
  font,
} from "./ReletiveDimenstion";


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
  const [score, setScore] = useState(0)

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
      if (option === currentQuestion.correctAnswer) {
        setScore(prevScore => prevScore + 1);
        console.log(`${score} / ${numberOfQuestions} index ${index}`);
      }
    if (index < QuestionBank.length - 1) {
      setIndex(index + 1);
    } else {
      Alert.alert("completed", `Result ${score} %`, [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Start New Quiz", onPress: () => navigation.popToTop() },
      ]);
    }
  };

  const currentQuestion = QuestionBank[index];
  return (
    <SafeAreaView style={styles.QuizScreen}>
      <Text style={styles.categoryTitle}>{currentQuestion.category}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.categoryTitle}>Question</Text>
        <Text style={styles.categoryTitle}>
          {index + 1}/{numberOfQuestions}
        </Text>
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
            <Text style={styles.answerButtonText}>{option}</Text>
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
    marginTop: 10,
    fontSize: font(25),
    textAlign: "left",
    fontWeight: "bold",
  },
  questionContainer: {
    flex: 0.1,
    width: WIDTH - 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  questionText: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: font(30),
  },
  answerButton: {
    flex: 0.1,
    padding: 10,
    backgroundColor: `lightblue`,
    margin: 5,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    // fontSize: ,
    fontWeight: "bold",
    width: WIDTH - 50,
    height: 50,
  },
  answerButtonText: {
    fontSize: font(30),
    textAlign: "center",
  },
});

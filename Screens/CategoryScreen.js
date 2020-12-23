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
  TextInput,
  ActivityIndicator,
} from "react-native";
import ModalSelector from "react-native-modal-selector";

import {
  WIDTH,
  HEIGHT,
  heightReletive,
  widthReletive,
  heightPercent,
  widthPercent,
  font,
} from "./ReletiveDimenstion";

const fetchCategories = async () => {
  fetch("https://opentdb.com/api_category.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data.trivia_categories[0].id, data.trivia_categories[0].name);
      return data;
    })
    .catch((err) => console.log(err));
};

const QuizScreen = ({ navigation }) => {
  const [isLoading, setIsLoding] = useState(true);
  const [categories, setCategories] = useState(null);
  const [difficultyLevel, setDifficultyLevel] = useState("easy");
  const [totalQuestions, setTotoalQuestions] = useState(5);
  const [selectedCategoryId, setSelectedCategory] = useState("");
  // const [selectedNumberOfQuestions, setSelectedNumberOfQuestions] = useState(5);
  // const [selectedDifficultyLevel, setSelectedDifficultyLevel] ;

  useEffect(
    /// On Componenets Mount
    () => {
      if (!categories) {
        console.log("Start fetching Data");
        fetch("https://opentdb.com/api_category.php")
          .then((res) => res.json())
          .then((data) => {
            console.log("data fetched");
            console.log(data.trivia_categories[0]);
            setCategories(data.trivia_categories);
            setIsLoding(false);
          })
          .catch((err) => console.log(err));
      }

      ///On componenet unmount
      return () => {
        setIsLoding(false);
        console.log("Return function called");
      };
    }
  );

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const Item = ({ name, id }) => (
    <TouchableHighlight
      onPress={() => {
        console.log(name, id);
        setSelectedCategory(id);
      }}
    >
      <Text
        style={{
          padding: 10,
          backgroundColor: `#${randColor()}`,
          margin: 5,
          borderRadius: 10,
          textAlign: "center",
          fontSize: font(30),
          width: WIDTH - 50,
        }}
      >
        {name}
      </Text>
    </TouchableHighlight>
  );

  const renderItem = ({ item }) => <Item name={item.name} id={item.id} />;

  let diffIndex = 0;
  const difficultyLevelsOptions = [
    { key: diffIndex++, label: "Easy" },
    { key: diffIndex++, label: "Medium" },
    { key: diffIndex++, label: "Hard" },
  ];

  let totalQuestionsIndex = 0;
  const totoalQuestionsOptions = [
    { key: totalQuestionsIndex++, label: "5" },
    { key: totalQuestionsIndex++, label: "10" },
    { key: totalQuestionsIndex++, label: "15" },
    { key: totalQuestionsIndex++, label: "20" },
    { key: totalQuestionsIndex++, label: "25" },
    { key: totalQuestionsIndex++, label: "30" },
    { key: totalQuestionsIndex++, label: "40" },
    { key: totalQuestionsIndex++, label: "50" },
  ];

  return (
    <SafeAreaView style={styles.QuizScreen}>
      <Text style={styles.categoryTitle}>Select Category</Text>
      <FlatList
        style={{ flex: 1 }}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      ></FlatList>

      <View style={styles.bottomView}>
        <View style={styles.selectorsView}>
          <ModalSelector
            data={difficultyLevelsOptions}
            initValue={difficultyLevel}
            initValueTextStyle={{ color: "blue", fontSize: font(30) }}
            openButtonContainerAccessible={true}
            style={styles.selector}
            onChange={(option) => {
              const d = option.label.toLocaleLowerCase();
              setDifficultyLevel(d);
              setDifficultyLevel(d);
            }}
          />
          <ModalSelector
            data={totoalQuestionsOptions}
            initValue={totalQuestions}
            initValueTextStyle={{ color: "blue", fontSize: font(30) }}
            style={styles.selector}
            onChange={(option) => {
              const Qs = option.label.toLocaleLowerCase();
              setTotoalQuestions(Qs);
              setTotoalQuestions(Qs);
            }}
          />
        </View>
        <View style={styles.startButton}>
          <Button
            title="start Quiz"
            onPress={() => {
              navigation.navigate("Quiz", {
                categoryId: selectedCategoryId,
                numberOfQuestions: totalQuestions,
                difficulty: difficultyLevel,
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

function randColor() {
  var color = (function lol(m, s, c) {
    return s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));
  })(Math, "6789ABCD", 4); //add lower number in middle agrument to dark the colors
  //   console.log(color)
  return color;
}

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
    // marginTop: 36,
    fontSize: font(35),
    paddingVertical: 10,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    backgroundColor: `#${randColor()}`,
    margin: 5,
    borderRadius: 10,
    textAlign: "center",
    fontSize: font(30),
    width: WIDTH - 50,
  },
  bottomView: {
    width: WIDTH - 20,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },
  selectorsView: {
    flexDirection: "row",
    width: WIDTH - 20,
    marginVertical: 5,
    justifyContent: "space-around",
    alignItems: "center",
  },
  selector: {
    width: WIDTH / 2 - 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    elevation: 2,
  },
  startButton: {
    width: WIDTH / 2,
    marginTop: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    borderRadius: 30,
  },
});

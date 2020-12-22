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
import { Picker } from "@react-native-community/picker";
const { width, height } = Dimensions.get("window");

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
  const [totalQuestions, setTotoalQuestions] = useState(10);

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
        navigation.navigate("Quiz", {
          categoryName: name,
          categoryId: id,
          numberOfQuestions: totalQuestions,
          difficulty: difficultyLevel,
        });
      }}
    >
      <Text
        style={{
          padding: 10,
          backgroundColor: `#${randColor()}`,
          margin: 5,
          borderRadius: 10,
          textAlign: "center",
          fontSize: 20,
          width: width - 50,
        }}
      >
        {name}
      </Text>
    </TouchableHighlight>
  );

  const renderItem = ({ item }) => <Item name={item.name} id={item.id} />;

  return (
    <SafeAreaView style={styles.QuizScreen}>
      <Text style={styles.categoryTitle}>Select Category</Text>
      <FlatList
        style={{ flex: 1 }}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      ></FlatList>
      <View style={styles.bottonView}>
        <View style={styles.inputContainer}>
          <Text>Total Questions</Text>
          <View style={styles.container}>
            <Picker
              selectedValue={totalQuestions.toString()}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setTotoalQuestions(itemValue)
              }
            >
              <Picker.Item label="5" value="5" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="15" value="15" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="25" value="25" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="40" value="40" />
              <Picker.Item label="50" value="50" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text>Difficulty</Text>
          <View style={styles.container}>
            <Picker
              selectedValue={difficultyLevel}
              style={{ height: 50, width: 150 , justifyContent: 'center',}}
              onValueChange={(itemValue, itemIndex) =>
                setDifficultyLevel(itemValue)
              }
            >
              <Picker.Item label="Easy" value="easy" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="Hard" value="hard" />
            </Picker>
          </View>
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
    fontSize: 25,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    backgroundColor: `#${randColor()}`,
    margin: 5,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    width: width - 50,
  },
  bottonView: {
    flexDirection: "row",
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  questionInput: {
      flex: 1,
    borderColor: "black",
    borderWidth: 1,
    fontSize: 22,
    // width: 150,
    textAlign: "center",
  },
});

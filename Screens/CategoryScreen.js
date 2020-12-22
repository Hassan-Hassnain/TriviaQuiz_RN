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
} from "react-native";

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

const QuizScreen = () => {
  const [isLoding, setIsLoding] = useState(true);
  const [categories, setCategories] = useState(null);

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

  if (isLoding) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={{ marginTop: 150 }}>QLoading Question</Text>
        <Button title="Simulate loading" onPress={() => setIsLoding(true)} />
      </View>
    );
  }

  const Item = ({ name }) => (
    <TouchableHighlight onPress={()=>console.log(name)}>
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

  const renderItem = ({ item }) => <Item name={item.name} />;

  return (
    <SafeAreaView style={styles.QuizScreen}>
      <Text style={styles.categoryTitle}>Select Category</Text>
      <FlatList
        style={{ flex: 1 }}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      ></FlatList>
    </SafeAreaView>
  );
};

function randColor() {
  var color = (function lol(m, s, c) {
    return s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));
  })(Math, "6789ABCD", 4);   //add lower number in middle agrument to dark the colors
//   console.log(color)
  return color;
}

export default QuizScreen;

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
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
});

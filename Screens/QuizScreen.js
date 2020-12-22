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

const QuizScreen = () => {
  return (
    <SafeAreaView style={styles.QuizScreen}>
      <Text style={styles.categoryTitle}>Select Category</Text>
    </SafeAreaView>
  );
};

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
    fontWeight: "bold",
  },
});

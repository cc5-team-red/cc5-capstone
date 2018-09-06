import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { firebase } from "./src/firebase.js";
import Map from './Components/Map.js';
import Details from './Components/Details.js';
import PinForm from './Components/PinForm.js'

export default class App extends React.Component {
  constructor() {
    super();
    this.message = "initialized...";
    this._storeHighScore(1, 100);
    this._setupHighscoreListener(1);
  }

  _storeHighScore(userId, score) {
    firebase
      .database()
      .ref("users/" + userId)
      .set({
        highscore: score
      });
  }

  _setupHighscoreListener(userId) {
    firebase
      .database()
      .ref("users/" + userId)
      .on("value", snapshot => {
        const highscore = snapshot.val().highscore;
        console.log("New high score: " + highscore);
        this.message = "New high score: " + highscore;
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>Hello World!</Text> */}
        {/* <Map /> */}
        {/* <Details /> */}
        <PinForm />
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
  }
});

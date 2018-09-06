import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class Map extends React.Component {
  static navigationOptions = {
    title: "Map"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>I'm map</Text>
        <Button title="Go to Details" onPress={() => navigate("Details")} />
        <Button title="Go to PinForm" onPress={() => navigate("PinForm")} />
      </View>
    );
  }
}

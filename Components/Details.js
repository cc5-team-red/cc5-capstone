import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class Details extends React.Component {
  static navigationOptions = {
    title: "Details"
  };
  render() {
    const navigation = this.props.navigation;
    const result = navigation.getParam("id");
    return (
      <View>
        <Text>{`ID: ${result}`}</Text>
        <Button title="Details" onPress={() => navigate("Disaster Map")} />
      </View>
    )
  }
}

import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { upvotePin } from "../firebase/helper"

export default class Details extends React.Component {
  static navigationOptions = {
    title: "Details"
  };

  _sendUpvote = (xid, xvotes) => {
    upvotePin(xid, xvotes + 1);
  }

  render() {
    const navigation = this.props.navigation;
    const id = navigation.getParam("id");
    const votes = navigation.getParam("votes");

    return (
      <View>
        <Text>{`ID: ${id}`}</Text>
        <Button title="Upvote" onPress={() => this._sendUpvote(id, votes)} />
        <Button title="Downvote" />
      </View>
    )
  }
}

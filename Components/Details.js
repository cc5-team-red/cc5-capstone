import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { upvotePin, downvotePin } from "../firebase/helper"
import PinComment from "./PinComment";

export default class Details extends React.Component {
  static navigationOptions = {
    title: "Details"
  };

  _sendUpvote = (xid, xvotes) => {
    upvotePin(xid, xvotes + 1);
  }

  _sendDownvote = (xid, xvotes) => {
    downvotePin(xid, xvotes - 1);
  }

  render() {
    const navigation = this.props.navigation;
    const id = navigation.getParam("id");
    const votes = navigation.getParam("votes");
    const time = navigation.getParam("time");
    const details = navigation.getParam("details");

    return (
      <View>
        <Text>{`ID: ${id}\nVotes: ${votes}\nLast Updated: ${time}\nDetails: ${details}`}</Text>
        <Button title="Upvote" onPress={() => this._sendUpvote(id, votes)} />
        <Button title="Downvote" onPress={() => this._sendDownvote(id, votes)}/>
        <PinComment pinId={id} userId={this.props.screenProps.user_id} />
      </View>
    )
  }
}

import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { upvotePin, downvotePin } from "../firebase/helper"
import PinComment from "./PinComment";

export default class Details extends React.Component {
  static navigationOptions = {
    title: "Details"
  };

  state = {
    comment: "",
  }

  _handleChange = (input) => {
    this.setState({ comment: input });
  }

  _submitPinForm = () => {
    commentPin(
      this.props.userId,
      this.props.pinId,
      {
        comment: this.state.comment
      }
    )
  }

  _sendUpvote = (xid, xvotes) => {
    upvotePin(xid, xvotes + 1);
  }

  _sendDownvote = (xid, xvotes) => {
    downvotePin(xid, xvotes - 1);
  }

  _showComments = (comments) => {
    if (typeof comments === 'object') {
      return Object.entries(comments).map(([key, value]) => (
        <Text>{`\n${value.comment.comment}\nUser: ${value.userId}`}</Text>
      ))
    }
  }

  _submitPinForm = () => {

  }
  render() {
    const navigation = this.props.navigation;
    const id = navigation.getParam("id");
    const votes = navigation.getParam("votes");
    const time = navigation.getParam("time");
    const details = navigation.getParam("details");
    const comments = navigation.getParam("comments")

    return (
      <View>
        <Text>{`ID: ${id}\nVotes: ${votes}\nLast Updated: ${time}\nDetails: ${details}\n`}</Text>
        <Text>{`\nComments:`}</Text>
        {this._showComments(comments)}
        <Button title="Upvote" onPress={() => this._sendUpvote(id, votes)} />
        <Button title="Downvote" onPress={() => this._sendDownvote(id, votes)} />
        <PinComment
          pinId={id}
          userId={this.props.screenProps.user_id}
          comment={this.state.comment}
          _handleChange={this._handleChange}
          _submitPinForm={this._submitPinForm}
        />
      </View>
    )
  }
}

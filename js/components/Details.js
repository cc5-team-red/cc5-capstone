import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { pinListener, upvotePin, downvotePin, commentPin } from "../firebase/helper"
import PinComment from "./PinComment";

export default class Details extends React.Component {
  static navigationOptions = {
    title: "Details"
  };

  state = {
    comment: "",
    pins: []
  }

  _getPins = async () => {
    await pinListener(pins => {
      this.setState({ pins });
    });
  };

  _handleChange = (input) => {
    this.setState({ comment: input });
  }

  _submitPinComment = () => {
    commentPin(
      this.props.screenProps.user_id,
      this.props.navigation.getParam("id"),
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
          comment={this.state.comment}
          _handleChange={this._handleChange}
          _submitPinForm={this._submitPinComment}
        />
      </View>
    )
  }
}

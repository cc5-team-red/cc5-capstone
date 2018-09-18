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
    voted: false,
  }


  _handleChange = (input) => {
    this.setState({ comment: input });
  }

  _submitPinComment = () => {
    if(this.state.comment.length > 0){
      commentPin(
        this.props.screenProps.user_id,
        this.props.navigation.getParam("id"),
        {
          comment: this.state.comment
        }
      )
      this.setState({comment: ""});
    } else {
      console.log("Error: No Comment");
    }
  }

  _sendUpvote = (xid, xvotes) => {
    if(!this.state.voted){
      upvotePin(xid, xvotes + 1);
      this.setState({voted: true});
    }
  }

  _sendDownvote = (xid, xvotes) => {
    if(!this.state.voted){
      downvotePin(xid, xvotes - 1);
      this.setState({voted: true});
    }
  }

  _showComments = (id) => {
    const pins = this.props.screenProps.pins.filter(pin => pin.id === id);
    const comments = pins[0].comments;
    if (typeof comments === 'object') {
      return Object.entries(comments).map(([key, value]) => (
        <Text key={key}>{`\n${value.comment.comment}`}</Text>
      ))
    }
  }

  _showVotes = (id) => {
    const pins = this.props.screenProps.pins.filter(pin => pin.id === id);
    const votes = pins[0].votes;
    return <Text>{`Votes: ${votes}`}</Text>
    // console.log(comments)
    // if (typeof comments === 'object') {
    //   return Object.entries(comments).map(([key, value]) => (
    //     <Text>{`\n${value.comment.comment}`}</Text>
    //   ))
    // }
  }

  render() {
    const navigation = this.props.navigation;
    const id = navigation.getParam("id");
    const votes = navigation.getParam("votes");
    const hoursAgo = navigation.getParam("hoursAgo");
    const details = navigation.getParam("details");

    return (
      <View>
        {this._showVotes(id)}
        <Text>{`Last Updated: ${hoursAgo >= 1 ? (`Updated ${hoursAgo} hours ago`)
         : (`Updated ${(hoursAgo*60).toFixed(0)} minutes ago`)} \nDetails: ${details}\n`}</Text>
        <Text>{`\nComments:`}</Text>
        {this._showComments(id)}
        <Button title="Upvote" disabled={this.state.voted} onPress={() => this._sendUpvote(id, votes)} />
        <Button title="Downvote" disabled={this.state.voted} onPress={() => this._sendDownvote(id, votes)} />
        <PinComment
          comment={this.state.comment}
          _handleChange={this._handleChange}
          _submitPinForm={this._submitPinComment}
          disabled={(this.state.comment === "")}
        />
      </View>
    )
  }
}

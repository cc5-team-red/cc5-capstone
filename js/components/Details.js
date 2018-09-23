import React from "react";
import { StyleSheet, Text, ScrollView, View, Button, TouchableOpacity } from "react-native";
import { pinListener, upvotePin, downvotePin, commentPin } from "../firebase/helper"
import PinComment from "./PinComment";

export default class Details extends React.Component {
  state = {
    comment: "",
    voted: false,
    confirmDelete: false,
    id: this.props.navigation.getParam("id"),
    title: this.props.navigation.getParam("title"),
    votes: this.props.navigation.getParam("votes"),
    hoursAgo: this.props.navigation.getParam("hoursAgo"),
    details: this.props.navigation.getParam("details"),
    creator: this.props.navigation.getParam("creator"),
  }

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
  });

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

  _deletePin = () => {
    if(this.props.screenProps.user_id === this.state.creator){
      this.props.navigation.navigate("Home");
      this.props.screenProps._deletePin(this.state.id);
    } else {
      console.log("id mismatch")
    }
  }

  _showComments = (id) => {
    const pins = this.props.screenProps.pins.filter(pin => pin.id === id);
    if(pins.length > 0) {
      const comments = pins[0].comments;
      if (typeof comments === 'object') {
        return Object.entries(comments).map(([key, value]) => {
          const timestamp = new Date(value.timestamp);
          const oneHour = (1000 * 60 * 60)
          const now = new Date(Date.now())
          const hoursAgo = ((now - timestamp) / oneHour);
          return <Text key={key}>{`\n${value.comment.comment}\n ~${hoursAgo >= 1 ? (`Updated ${hoursAgo} hours ago`)
          : (`Updated ${(hoursAgo*60).toFixed(0)} minutes ago`)}`}</Text>
        }
        )
      }
    }
  }

  _showVotes = (id) => {
    const pins = this.props.screenProps.pins.filter(pin => pin.id === id);
    if(pins.length > 0){
      const votes = pins[0].votes;
      return <Text>{`Votes: ${votes}`}</Text>
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}>
          {this._showVotes(this.state.id)}
          <Text>{`Last Updated: ${this.state.hoursAgo >= 1 ? (`Updated ${this.state.hoursAgo} hours ago`)
          : (`Updated ${(this.state.hoursAgo*60).toFixed(0)} minutes ago`)}`}</Text>
          <Text>{`Details: ${this.state.details ? (this.state.details) : (`None`)}\n`}</Text>
          <Text>{`Comments:`}</Text>
        </View>
        <View style={{flex:5}}>
          <ScrollView>
            {this._showComments(this.state.id)}
          </ScrollView>
        </View>
        <View style={{flex:3}}>
          <Button title="Upvote" disabled={this.state.voted} onPress={() => this._sendUpvote(this.state.id, this.state.votes)} />
          <Button title="Downvote" disabled={this.state.voted} onPress={() => this._sendDownvote(this.state.id, this.state.votes)} />
          <PinComment
            comment={this.state.comment}
            _handleChange={this._handleChange}
            _submitPinForm={this._submitPinComment}
            disabled={(this.state.comment === "")}
          />
          {this.props.screenProps.user_id === this.state.creator && !this.state.confirmDelete ? 
            (<TouchableOpacity style={{alignItems:"center", backgroundColor: "#F9A800", padding: 15}} onPress={() => (this.setState({confirmDelete: true}))}>
              <Text style={{color:"#ECECE7", fontSize: 22}}>Delete</Text>
            </TouchableOpacity>) : null}
          {this.state.confirmDelete ? 
            (<TouchableOpacity style={{alignItems:"center", backgroundColor: "#9B2423", padding: 15}} onPress={this._deletePin}>
              <Text style={{color:"#ECECE7", fontSize: 22}}>Confirm Delete</Text>
            </TouchableOpacity>) : null}
        </View>
      </View>
    )
  }
}

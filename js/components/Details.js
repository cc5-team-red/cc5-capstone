import React from "react";
import { StyleSheet, Text, ScrollView, View, Button, Image } from "react-native";
import { pinListener, upvotePin, downvotePin, commentPin } from "../firebase/helper"
import PinComment from "./PinComment";
import { Divider } from 'react-native-elements';

export default class Details extends React.Component {
  state = {
    comment: "",
    voted: false,
    id: this.props.navigation.getParam("id"),
    title: this.props.navigation.getParam("title"),
    votes: this.props.navigation.getParam("votes"),
    hoursAgo: this.props.navigation.getParam("hoursAgo"),
    details: this.props.navigation.getParam("details"),
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
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:2}}>
          <View>
            {this._showVotes(this.state.id)}
            <Text>{`${this.state.hoursAgo >= 1 ? (`Last updated: ${this.state.hoursAgo} hours ago`)
            : (`Last updated: ${(this.state.hoursAgo*60).toFixed(0)} minutes ago`)}`}</Text>
          </View>
          <Divider style={{ height: 1, backgroundColor: '#a7bbcd' }} />
          <View>
            <Text>Is this still true?</Text>
            <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around'}}>
              <View>
                <Image
                  style={styles.good}
                  source={require('../assets/img/thumb.png')}
                />
              </View>
              <View>
                <Image
                  style={styles.bad}
                  source={require('../assets/img/thumb.png')}
                />
              </View>
            </View>
          </View>
          <Divider style={{ height: 1, backgroundColor: '#a7bbcd' }} />
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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  good: {
    width: 50,
    height: 50
  },
  bad: {
    width: 50,
    height: 50,
    transform: [
      { rotateX: '180deg' }
    ]
  }
});
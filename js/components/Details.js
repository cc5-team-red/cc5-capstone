import React from "react";
import { StyleSheet, Text, ScrollView, View, Button, Image, TouchableOpacity } from "react-native";
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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            style={styles.icon}
            source={require('../assets/img/personIcon.png')}
          />
          <View style={{flex: 0, flexShrink: 1}}><Text key={key}>{`\n${value.comment.comment}`}</Text></View>
        </View>
      ))
    }
  }

  _showToast = () => {
    
    return (
      <View >
        <View style={styles.toastPanel}>
          <Text style={{textAlign: 'center', color: 'white'}}>Your vote was submitted</Text>
        </View>
      </View>
    )
  }

  _showVotes = (id) => {
    const pins = this.props.screenProps.pins.filter(pin => pin.id === id);
    const votes = pins[0].votes;
    return <Text>{`${votes}`}</Text>
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 5}}>
          <View style={{flex: 1, justifyContent: 'space-around', paddingBottom: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>{`Votes    `}<Text style={{fontWeight: 'normal', fontSize: 28}}>{this._showVotes(this.state.id)}</Text></Text>
            <Text style={{marginBottom: 15, fontSize: 12, color: '#444444'}}>Last updated: {`${this.state.hoursAgo >= 1 ? (`${this.state.hoursAgo} hours ago`)
            : (`${(this.state.hoursAgo*60).toFixed(0)} minutes ago`)}`}
            </Text>
            <Divider style={{ height: 1, backgroundColor: '#a7bbcd' }} />
          </View>
            <View style={{flex: 2, justifyContent: 'space-around', paddingBottom: 10, paddingLeft: 20, paddingRight: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>Is this still true?</Text>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around',}}>
                <View style={{width: 50, height: 50}}>
                  <TouchableOpacity
                      disabled={this.state.voted} onPress={() => this._sendUpvote(this.state.id, this.state.votes)} >
                      <Image
                        style={styles.good}
                        source={require('../assets/img/thumb.png')}
                      />
                  </TouchableOpacity>
                </View>
                <View style={{width: 50, height: 50}}>
                  <TouchableOpacity
                    disabled={this.state.voted} onPress={() => this._sendDownvote(this.state.id, this.state.votes)} >
                    <Image
                      style={styles.bad}
                      source={require('../assets/img/thumb.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            <Divider style={{ height: 1, backgroundColor: '#a7bbcd', marginBottom: -10 }} />
          </View>
          <View style={{flex: 2, flexWrap: 'wrap', paddingBottom: 5, paddingLeft: 20, paddingRight: 20, paddingTop: 0}}>
            {/* <Text style={{fontWeight: 'normal'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details:</Text>
            </Text> */}
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                style={styles.icon}
                source={require('../assets/img/informationIcon.png')}
              />
              <ScrollView style={{marginTop: 15, flexShrink: 1}}>
                <Text style={{textWrap: 'balance'}}>
                  {`${this.state.details ? (this.state.details) : (` None`)}\n`}
                </Text>
              </ScrollView>
            </View>
            <Divider style={{ height: 1, backgroundColor: '#a7bbcd' }} />
          </View>
        </View>
        <View style={{flex: 3, alignSelf: 'flex-start', paddingLeft: 20, paddingRight: 20}}>
          <View style={{flex: 2, marginTop: 5, marginBottom: -20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>{`Comments`}</Text>
          </View>
          <View style={{flex: 8}}>
            <ScrollView>
              {this._showComments(this.state.id)}
            </ScrollView>
          </View>
        </View>
        <View style={{flex: 3}}>
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
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 18
  },
  toastPanel: {
    position: 'absolute',
    top: 10,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    borderRadius: 3,
    backgroundColor: '#8EB8FF',
  }
});
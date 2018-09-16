import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";
import { commentPin } from "../firebase/helper";
import DeviceInfo from 'react-native-device-info';
export default class PinComment extends React.Component {
  
  state = {
    comment: "",
  }

  _handleChange = (input) => {
    this.setState({comment: input});
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

  render() {
    return (
      <View>
        <FormInput value={this.state.comment} onChangeText={this._handleChange} />
        <Button title="Add Comment!" onPress={this._submitPinForm} />
      </View>
    )
  }
}
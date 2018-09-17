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
  render() {
    return (
      <View>
        <FormInput value={this.props.comment} onChangeText={this.props._handleChange} />
        <Button title="Add Comment!" onPress={this.props._submitPinForm} />
      </View>
    )
  }
}
import React from "react";
import { StyleSheet, Text, View, Picker, TouchableOpacity } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";

export default class PinComment extends React.Component {
  render() {
    return (
      <View>
        <FormLabel>Comment:</FormLabel>
        <FormInput containerStyle=
        {{backgroundColor:"#85f7ed", borderBottomWidth:2, borderBottomColor:"black"}} 
          value={this.props.comment} 
          onChangeText={this.props._handleChange} 
          />
          <Text />
        <TouchableOpacity style={{alignItems:"center", backgroundColor: "#005387", padding: 15}} onPress={this.props._submitPinForm}>
          <Text style={{color:"#ECECE7", fontSize: 22}}>Post</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
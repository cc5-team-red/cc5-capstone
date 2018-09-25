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
        <FormLabel style={{ opacity: 1 }}>Comment:</FormLabel>
        <FormInput
          containerStyle={{ borderBottomWidth: 2, borderBottomColor: "black" }}
          inputStyle={{ color: 'black' }}
          value={this.props.comment}
          onChangeText={this.props._handleChange}
        />
        <Text />
        <View style={{ marginLeft: 20, marginRight: 20 }}>
          <TouchableOpacity style={{ alignItems: "center", backgroundColor: "#005387", padding: 15 }} onPress={this.props._submitPinForm}>
            <Text style={{ color: "#ECECE7", fontSize: 22 }}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
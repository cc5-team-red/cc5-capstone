import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from "react-native-elements";

export default class PinForm extends React.Component {
  static navigationOptions = {
    title: "Create Pin"
  };

  state = { language: "" }

  _onSubmit = (event) => {
    this.props.navigation.navigate("Home");
    this.props.screenProps._handleSubmit(event);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <FormLabel>Title</FormLabel>
          <FormInput value={this.props.screenProps.newPin.title} onChangeText={this.props.screenProps._onChangeTitle} />
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>

          <FormLabel>Type</FormLabel>
          {/* <FormInput value={this.props.screenProps.newPin.type} onChangeText={this.props.screenProps._onChangeType} /> */}
          <Picker
            selectedValue={this.props.screenProps.newPin.type}
            style={{ height: 50, width: 100 }}
            onValueChange={this.props.screenProps._onChangeType}>
            <Picker.Item label="no_passage" value="no_passage" />
            <Picker.Item label="danger" value="danger" />
            <Picker.Item label="help" value="help" />
            <Picker.Item label="medical facility" value="medical" />
            <Picker.Item label="fire" value="fire" />
          </Picker>
          {/* <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage> */}

          <FormLabel>Details</FormLabel>
          <FormInput value={this.props.screenProps.newPin.details} onChangeText={this.props.screenProps._onChangeDetails} />

          <Button
            style={styles.button}
            title="Create Pin"
            accessibilityLabel="Create a pin with this button"
            onPress={this._onSubmit}
          />
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start"
  },
  item: {
    marginTop: 50,
    width: 350
  },
  button: {
    marginTop: 20
  }
});

import React from "react";
import { Platform, ActionSheetIOS, StyleSheet, Text, View, Picker } from "react-native";
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


  _onSubmit = (event) => {
    this.props.navigation.navigate("Home");
    this.props.screenProps._submitPinForm(event);
  }

  _showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['no passage', 'danger', 'help', 'medical facility', 'fire', 'cancel'], 
      cancelButtonIndex: 5,
      title: "Pin Type",
      message: "Please Select A Type"},
    (buttonIndex) => {
      if (buttonIndex === 0) {
        this.props.screenProps._onChangeType("no_passage");
      }
      if (buttonIndex === 1) {
        this.props.screenProps._onChangeType("danger");
      }
      if (buttonIndex === 2) {
        this.props.screenProps._onChangeType("help");
      }
      if (buttonIndex === 3) {
        this.props.screenProps._onChangeType("medical");
      }
      if (buttonIndex === 4) {
        this.props.screenProps._onChangeType("fire");
      }
    } )
  }

  render() {
    if(!this.props.screenProps.newPin.type){
      this.props.screenProps._onChangeType("no_passage");
    }
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <FormLabel>Title</FormLabel>
          <FormInput value={this.props.screenProps.newPin.title} onChangeText={this.props.screenProps._onChangeTitle} />
          <FormValidationMessage>
            {"This field is required"}
          </FormValidationMessage>

          <FormLabel>Type</FormLabel>
          {Platform.OS === "android" ?
          ( <Picker
            selectedValue={this.props.screenProps.newPin.type}
            style={{ height: 50, width: 100 }}
            onValueChange={this.props.screenProps._onChangeType}
          >
            <Picker.Item label="no passage" value="no_passage" />
            <Picker.Item label="danger" value="danger" />
            <Picker.Item label="help" value="help" />
            <Picker.Item label="medical facility" value="medical" />
            <Picker.Item label="fire" value="fire" />
          </Picker> ) 
          : (
            <View>
              <FormLabel>{`Selected: ${this.props.screenProps.newPin.type}`}</FormLabel>
              <Button style={styles.button} title="Select Type" onPress={this._showActionSheet} />
            </View>
          )
          }

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

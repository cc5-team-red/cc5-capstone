import React from "react";
import {
  Platform,
  ActionSheetIOS,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Picker,
  Image
} from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  ButtonGroup,
} from "react-native-elements";

import { markerImages } from "../util/markers";

class BlackFormInput extends React.Component {
  render() {
    return (
      <FormInput
        containerStyle={styles.formInput}
        fontFamily='lato-black'
        value={this.props.value}
        onChangeText={this.props.onChangeText}
      />
    )
  }
};


export default class PinForm extends React.Component {
  static navigationOptions = {
    title: "Create Pin"
  };

  _onSubmit = (event) => {
    this.props.navigation.navigate("Home");
    this.props.screenProps._submitPinForm(event);
  }

  buttons = markerImages.map(imageComponent => {
    return { element: imageComponent };
  })

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formItems}>
          <FormLabel fontFamily='lato-black'>Title</FormLabel>
          <BlackFormInput
            value={this.props.screenProps.newPin.title}
            onChangeText={this.props.screenProps._onChangeTitle}
          />
          {this.props.screenProps.newPin.title ? null : (
            <FormValidationMessage>
              {"This field is required"}
            </FormValidationMessage>
          )}

          <FormLabel fontFamily='lato-black'>Type</FormLabel>
          <ButtonGroup
            onPress={this.props.screenProps._onChangeTypeIndex}
            selectedIndex={this.props.screenProps.newPin.typeIndex}
            selectedButtonStyle={styles.selectedpinButton}
            buttons={this.buttons}
            containerStyle={styles.pinButtonGroup}
          />

          <FormLabel fontFamily='lato-black'>Details</FormLabel>
          <BlackFormInput
            value={this.props.screenProps.newPin["details"]}
            onChangeText={this.props.screenProps._onChangeDetails}
          />

          <TouchableOpacity style={styles.createPinButton} onPress={this._onSubmit}>
            <Text style={styles.createPinButtonText}>Create Pin</Text>
          </TouchableOpacity>
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
  formItems: {
    flex: 0.8,
    marginTop: 60,
  },
  formInput: {
    borderBottomWidth: 2,
    borderBottomColor: "black"
  },
  createPinButton: {
    marginTop: 15,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#005387",
    paddingVertical: 15,
    paddingHorizontal: 106
  },
  createPinButtonText: {
    fontFamily: 'lato-black',
    color: "#ECECE7",
    fontSize: 22
  },
  pinButtonGroup: {
    height: 60
  },
  selectedpinButton: {
    backgroundColor: "#005387"
  }
});

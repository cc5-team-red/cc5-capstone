import React from "react";
import {
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


class BlackFormInput extends React.Component {
  render() {
    return (
      <FormInput
        containerStyle={styles.formInput}
        fontFamily='lato-black'
        value={this.props.value}
        onChangeText={this.props._onChangeUserName}
      />
    )
  }
};

export default class UserSettingsScreen extends React.Component {
  static navigationOptions = {
    title: "User Settings"
  };

  _onSubmit = (event) => {
    this.props.navigation.navigate("Home");
    this.props.screenProps._submitPinForm(event);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formItems}>
          <FormLabel fontFamily='lato-black'>Full Name</FormLabel>
          <BlackFormInput
            value={this.props.screenProps.user.name}
            onChangeText={this.props.screenProps._onChangeUserName("user.name")}
          />
          {this.props.screenProps.user.name ? null : (
            <FormValidationMessage>
              {"To help other zennin identify you, please enter your full name"}
            </FormValidationMessage>
          )}

          <TouchableOpacity style={styles.actionButton} onPress={this._onSubmit}>
            <Text style={styles.actionButtonText}>Save</Text>
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
  actionButton: {
    marginTop: 15,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#005387",
    paddingVertical: 15,
    paddingHorizontal: 106
  },
  actionButtonText: {
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

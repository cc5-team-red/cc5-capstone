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
        onChangeText={this.props.onChangeText}
      />
    )
  }
};

export default class UserSettingsScreen extends React.Component {
  static navigationOptions = {
    title: "User Settings"
  };

  state = {
    user_id: null,
    user: {
      name: null
    },
  }

  componentDidMount = () => {
    user_id = this.props.navigation.getParam("user_id");
    user = this.props.navigation.getParam("user");
    this.setState({ user_id, user })
  }

  _onSubmit = (event) => {
    this.props.navigation.navigate("Home");
    this.props.screenProps._updateUserSettings(this.state.user_id, this.state.user);
  }

  _onChangeUserName = name => {
    this.setState({
      user: {
        ...this.state.user,
        name
      }
    });
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formItems}>
          <FormLabel fontFamily='lato-black'>Full Name</FormLabel>
          <BlackFormInput
            value={this.state.user.name}
            onChangeText={this._onChangeUserName}
          />
          {this.state.user.name ? null : (
            <FormValidationMessage>
              {"To help other zennin identify you, \nplease enter your full name"}
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

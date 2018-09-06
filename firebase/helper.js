import { firebase } from './firebase';

function createPin(title, type, details) {
  firebase
    .database()
    .ref("users/") //ADD USER ID
    .set({
      title: title,
      type: type,
      details: details
    });
}

function pinListener() {
  return firebase
    .database()
    .ref("users/")
    .once('value') //*** may need to be consistently listening ***
    .then(function(snapshot) {
      console.log(snapshot.val());
      return (snapshot.val())
    })
}

export { createPin, pinListener }
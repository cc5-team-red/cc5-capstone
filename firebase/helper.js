import { firebase } from './firebase';

function createUser(name) {
  firebase
    .database()
    .ref("users/") //ADD USER ID
    .push()
    .set({
      name
      //add longitude and latitude
    });
}

function userListener() {
  return firebase
    .database()
    .ref("users/")
    .on('value', function(snapshot) {
      console.log(snapshot.val());
      return (snapshot.val())
    })
}

function createPin(title, type, details) {
  firebase
    .database()
    .ref("pins/")
    .push() //ADD USER ID
    .set({
      title,
      type,
      details
      //add timestamp, id, some other things.
    });
}

function pinListener() {
  return firebase
    .database()
    .ref("pins/")
    .once('value') //*** may need to be consistently listening ***
    .then(function(snapshot) {
      console.log(snapshot.val());
      return (snapshot.val())
    })
}

export { createUser, userListener, createPin, pinListener }
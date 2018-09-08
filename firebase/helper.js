import { firebase } from './firebase';

function createUser(...params) {
  firebase
    .database()
    .ref("users/")
    .push()
    .set(...params);
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

function createPin(...params) {
  firebase
    .database()
    .ref("pins/")
    .push()
    .set(...params);
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
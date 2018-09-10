import { firebase } from './firebase';

function createUser(...params) {
  return firebase
    .database()
    .ref("users/")
    .push({...params, updated: firebase.database.ServerValue.TIMESTAMP});
}

function updateUser(userId) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      0:{
        coordinate:{
          latitude: 0,
          longitude: 0
      }
    },
      updated: firebase.database.ServerValue.TIMESTAMP
    }
    )
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
    .push({...params, updated: firebase.database.ServerValue.TIMESTAMP});
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

export { createUser, updateUser, userListener, createPin, pinListener }
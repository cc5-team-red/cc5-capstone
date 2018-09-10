import { firebase } from './firebase';

function createUser(latitude, longitude, ...params) {
  return firebase
    .database()
    .ref("users/")
    .push({ ...params,  update: {latitude, longitude, timestamp: firebase.database.ServerValue.TIMESTAMP} })
    .key;
}

function updateUser(userId, latitude, longitude) {
  const updates = {};
  updates["users/" + userId + "/update"] = {
    latitude,
    longitude,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  }
  firebase
    .database()
    .ref()
    .update(updates)
}

function userListener() {
  return firebase
    .database()
    .ref("users/")
    .on('value', function (snapshot) {
      console.log(snapshot.val());
      return (snapshot.val())
    })
}

function createPin(...params) {
  firebase
    .database()
    .ref("pins/")
    .push({ ...params, updated: firebase.database.ServerValue.TIMESTAMP });
}

function pinListener() {
  return firebase
    .database()
    .ref("pins/")
    .once('value') //*** may need to be consistently listening ***
    .then(function (snapshot) {
      console.log(snapshot.val());
      return (snapshot.val())
    })
}

export { createUser, updateUser, userListener, createPin, pinListener }
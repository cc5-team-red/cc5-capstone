import { firebase } from './firebase';

function createUser(latitude, longitude, ...params) {
  return firebase
    .database()
    .ref("users/")
    .push({ ...params, update: {latitude, longitude, timestamp: firebase.database.ServerValue.TIMESTAMP} })
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

function userListener(my_user_id) {
  return firebase
    .database()
    .ref("users/")
    .on('value', function (snapshot) {
      console.log('listening to users...')
      console.log(my_user_id)
      const users = Object.entries(snapshot.val())
        .map(([key, value])=> {
          return {
            user_id: key,
            name: value["0"].name,
            timestamp: value.update.timestamp,
            latitude: value.update.latitude,
            longitude: value.update.longitude,
          }
        })
        .filter( users => users.user_id !== my_user_id) // filter out myself
      // console.log(users);
      return users;
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
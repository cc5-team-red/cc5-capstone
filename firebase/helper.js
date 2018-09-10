import { firebase } from "./firebase";

function createUser(latitude, longitude, ...params) {
  return firebase
    .database()
    .ref("users/")
    .push({
      ...params,
      update: {
        latitude,
        longitude,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }
    }).key;
}

function updateUser(userId, latitude, longitude) {
  const updates = {};
  updates["users/" + userId + "/update"] = {
    latitude,
    longitude,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  };
  firebase
    .database()
    .ref()
    .update(updates);
}

function userListener(my_user_id, callback) {
  return firebase
    .database()
    .ref("users/")
    .on("value", function(snapshot) {
      const users = Object.entries(snapshot.val())
        .map(([key, value]) => {
          const timestamp = new Date(value.update.timestamp);
          const oneHour = (1000 * 60 * 60)
          const now = new Date(Date.now())
          const hoursAgo = ((now - timestamp) / oneHour);
          return {
            user_id: key,
            name: value["0"].name,
            latitude: value.update.latitude,
            longitude: value.update.longitude,
            opacity: 1 - hoursAgo,
            timestamp,
          };
        })
        .filter(users => users.user_id !== my_user_id); // filter out myself
      callback(users);
    });
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
    .once("value") //*** may need to be consistently listening ***
    .then(function(snapshot) {
      return snapshot.val();
    });
}

export { createUser, updateUser, userListener, createPin, pinListener };

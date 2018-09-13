import { firebase } from "./firebase";

function createUser(userId, latitude, longitude, ...params) {
  firebase
    .database()
    .ref("users/" + userId)
    .set({
      ...params,
      update: {
        latitude,
        longitude,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }
    });
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
      const results = snapshot.val();
      if (!(typeof results === "object")) return callback([]);

      const users = Object.entries(results)
        .filter(([key, value]) => (value["0"] && value["0"].name)) // prevent borken data from breaking app
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
        .filter(user => (
          typeof user === "object" && user.user_id !== my_user_id // filter out myself
        ))

      callback(users);
    });
}

function createPin(...params) {
  console.log('createPin()')
  console.log({ ...params, updated: firebase.database.ServerValue.TIMESTAMP })
  firebase
    .database()
    .ref("pins/")
    .push({ ...params, updated: firebase.database.ServerValue.TIMESTAMP });
}

function pinListener(callback) {
  return firebase
    .database()
    .ref("pins/")
    // .once("value") //*** may need to be consistently listening ***
    // .then(function(snapshot) {
    //   return snapshot.val();
    // });
    .on("value", (snapshot) => {
      const results = snapshot.val();
      if (!results || !(typeof results === "object")) return callback([]);

      const pins = Object.entries(results)
        .filter(([key, value]) => (value["0"] && value["0"].coordinate)) // prevent borken data from breaking app
        .map(([key, value]) => {
          const timestamp = new Date(value.timestamp);
          const oneHour = (1000 * 60 * 60)
          const now = new Date(Date.now())
          const hoursAgo = ((now - timestamp) / oneHour);
          return {
            id: key,
            user_id: value["0"].userID,
            title: value["0"].title,
            coordinate: value["0"].coordinate,
            type: value["0"].type,
            details: value["0"].details,
            opacity: 1 - hoursAgo,
            timestamp,
          };
        })
      callback(pins);
    })
}

export { createUser, updateUser, userListener, createPin, pinListener };

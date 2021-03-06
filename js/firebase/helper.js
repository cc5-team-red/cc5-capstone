import { firebase } from "./firebase";

const EXPIRATION = 12;
// Time pin is displayed in hours
// Affects opacity and pin auto-deletion
// EASY HOUR CONVERSION TABLES:
// 0.1 = 6 minutes
// 0.01 = 36 seconds
// 0.001 = 3.6 seconds


const createUser = async (
  userId,
  latitude,
  longitude,
  ...params
) => {
  return await firebase
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

const getUser = async (userId) => {
  return firebase
    .database()
    .ref("users/" + userId + "/0")
    .once("value")
    .then((snapshot) => snapshot.val());
}

function updateUser(userId,
  latitude,
  longitude) {
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

const updateUserSettings = async (user_id, user) => {
  const updates = {};
  updates["users/" + user_id + "/0"] = { ...user };
  firebase
    .database()
    .ref()
    .update(updates);
}

function userListener(my_user_id,
  callback) {
  return firebase
    .database()
    .ref("users/")
    .on("value", function (snapshot) {
      const results = snapshot.val();
      if (typeof results !== "object" || results === null) return callback([]);

      const users = Object.entries(results)
        .filter(([key, value]) => (value["0"] && value["0"].name)) // prevent broken data from breaking app
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
            opacity: (EXPIRATION - hoursAgo) / EXPIRATION,
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
  firebase
    .database()
    .ref("pins/")
    .push({
      ...params,
      votes: { count: 1 },
      updated: { timestamp: firebase.database.ServerValue.TIMESTAMP }
    });
}

function upvotePin(pinId,
  result) {
  const updates = {};
  updates["/updated"] = {
    timestamp: firebase.database.ServerValue.TIMESTAMP
  }
  updates["/votes"] = {
    count: result
  }
  firebase
    .database()
    .ref("pins/" + pinId)
    .update(updates);
};

function downvotePin(pinId,
  result) {
  const updates = {};
  updates["/votes"] = {
    count: result
  }
  firebase
    .database()
    .ref("pins/" + pinId)
    .update(updates);
};

function commentPin(userId,
  pinId,
  comment) {
  firebase
    .database()
    .ref("pins/" + pinId + "/comments")
    .push({
      comment,
      userId,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
  //change userId to saved username (this.state.username??) if implemented
}

function deletePin(pinId) {
  firebase
    .database()
    .ref("pins/" + pinId)
    .remove()
}

function pinListener(callback) {
  return firebase
    .database()
    .ref("pins/")
    .on("value", (snapshot) => {
      const results = snapshot.val();
      if (!results || !(typeof results === "object")) return callback([]);

      const pins = Object.entries(results)
        .filter(([key, value]) => {
            const timestamp = new Date(value.updated.timestamp);
            const oneHour = (1000 * 60 * 60)
            const now = new Date(Date.now())
            const hoursAgo = ((now - timestamp) / oneHour)
            if (hoursAgo > EXPIRATION) {
              deletePin(key);
            }
            return (value["0"] && value["0"].coordinate && hoursAgo < EXPIRATION)
          }
        ) // prevent borken data from breaking app
        .map(([key, value]) => {
          const timestamp = new Date(value.updated.timestamp);
          const oneHour = (1000 * 60 * 60)
          const now = new Date(Date.now())
          const hoursAgo = ((now - timestamp) / oneHour).toFixed(2);
          return {
            id: key,
            user_id: value["0"].userID,
            title: value["0"].title,
            coordinate: value["0"].coordinate,
            type: value["0"].type,
            details: value["0"].details,
            opacity: (EXPIRATION - hoursAgo) / EXPIRATION,
            timestamp,
            hoursAgo,
            votes: value.votes.count,
            comments: value.comments,
          };
        })
      callback(pins);
    })
}

function createSketch(user_id, ...strokes) {
  console.log('createSketch()');
  console.log({
    ...strokes,
    updated: firebase.database.ServerValue.TIMESTAMP
  });
  firebase
    .database()
    .ref("sketches/")
    .push({
      ...strokes,
      userID: user_id,
      votes: { count: 1 },
      updated: { timestamp: firebase.database.ServerValue.TIMESTAMP },
    });
}

function deleteSketch(sketchId) {
  firebase
    .database()
    .ref("sketches/" + sketchId)
    .remove()
}

function sketchListener(callback) {
  return firebase
    .database()
    .ref("sketches/")
    .on("value", (snapshot) => {
      const results = snapshot.val();
      if (!results || !(typeof results === "object")) return callback([]);

      const sketches = Object.entries(results)
        .filter(([key, value]) => {
          const timestamp = new Date(value.updated.timestamp);
          const oneHour = (1000 * 60 * 60)
          const now = new Date(Date.now())
          const hoursAgo = ((now - timestamp) / oneHour)
          if(hoursAgo > EXPIRATION){
            deleteSketch(key);
          }
          return (value["0"] && value["0"][0].coordinates && hoursAgo < EXPIRATION)
        }) // prevent broken data from breaking app
        .map(([key, value]) => {
          const timestamp = new Date(value.updated.timestamp);
          const oneHour = (1000 * 60 * 60)
          const now = new Date(Date.now())
          const hoursAgo = ((now - timestamp) / oneHour);
          return {
            key: key,
            user_id: value.userID,
            strokes: value["0"],
            opacity: (EXPIRATION - hoursAgo)/EXPIRATION,
            timestamp,
            votes: value.votes.count,
            // TODO: title: value["0"].title,
            // TODO: comments: value.comments,
          };
        })
      callback(sketches);
    })
}

export {
  createUser,
  getUser,
  updateUser,
  updateUserSettings,
  userListener,
  createPin,
  pinListener,
  upvotePin,
  downvotePin,
  commentPin,
  deletePin,
  createSketch,
  sketchListener
};


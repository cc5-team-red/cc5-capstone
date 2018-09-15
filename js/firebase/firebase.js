import * as Firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAygdZCvIj-VqltYNPbzl0LcJMvv3WBLJY",
  authDomain: "zenni-c7cac.firebaseapp.com",
  databaseURL: "https://zenni-c7cac.firebaseio.com",
  projectId: "zenni-c7cac",
  storageBucket: "zenni-c7cac.appspot.com",
  messagingSenderId: "920452195470"
};

Firebase.initializeApp(firebaseConfig);

export const firebase = Firebase;
import firebase from 'firebase'
var config = {
   apiKey: "AIzaSyDZg4iHg70HUz9SPmG0vZFW7Uefk4LBfHU",
   authDomain: "seedlings-a91e7.firebaseapp.com",
   databaseURL: "https://seedlings-a91e7.firebaseio.com",
   projectId: "seedlings-a91e7",
   storageBucket: "",
   messagingSenderId: "501737719641"
 };
 var fire = firebase.initializeApp(config);

export default fire;

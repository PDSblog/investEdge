const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore }=require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyC7inKnmKZ_FYLjXhn6CfBSbxZo9xanzZk",
  authDomain: "upshare-c85c6.firebaseapp.com",
  projectId: "upshare-c85c6",
  storageBucket: "upshare-c85c6.firebasestorage.app",
  messagingSenderId: "416768766092",
  appId: "1:416768766092:web:4f57bf730e5df4fbaf4ba9",
  measurementId: "G-RZ81XC4BVK",
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
module.exports = { auth ,db};

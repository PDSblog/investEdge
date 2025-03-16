const { db } = require("./firebase");
const {
  collection,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");

const addData = async (name, email, dob, number) => {
  try {
    const docRef = await setDoc(doc(db, email, email), {
      name: name,
      email: email,
      dob: dob,
      number: number,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const addDataw = async (email, symbol) => {
  try {
    const docRef = await setDoc(doc(db, email, email, "share","share"), {
      symbol: symbol,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getDataw = async (email) => {
  try {
    const docRef = collection(db, email, email, "share","share");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return [];
  }
};

module.exports = { addData, addDataw, getDataw };

const { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
  } = require("firebase/auth");

  const { auth } = require("./firebase");
  
  
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  

  const logOut = async () => {
    try {
      await signOut(auth);
      return "User signed out";
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = { signUp, signIn, logOut };


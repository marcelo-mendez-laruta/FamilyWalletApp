import React, { useState, createContext, useContext } from 'react';
import { GoogleAuthProvider,signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut } from "firebase/auth";
import { auth } from '../firebase';

//#region Login with Google and Firebase
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();
//#endregion

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const _signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setUser(result.user);
        //setIsLoggedin(true);
        //setModalVisibility(false);
      }).catch((e) => {
        // Handle Errors here.
        let error = {};
        error.Code = e.code;
        error.Message = e.message;
        setUser(error);
      });
  }
  const _signInWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential.user);
        setUser(userCredential.user);
        //setIsLoggedin(true);
        //setModalVisibility(false);
        // ...
      })
      .catch((e) => {
        let error = {};
        error.Code = e.code;
        error.Message = e.message;
        setError(error);
        // ..
      });
  }
  const registerWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        setUser(userCredential.user);
        setIsLoggedin(true);
        setModalVisibility(false);
        console.log(userCredential.user);
        // ...
      })
      .catch((e) => {
        let error = {};
        error.Code = e.code;
        error.Message = e.message;
        setError(error);
      });
  }
  const logout = () => {
    signOut(auth).then(() => {
      setUser({});
      setIsLoggedin(false);
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setUser,
        _signInWithGoogle,
        _signInWithEmailAndPassword,
        registerWithEmailAndPassword
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
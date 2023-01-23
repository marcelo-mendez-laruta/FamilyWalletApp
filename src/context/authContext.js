import React, { useState, createContext, useContext, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,updatePassword } from "firebase/auth";
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const _signInWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {

        // Signed in
        const docRef = doc(db, "profiles", userCredential.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserProfile(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
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
  const registerWithEmailAndPassword = (user) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(async (userCredential) => {
          // Signed in 
          let newUser = {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            day: user.day,
            month: user.month,
            year: user.year,
          };
          newUser.uid = userCredential.user.uid;
          await setDoc(doc(db, "profiles", newUser.uid), newUser)
          setUserProfile(newUser);
          //setIsLoggedin(true);
          resolve(newUser);
        })
        .catch((e) => {
          let error = {};
          error.Code = e.code;
          error.Message = e.message;
          setError(error);
          reject(error);
          // ..
        });
    });
  }
  const getUserProfile = async (uid) => {
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserProfile(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such userProfile!");
    }
  }
  const updateProfile = async (profile) => {
    let newUser = {
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      day: profile.day,
      month: profile.month,
      year: profile.year,
      uid: profile.uid
    };
    await setDoc(doc(db, "profiles", profile.uid), newUser)
    setUserProfile(newUser);
    if (profile.password.length > 0) {
      console.log("Actualizando Password");
      let firebaseUser = auth.currentUser;
      const newPassword = profile.password;
      updatePassword(firebaseUser, newPassword).then((user) => {
        console.log("Usuario Firebase Actualizado" + user);
        setUser(user)
        // Update successful.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
    }
  }

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setUserProfile(null);
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setError,
        setUser,
        userProfile,
        setUserProfile,
        getUserProfile,
        updateProfile,
        _signInWithEmailAndPassword,
        registerWithEmailAndPassword,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
import React, { useRef, useState } from "react";
import Header from "./Header";
import chkValidData from "../utils/Validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { auth } from "../utils/Firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVTAR } from "../utils/constant";



const Login = () => {
  const [isSignInForm, SetIsSignInForm] = useState(true);
  const [errorMessage, SetErrorMessage] = useState(true);
 
  const dispatch = useDispatch()

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignupForm = () => {
    SetIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    // validate form dataS
    // chkValidData(email,password);
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message =chkValidData(email.current.value,password.current.value);
    SetErrorMessage(message)

    if (message) return;

    if(!isSignInForm){
      createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: USER_AVTAR
        }).then(() => {
          // Profile updated!
          const {uid, email,displayName,photoURL} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
          
       
        }).catch((error) => {
          // An error occurred
          // ...
          SetErrorMessage(error.message)
        });
        console.log(user);
      
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        SetErrorMessage(errorCode +"-"+errorMessage)
        // ..
      });
    }
    else{

signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    // console.log(user);
   
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    SetErrorMessage(errorCode +"-"+errorMessage)
  });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
        className="h-screen object-cover"
          src={BG_URL}
          alt="logo"
        />
      </div>

      <form onSubmit={(e)=>e.preventDefault()} className="absolute p-12 bg-black w-full md:w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
             ref={name}
            type="text"
            placeholder="Full name"
            className="p-4 my-4 w-full bg-gray-800"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-800"
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="p-4 my-4 w-full bg-gray-800"
        />

          <p className="text-red-500  font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignupForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already Registered Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;

import React from 'react'
import {API} from "../../backend"
import Axios from "axios"
import { useState } from 'react'
import {Link} from "react-router-dom"

//why typeof window == "undefined" or !== "undefined"
//It's to test if the script is being run in a web-browser or not. In a webpage, there are several intrinsic objects, such as window.

//What is stringify() ?
//sending the data to an API or web server or storing the data into a database --needed to serialize the data to strings (JSON.stringify())
  export const signup = user => {
    console.log("user",user)
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user) //send data to server then stringify it 
  })
    .then(response => {
      return response.json();
    })
    .catch(err =>
      { 
       console.log(err);
      })
};
  


  export const signin = user => {
    return fetch(`${API}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };


  //set token once signed in
  export const authenticate = (data, next) => {
      console.log(window);
      //If the window object exist, then typeof window !== "undefined"
    if (typeof window !== "undefined")//accessing window object 
    {
        //jwt is key, data is value
      localStorage.setItem("jwt", JSON.stringify(data));
      console.log(window);

      next();
    }
  };

  //getting the value of JWT key
  //checking authentication
  //false: not authenticated
  //true means send value
  export const isAutheticated = () => {
     //If the window object does not exist, then typeof window == "undefined"
    if (typeof window == "undefined") {
      return false;
    }
    //if there is jwt key return its value
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };
  

  export const signout = next => {
      //remove the jwt(key) token
      // if window object exists then remove JWT(key)
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
     
      next();
      return fetch(`${API}/signout`, {
        method: "GET"
      })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err));
    }
  };


  
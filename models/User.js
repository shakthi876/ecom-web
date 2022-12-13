const express = require('express')
const mongoose = require('mongoose')
const crypto = require("crypto");
const { v1: uuidv1 } = require('uuid');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
      type:String,
      maxlength:32,
      trim:true
  },
    
    email:{
        type:String,
        required:true,
        trim:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
      
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
},{timestamps: true})

//password is virtual function name
userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password; //store it in private variable
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
    
  })
  .get(function() {
    return this._password;
  });



  // authenticate and securePassword are two methodss

userSchema.methods = {
    
    authenticate: function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
      },

    securePassword: function(plainPassword){
      //console.log("password got is",plainPassword);
        if(!plainPassword) return ""; //can be removed as we have express-validator to check
            try {
                return crypto
                  .createHmac("sha256", this.salt)
                  .update(plainPassword)
                  .digest("hex");
              } catch (err) {
                return "";
              }
    }
}

module.exports =  mongoose.model('User', userSchema)
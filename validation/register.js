//import React, {Component} from 'react';
//import isEmpty from 'is-empty';
const Validator = require("validator");

//import Validator from 'validator';
const isEmpty = require("is-empty");


module.exports = function validateRegisterInput(data) {
  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  
  
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  
  // Name checks
  // @ts-ignore
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  
  // Email checks
  // @ts-ignore
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } 
  // @ts-ignore
  else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  // @ts-ignore
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  // @ts-ignore
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  // @ts-ignore
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  // @ts-ignore
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
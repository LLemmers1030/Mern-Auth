const Validator = require("validator");
const isEmpty = require("is-empty");

//import Validator from 'validator';

module.exports = function validateLoginInput(data) {
    let errors = {};

data.email = !isEmpty(data.email) ? data.email : "";
data.password = !isEmpty(data.password) ? data.password : "";

// @ts-ignore
if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
} 
// @ts-ignore
else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
}

// @ts-ignore
if (Validator.isEmpty(data.password)) {
errors.password = "Password field is required";
}

return {
    errors,
    isValid: isEmpty(errors)
  };
};
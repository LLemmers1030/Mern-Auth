const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// @ts-ignore
const jwt = require("jsonwebtoken");
// @ts-ignore
const keys = require("../../config/keys");

//import validateRegisterInput from "../../validation/register";
const validateRegisterInput = require("../../validation/register");
// @ts-ignore
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

    // Form validation

    // @ts-ignore
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid)
    {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

         // @ts-ignore
         // @ts-ignore
         bcrypt.genSalt(10, (err, salt) => {
            // @ts-ignore
            bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // @ts-ignore
            newUser.password = hash;
            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
        });
        }
    });
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req,res) => {

  // @ts-ignore
  const {errors, isValid} = validateLoginInput(req.body);

  if (!isValid){
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email}).then(user => {
    if(!user){
      return res.status(404).json({emailnotfound: "Email not found"});
    }

    // @ts-ignore
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          // @ts-ignore
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          // @ts-ignore
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;














const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next)=>{
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
      // password: req.body.password
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User created',
        result: result
      });
    }).catch(err => {
      res.status(500).json({
        message: "Invalid email. This email has been used. Please try another one."
      });
    });
  });
});

router.post("/login", (req, res, next) =>{
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    //Cannot find the user
    if (!user){
      return res.status(401).json({
        message: "Cannot find this user email, please try again."
      });
    }
    fetchedUser = user;
    //Check the user pw
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    // console.log(result);
    if (!result){
      return res.status(401).json({
        message: "Invalid password"
      });
    }
    //create jwt token
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      'my_secret_pk_panda_is_cute',
      {expiresIn: "1h"}
    );
    // console.log(token);
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "Invalid password"
    });
  });
});


module.exports = router;

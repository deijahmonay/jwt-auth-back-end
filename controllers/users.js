// /controllers/users.js
const express = require('express');
const router = express.Router();
// Add bcrypt and the user model
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

const SALT_LENGTH = 12

router.post('/signup', async (req, res) => {
    try{
        //Check if username is already taken
        const userInDatabase = await User.findOne
        ({username: req.body.username})
        if(userInDatabase) {
            return res.status(400).json({error: 'Username already taken.'})
        }
        //Create a new user with hashed password
        const user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH)
        })
        const token = jwt.sign(
            {username: user.username, _id: user._id}, 
            process.env.JWT_SECRET
        )
        res.status(201).json({user, token}) // in the 43-44 range
    }catch(err) {
        res.status(400).json({error: err.message})
    }
    // res.json({ message: 'Signup route' });
});

// controllers/users.js

router.post('/signin', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user && bcrypt.compareSync(req.body.password, 
        user.hashedPassword)) {
          const token = jwt.sign({
             username: user.username, 
             _id: user._id}, 
            process.env.JWT_SECRET
            )  
            res.status(200).json({ token });
        // res.json({ message: 'You are authorized!' });
      } else {
        res.status(401).json({ message: 'Invalid  username or password'})
        // res.json({ message: 'Invalid credentials.' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

module.exports = router;

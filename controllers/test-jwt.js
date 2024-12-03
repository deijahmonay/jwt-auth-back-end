// controllers/test-jwt.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

router.get('/sign-token', (req, res) => {
  const user = {
    _id: 1,
    username: 'test',
    password: 'test'
  }

  const token = jwt.sign({user}, process.env.JWT_SECRET)
  res.json({ token })
  // res.json({ message: 'You are authorized!' });
});

// controllers/test-jwt.js
router.post('/verify-token', (req, res) => {
  try{
  const token = req.headers.authorization.split(' ')[1]
  //Add a verify method
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  res.json({ decoded })
  // res.json({ message: 'Token is valid.' });
}catch(err){
  res.status(401).json({error: 'Invalid token.'})

}
});


module.exports = router;

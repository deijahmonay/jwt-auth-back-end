// controllers/test-jwt.js

// controllers/test-jwt.js
const jwt = require('jsonwebtoken')
// const { verify } = require("jsonwebtoken")

 function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken


// router.post('/verify-token', (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token.' });
//   }
// });

// module.exports = verifyToken
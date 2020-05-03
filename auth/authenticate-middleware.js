/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const secret = 'secret';
  const token = req.header.authorization;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if(error) {
        res.status(401).json({
          errorMessage : 'user not verified'
        })
      } else {
        req.decodedToken = decodedToken,
        next()
      }
    })
  } else {
  res.status(401).json({ you: 'shall not pass!' });
  }
};

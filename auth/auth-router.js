const router = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('../api/jokes-model');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  // implement registration

  const user = req.body;
  const rounds = 10;
  const hash = bcrypt.hashSync(user.password, rounds);
  user.password = hash;

  Users.addUser(user)
  .then(item => {
      res.status(200).json({
        data : item
      })
    })
    .catch(err => {
      res.status(400).json({
        errorMessage : 'Trouble adding user'
      })
    })

});

router.post('/login', (req, res) => {
  // implement login

  let { username, password } = req.body;

  Users.findByUsername(username)
    .then(user => {
      console.log(user)
      if(user && bcrypt.compareSync(password, user.password)){
        const token = genToken(user) 

        res.status(200).json({
          data : 'Access granted', token
        })
      } else {
        res.status(400).json({
          errorMessage : 'Problems validating your information'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        errorMessage : "Not a member or server issues"
      })
    })

});

function genToken(user){
  
  const payload = {
    username : user.username,
    password : user.password
  };

  const secret = 'secret'

  const options = {
    expiresIn : '1d'
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;

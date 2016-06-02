'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = router;

router.post('/', (req, res, next) => {
  User.find({email: req.body.email})
  .then( foundUser => {
  	if(foundUser.length){
  		throw new Error('That email is already registered!')
  	} else {
  		return User.create(req.body);
  	}
  })
  .then(user => {
  	res.json(user);
  })
  .catch(next);
});
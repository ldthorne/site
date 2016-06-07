'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const _ = require('lodash');

module.exports = router;

router.get('/admin', (req, res, next) => {
  User.find()
  .then( foundUsers => {
    const admin = foundUsers.find( user => user.isAdmin);
    if(admin){
      admin.password = null;
      admin.salt = null;
      res.json(admin);
    } else {
      res.json([]);
    }
  })
  .catch(next);
});

router.get('/', (req, res, next) => {
  User.find()
  .then( foundUsers => res.json(foundUsers.length))
  .catch(next);
});

router.put('/', (req, res, next) => {
  User.findById(req.body._id)
  .then( foundUser => {
    foundUser = _.merge(foundUser, req.body)
    return foundUser.save();
  })
  .then(savedUser => res.json(savedUser))
  .catch(next);
});

router.post('/', (req, res, next) => {
  User.find({email: req.body.email})
  .then( foundUser => {
  	if(foundUser.length){
  		throw new Error('That email is already registered!');
  	} else {
  		return User.create(req.body);
  	}
  })
  .then(user => {
  	res.json(user);
  })
  .catch(next);
});
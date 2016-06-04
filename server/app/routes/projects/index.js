'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const _ = require('lodash');

module.exports = router;

router.get('/', (req, res, next) => {
  Project.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
      res.json(project);
    })
    .catch(next);
});

router.put('/', (req, res, next) => {
  User.findById(req.body.userId)
  .then( user => {
    if(!user.isAdmin) {
      throw new Error('User does not have permission to delete a project.')
    }
    return Project.findById(req.body._id)
  })
  .then(project => {
    const updatedProject = _.merge(project, req.body);
    return updatedProject.save();
  })
  .then(savedProject => {
    res.json(savedProject);
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  Project.create(req.body)
    .then(createdProject => {
      res.status(201).json(createdProject);
    })
    .catch(next);
});

router.delete('/', (req, res, next) => {
  console.log(req.body)
  User.findById(req.body.userId)
  .then( user => {
    if(!user.isAdmin) {
      throw new Error('User does not have permission to delete a project.')
    }
    return Project.findByIdAndRemove(req.body._id)
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
});

'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
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

router.put('/:id', (req, res, next) => {
  Project.findById(req.params.id)
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

router.delete('/:id', (req, res, next) => {
  Project.findByIdAndRemove(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
});

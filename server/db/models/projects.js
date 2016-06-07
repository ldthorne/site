'use strict';

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  deployedLink: { type: String },
  endDate: { type: Date },
  githubLink: { type: String },
  longDescription: { type: String, required: true },
  shortDescription: { type: String },
  startDate: { type: Date, default: Date.now },
  title: { type: String, required: true }
});

mongoose.model('Project', ProjectSchema);

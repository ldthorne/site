'use strict';
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
	title: { type: String, required: true },
	shortDescription: { type: String },
	longDescription: { type: String, required: true },
	githubLink: { type: String },
	deployedLink: { type: String },
	startDate: { type: Date, default: Date.now },
	endDate: { type: Date }
});

mongoose.model('Project', projectSchema);
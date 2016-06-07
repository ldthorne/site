'use strict';

const crypto = require('crypto');
const mongoose = require('mongoose');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  salt: { type: String },
  isAdmin: { type: Boolean, default: false },
  biography: { type: String, required: true },
  picture: { type: String, default: 'http://www.fillmurray.com/400/400' },
  resume: { type: String },
  github: { type: String },
  linkedin: { type: String },
  facebook: { type: String },
  googlePlus: { type: String },
  instagram: { type: String },
  pinterest: { type: String },
  tumblr: { type: String },
  twitter: { type: String },
  siteTitle: { type: String, required: true }
});

// method to remove sensitive information from user objects before sending them out
UserSchema.methods.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
const generateSalt = () => {
  return crypto.randomBytes(16).toString('base64');
};

const encryptPassword = (plainText, salt) => {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

UserSchema.pre('save', function (next) {

  if (this.isModified('password')) {
    this.salt = this.constructor.generateSalt();
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }

  //this is to catch when a user deletes their picture without replacing it -- it doesn't fall back on the default value set in the schema
  if (!this.picture) {
    this.picture = 'http://www.fillmurray.com/400/400';
  }
  next();

});

UserSchema.statics.generateSalt = generateSalt;
UserSchema.statics.encryptPassword = encryptPassword;

UserSchema.method('correctPassword', function (candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', UserSchema);

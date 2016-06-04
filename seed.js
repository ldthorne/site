/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

const mongoose = require('mongoose');
const Bluebird = require('bluebird');
const chalk = require('chalk');
const connectToDb = require('./server/db');
const User = Bluebird.promisifyAll(mongoose.model('User'));
const Project = Bluebird.promisifyAll(mongoose.model('Project'));
const moment = require('moment');

const seedUsers = function () {

  const users = [
  // {
  //   email: 'ldthorne@brandeis.edu',
  //   password: 'password',
  //   isAdmin: true
  // }, {
  //   email: 'obama@gmail.com',
  //   password: 'potus'
  // }
  ];
  return User.createAsync(users);
};

const seedProjects = function () {
  const projects = [{
      title: 'This is the first project',
      shortDescription: 'This is the short description for the first project',
      longDescription: 'This is the longer description for the first project!! Wow filling up so much room with this right now!',
      githubLink: 'https://github.com/ldthorne/firstProject',
      deployedLink: 'http://somedeployment.com',
      startDate: moment().subtract({ days: 3 }),
      endDate: moment()
    }, {
      title: 'This is the second project',
      shortDescription: 'This is the short description for the second project',
      longDescription: 'This is the longer description for the second project!! Wow filling up so much room with this right now!',
      githubLink: 'https://github.com/ldthorne/secondProject',
      deployedLink: 'http://somedeployment.com',
      startDate: moment().subtract({ days: 3 }),
      endDate: moment()
    }, {
      title: 'This is the third project',
      shortDescription: 'This is the short description for the third project',
      longDescription: 'This is the longer description for the third project!! Wow filling up so much room with this right now!',
      githubLink: 'https://github.com/ldthorne/thirdProject',
      deployedLink: 'http://somedeployment.com',
      startDate: moment().subtract({ days: 3 }),
      endDate: moment()
    }, {
      title: 'This is the fourth project',
      shortDescription: 'This is the short description for the fourth project',
      longDescription: 'This is the longer description for the fourth project!! Wow filling up so much room with this right now!',
      githubLink: 'https://github.com/ldthorne/fourthProject',
      deployedLink: 'http://somedeployment.com',
      startDate: moment().subtract({ days: 3 }),
      endDate: moment()
    }

  ];
  return Project.createAsync(projects);
}

connectToDb.then(function () {
  User.findAsync({})
  .then( users => {
    if (!users.length) {
      return;
    } else {
      console.log(chalk.magenta('Seems to already be user data, removing!!'));
      return User.remove({});
    }
  })
  .then(() => seedUsers() )
  .then(()  =>  Project.findAsync({}) )
  .then( projects => {
    if (!projects.length) {
      return;
    } else {
      console.log(chalk.magenta('Seems to already be project data, removing!!'));
      return Project.remove({});
    }
  })
  .then(() => seedProjects() )
  .then(() => {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
  })
  .catch( err => {
    console.error(err);
    process.kill(1);
  });
});

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

const seedUsers = function () {

    const users = [
        {
            email: 'ldthorne@brandeis.edu',
            password: 'password',
            isAdmin: true
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log('inside!')
            console.log(chalk.magenta('Seems to already be user data, removing!!'));
            return Bluebird.all([User.remove({}), Project.remove({})])
            .then( () => {
                console.log(chalk.green('Seed successful!'));
                return seedUsers();
            })
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

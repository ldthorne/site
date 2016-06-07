'use strict';
const router = require('express').Router();
module.exports = router;

router.use('/projects', require('./projects'));
router.use('/users', require('./users'));

// Make sure this is after all of
// the registered routes!
router.use((req, res) => {
  res.status(404).end();
});

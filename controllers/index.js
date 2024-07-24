// ***NOTICE***
// file is heavily modled after the template used for the same files throughout the course

const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
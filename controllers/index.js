// ***NOTICE***
// file is heavily modled after the template used for the same files throughout the course

const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

// const apiRoutes = require('./api');

// router.use('/api', apiRoutes);

router.use('/', homeRoutes);

module.exports = router;
const router = require('express').Router();
const apiRoutes = require('./api');

console.log('API routes loaded');

router.use('/', apiRoutes);

module.exports = router;
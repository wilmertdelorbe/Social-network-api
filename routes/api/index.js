const router = require('express').Router();
const profileRoutes = require('./profile-routes');
const ideaRoutes = require('./idea-routes');

router.use('/profiles', profileRoutes);
router.use('/ideas', ideaRoutes);

module.exports = router;
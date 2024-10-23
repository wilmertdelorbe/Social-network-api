const router = require('express').Router();
const {
  fetchAllProfiles,
  fetchProfileById,
  createProfile,
  updateProfile,
  removeProfile,
  addConnection,
  removeConnection,
} = require('../../controllers/profile-controller');

// /api/profiles
router.route('/')
  .get((req, res, next) => {
    console.log('GET /api/profiles route hit');
    fetchAllProfiles(req, res, next);
  })
  .post((req, res, next) => {
    console.log('POST /api/profiles route hit');
    createProfile(req, res, next);
  });

// /api/profiles/:profileId
router.route('/:profileId')
  .get((req, res, next) => {
    console.log(`GET /api/profiles/${req.params.profileId} route hit`);
    fetchProfileById(req, res, next);
  })
  .put((req, res, next) => {
    console.log(`PUT /api/profiles/${req.params.profileId} route hit`);
    updateProfile(req, res, next);
  })
  .delete((req, res, next) => {
    console.log(`DELETE /api/profiles/${req.params.profileId} route hit`);
    removeProfile(req, res, next);
  });

// /api/profiles/:profileId/connections/:connectionId
router.route('/:profileId/connections/:connectionId')
  .post((req, res, next) => {
    console.log(`POST /api/profiles/${req.params.profileId}/connections/${req.params.connectionId} route hit`);
    addConnection(req, res, next);
  })
  .delete((req, res, next) => {
    console.log(`DELETE /api/profiles/${req.params.profileId}/connections/${req.params.connectionId} route hit`);
    removeConnection(req, res, next);
  });

module.exports = router;
const router = require('express').Router();
const {
  fetchAllIdeas,
  fetchIdeaById,
  generateIdea,
  modifyIdea,
  removeIdea,
  addFeedbackToIdea,
  removeFeedbackFromIdea,
} = require('../../controllers/idea-controller');

// /api/ideas
router.route('/')
  .get((req, res, next) => {
    console.log('GET /api/ideas route hit');
    fetchAllIdeas(req, res, next);
  })
  .post((req, res, next) => {
    console.log('POST /api/ideas route hit');
    generateIdea(req, res, next);
  });

// /api/ideas/:ideaId
router.route('/:ideaId')
  .get((req, res, next) => {
    console.log(`GET /api/ideas/${req.params.ideaId} route hit`);
    fetchIdeaById(req, res, next);
  })
  .put((req, res, next) => {
    console.log(`PUT /api/ideas/${req.params.ideaId} route hit`);
    modifyIdea(req, res, next);
  })
  .delete((req, res, next) => {
    console.log(`DELETE /api/ideas/${req.params.ideaId} route hit`);
    removeIdea(req, res, next);
  });

// /api/ideas/:ideaId/feedback
router.route('/:ideaId/feedback')
  .post((req, res, next) => {
    console.log(`POST /api/ideas/${req.params.ideaId}/feedback route hit`);
    addFeedbackToIdea(req, res, next);
  });

// /api/ideas/:ideaId/feedback/:feedbackId
router.route('/:ideaId/feedback/:feedbackId')
  .delete((req, res, next) => {
    console.log(`DELETE /api/ideas/${req.params.ideaId}/feedback/${req.params.feedbackId} route hit`);
    removeFeedbackFromIdea(req, res, next);
  });

module.exports = router;
const router = require('express').Router();
const {
  addThought,
  getAllThoughts,
  removeThought,
  updateThought,
  addReaction,
  getThoughtById,
  removeReaction
} = require('../../controllers/thought_controller');

// /api/Thoughts
router
  .route('/')
  .get(getAllThoughts)

// /api/thoughts/:userId
router.route('/:userId').post(addThought);

// /api/Thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// /api/Thoughts/:id/reactions
router
  .route('/:id/reactions')
  .put(addReaction);

// /api/Thoughts/:id/reactions/:id
router
  .route('/:id/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
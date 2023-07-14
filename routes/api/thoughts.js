const router = require('express').Router();
const {
    getThoughts,
    getThoughtId,
    newThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require("../../controllers/controlThoughts")

// '/api/thoughts' - gets all thoughts 
router
    .route('/')
    .get(getThoughts);

// '/api/thoughts/:thoughtId - gets specific thought Id, allows for updating thought
router
    .route("/:thoughtId")
    .get(getThoughtId)
    .put(updateThought)

// 'api/thoughts/:userId' - gets user Id and can create new thought
router  
    .route('/:userId')
    .post(newThought)

// 'api/thoughts/:userId/:thoughtId' - gets specific user and their specific thought and allows for updates or deleting thought
router
    .route('/:userId/:thoughtId')
    .put(updateThought)
    .delete(deleteThought)

// 'api/thoughts/:thoughtId/reactions' - gets specific thought and allows for new reaction to be posted
router
    .route('/:thoughtId/reactions')
    .post(newReaction)

// 'api/thoughts/:thoughtId/reactions/:reactionId' - gets specific thought and reaction so it can be deleted
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router
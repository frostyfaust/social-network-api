const router = require('express').Router();
const {
    getUsers,
    getUserId,
    newUser,
    updateUser,
    deleteUser,
    newFriend,
    deleteFriend
} = require("../../controllers/controlUsers")

// '/api/user' - gets all users and allows for new user to be made
router
    .route('/')
    .get(getUsers)
    .post(newUser)

// '/api/user/:id' - gets user, allows for update or deleting user
router
    .route("/:id")
    .get(getUserId)
    .put(updateUser)
    .delete(deleteUser)

// 'api/user/:userId/friends/:friendId' - grabs a user and adds or deletes a friend 
router  
    .route('/:userId/friends/:friendId')
    .post(newFriend)
    .delete(deleteFriend)

module.exports = router
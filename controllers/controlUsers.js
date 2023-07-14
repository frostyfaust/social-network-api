const {Thought, User } = require("../models")

const controlUsers = {
    getUsers(req,res){
        User.find({})
            .populate({
                path:"thoughts",select: "-__v",
            })
            .select("-__v")
            .sort({_id:-1})
            .then((userDbData)=> res.json(userDbData))
            .catch(err=> {
                console.log(err);
                res.status(500).json(err);
            });
    },
    getUserId({ params },res){
        User.findOne({_id: params.id})
        .populate({
            path:'thoughts',
            select: "-__v",
        })
        .then((userDbData)=> res.json(userDbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    newUser({body},res){
        User.create(body)
        .then(userDbData => res.json(userDbData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    updateUser({params, body},res){
        User.findOneAndUpdate({_id: params.id}, body, {runValidators: true, new: true})
        .then((userDbData)=>{
            if (!userDbData) {
                res.status(404).json({ message: "No user was found with this id"})
            }
            res.json(userDbData)
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json(err)
        })
    },
    async deleteUser(req,res){
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
      
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
      
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'user has been deleted' });
          } catch (err) {
            res.status(500).json(err);
          }
    },
    async newFriend(req,res){
        try{
            const friend = await User.findOne({_id: req.params.friendId})

            if(!friend){
                return res.status(404).json({ message: 'No user with that ID' });
            }

            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true }
            )
            if (!user){
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user)
        }catch (err) {
            res.status(500).json(err);
          }

    },
    async deleteFriend(req,res){
        try {
            const friend = await User.findOne({ _id: req.params.courseId });
      
            if (!friend) {
              return res.status(404).json({ message: 'No user with that ID' });
            }
      
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
                );

            if (!user){
               return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
    }
}

module.exports = controlUsers
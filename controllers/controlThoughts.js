const { Thought, User } = require("../models")

const controlThoughts = {

    async getThoughts(req,res) {
        try {
            const thoughts = await Thought.find()
            .populate({
                path: 'reactions',
                select:'-__v'
            })
            .select('-__v');

            res.json(thoughts);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    async getThoughtId(req,res){
        try {
            const thought = await Thought.findOne({ _id: req.params.Id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v');
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with that ID' });
            }
      
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          }

    },
    async newThought(req,res){
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts:thought._id } },
                { new: true }
                );
            if(!user){
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }

    },
    async updateThought(req,res){
       try{
         const thought = await Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators:true}
        )
        if (!thought){
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    async deleteThought(req,res){
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      
            if (!thought) {
              return res.status(404).json({ message: 'No such thought exists' });
            }
      
            const user = await User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            );
      
            if (!user) {
              return res.status(404).json({message: 'No user with that ID'});
            }
      
            res.json(user);
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
          }
        },
    async newReaction(req,res){
        try {
            const thought = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $addToSet: { reactions: req.body } },
              { runValidators: true, new: true }
            );
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought found with that ID' });
            }
      
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    async deleteReaction(req,res){
        try {
            const thought = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $pull: { reactions: { reactionId: req.params.reactionId } } },
              { runValidators: true, new: true }
            );
      
            if (!thought) {
              return res.status(404)
            .json({ message: 'No thought found with that ID' });
            }
      
            res.json(student);
          } catch (err) {
            res.status(500).json(err);
          }
    }
}

module.exports = controlThoughts
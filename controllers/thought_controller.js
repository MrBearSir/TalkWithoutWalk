const { Thought, User } = require('../models');

const thoughtController = {

  //Get for all Thoughts
    getAllThoughts(req, res) {
      Thought.find({})
          .populate({
              path: "reactions",
              select: "-__v",
              strictPopulate: false
          })
          .select("-__v")
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
          console.log(err);
          res.sendStatus(400);
          });
    },

//Get Thought by _id
    getThoughtById({params}, res) {
      Thought.findOne({ _id: params.id })
          .populate({
              path: "reactions",
              select: "-__v",
              strictPopulate: false
          })
          .select("-__v")
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
          console.log(err);
          res.sendStatus(400);
          });
    },

    // add thought to this User
    addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
        .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: _id } },
            { new: true }
        );
        })
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

  // add reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reaction: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove thought
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err))
  },
  // remove reaction
  removeReaction({ params }, res) {
    User.findOneAndUpdate(
    { _id: params.userId },
    { $pull: { reactions: params.id } } ,
    { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;

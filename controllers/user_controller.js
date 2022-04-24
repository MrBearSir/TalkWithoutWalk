const { User } = require("../models");

const userController = {

    //Get for all Users
    getAllUsers(req, res) {
        User.find({})
          .populate({
              path: "friends",
              select: "-__v"
          })
          .select("-__v")
          .sort({ _id: -1 })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },

    //Get one User by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: "friends",
            select: "-__v"
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
    },

    //Create User
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //Update User
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id },body, { new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Can't find User with this id!"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //Delete User
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;
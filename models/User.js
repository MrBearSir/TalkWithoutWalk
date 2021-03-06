const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Please enter valid email address."]
        },
        thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        }
        ],
        friends: [{}]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.reduce(
        (total, user) => total + user.lenght +1, 0
    );
});

const User = model("User", UserSchema);

module.exports = User;
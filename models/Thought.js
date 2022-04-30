const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
        trim: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );  

const ThoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        match: [/.{1,280}/, "Your thought should be no longer than 280 characters."]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true,
        trim: true 
    },
    reaction: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
}
);

// reaction count virtual
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
  });

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
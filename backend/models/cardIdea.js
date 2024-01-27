const mongoose = require('mongoose');

const cardIdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  chance: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  }
});

const CardIdea = mongoose.model('cardIdeas', cardIdeaSchema);

module.exports = CardIdea
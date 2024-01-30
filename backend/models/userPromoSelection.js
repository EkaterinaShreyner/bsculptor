const mongoose = require('mongoose');

const userPromoSelection = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  cardPromoId: {
    type: Number
  }
});

const UserPromoSelection = mongoose.model('userPromoSelection', userPromoSelection);

module.exports = CardIdea
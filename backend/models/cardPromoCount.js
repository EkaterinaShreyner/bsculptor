const mongoose = require('mongoose');

const cardPromoCount = new mongoose.Schema({
  cardPromoId: {
    type: Number,
    default: -1,
  },
  title: {
    type: String,
    default: 0
  },
  countChoosed: {
    type: Number,
    default: 0,
  }
});

const CardPromoCount = mongoose.model('cardPromoCounts', cardPromoCount);

module.exports = CardPromoCount
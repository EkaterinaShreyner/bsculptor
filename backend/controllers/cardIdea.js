const CardIdea = require('../models/cardIdea');
const { SUCCESS_CREATE__REQUEST } = require('../utils/constants');

// запрос всех карточек
function getCardIdeas(_req, res, next) {
  CardIdea.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err.name));
}

function createNewCardIdea(req, res, next) {
  const { title, chance } = req.body;
  CardIdea.create({ title, chance })
    .then((card) => res.status(SUCCESS_CREATE__REQUEST).send(card))
    .catch((err) => {
      console.log(err);
      // if (err.name === 'ValidationError') {
      //   return next(new BadRequestError('Переданы некорректные данные'));
      // }
      return next(err);
    });
}

function likeCard(req, res) {
  const { cardId } = req.params;
  CardIdea.findByIdAndUpdate(
    cardId,
    { $inc: { likes: 1 } }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err.name);
      return next(err);
    });
}

function dislikeCard(req, res) {
  const { cardId } = req.params;
  CardIdea.findByIdAndUpdate(
    cardId,
    { $inc: { dislikes: 1 } }
  )
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      console.log(err.name);
      return next(err);
    });
}

module.exports = {
  getCardIdeas,
  createNewCardIdea,
  likeCard,
  dislikeCard
};
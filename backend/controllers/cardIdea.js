const CardIdea = require('../models/cardIdea');
const { SUCCESS_CREATE__REQUEST } = require('../utils/constants');

// запрос всех карточек
function getCardIdeas(_req, res, next) {
  CardIdea.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err.name));
}

// создание новой идеи
function createNewCardIdea(req, res, next) {
  const { title, chance } = req.body;
  CardIdea.create({ title, chance })
    .then((card) => res.status(SUCCESS_CREATE__REQUEST).send(card))
    .catch((err) => {
      console.log(err);
      return next(err);
    });
}

// лайк
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

// дислайк
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
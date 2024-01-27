const CardIdea = require('../models/cardIdea');

// запрос всех карточек
function getCardIdeas(_req, res) {
  CardIdea.find({})
    .then((cards) => res.send(cards))
    // .catch((err) => next(err));
    .catch((err) => console.log(err));
}

function createNewCardIdea(req, res) {
  const { title, chance } = req.body;
  CardIdea.create({ title, chance })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.log(err);
      // if (err.name === 'ValidationError') {
      //   return next(new BadRequestError('Переданы некорректные данные карточки'));
      // }
      // return next(err);
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
    });
}

module.exports = {
  getCardIdeas,
  createNewCardIdea,
  likeCard,
  dislikeCard
};
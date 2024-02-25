require('dotenv').config();
const CardIdea = require('../models/cardIdea');
const { SUCCESS_CREATE__REQUEST } = require('../utils/constants');

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "sk-or-vv-84f73fd5eda54d7c3ecab670898a3f36f479dbc1d94df1c1bc036ed6facf2b5a",
  // baseURL: "https://api.vsegpt.ru:6070/v1/"
  baseURL: "https://api.vsegpt.ru/v1/"
});

async function getMessageText(title) {
  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `Это можно считать за бизнес идею: "${title}"? Ответь одним словом только Да или Нет` }],
    model: 'openai/gpt-3.5-turbo-1106',
    // model: 'openai/gpt-3.5-turbo-0125',
    temperature: 0.7
  });
  return response.choices[0].message.content.toLowerCase()
}


// запрос всех карточек
function getCardIdeas(_req, res, next) {
  CardIdea.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err.name));
}

// создание новой идеи
async function createNewCardIdea(req, res, next) {
  const { title, chance } = req.body;
  const openResponce = await getMessageText(title)
  if (openResponce.includes("да")) {
    CardIdea.create({ title, chance })
    .then((card) => {
      res.status(SUCCESS_CREATE__REQUEST).send(card)
    })
    .catch((err) => {
      return next(err);
    });
  } else {
    return res.send(openResponce.toString())
  }
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
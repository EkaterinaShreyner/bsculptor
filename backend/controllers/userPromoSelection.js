require('dotenv').config();
const nodemailer = require('nodemailer')
const { OpenAI } = require("openai");

const UserPromoSelection = require('../models/userPromoSelection');
const CardPromoCount = require('../models/cardPromoCount');

const openai = new OpenAI({
  apiKey: "sk-or-vv-84f73fd5eda54d7c3ecab670898a3f36f479dbc1d94df1c1bc036ed6facf2b5a",
  // baseURL: "https://api.vsegpt.ru:6070/v1/"
  baseURL: "https://api.vsegpt.ru/v1/"
});

async function getMessageText(title) {
  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `Оцени идею в трех предложениях. ${title}` }],
    // model: 'openai/gpt-3.5-turbo',
    model: 'openai/gpt-3.5-turbo-1106',
    temperature: 0.7
  });
  return response.choices[0].message.content
}


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

function createUserPromo(req, res, next) {
  const { userEmail, cardPromoId, title } = req.body;

  UserPromoSelection.create({ userEmail, cardPromoId })
    .then(() => {
      // Обновляем состояние выбранных промокодов
      return CardPromoCount.updateOne(
        { cardPromoId: cardPromoId },
        { $inc: { countChoosed: 1 } }
      );
    })
    .then(() => {
      // Получаем текст от OpenAI
      return getMessageText(title);
    })
    .then((res) => {
      const textFromAi = res.toString()
      const emailText = `Ваша бизнес идея: ${title}.\n${textFromAi}`
      // Отправляем email
      return transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Письмо от bsculptor',
        text: emailText
      });
    })
    .then((text) => {
      // Все операции завершились успешно, отправляем ответ
      res.status(204).send(text);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
      } else {
        next(err);
      }
    });
}

// запрос кол-ва выбранных промокодов
function getPromoCodes(_req, res, next) {
  CardPromoCount.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err.name));
}

module.exports = {
  createUserPromo,
  getPromoCodes
};
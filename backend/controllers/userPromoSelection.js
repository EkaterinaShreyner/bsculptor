require('dotenv').config();
const nodemailer = require('nodemailer')
const { OpenAI } = require("openai");

const UserPromoSelection = require('../models/userPromoSelection');
const CardPromoCount = require('../models/cardPromoCount');

const openai = new OpenAI({
  apiKey: "sk-or-vv-84f73fd5eda54d7c3ecab670898a3f36f479dbc1d94df1c1bc036ed6facf2b5a",
  baseURL: "https://api.vsegpt.ru:6070/v1/"
});

async function getMessageText(title) {
  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: `Оцени идею в трех предложениях. ${title}` }],
    model: 'gpt-3.5-turbo',
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
        { $inc: { countChoose: 1 } }
      );
    })
    .then(() => {
      // Получаем текст от OpenAI
      return getMessageText(title);
    })
    .then((emailText) => {
      // Отправляем email
      return transporter.sendMail({
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Письмо от bsculptor',
        text: emailText
      });
    })
    .then(() => {
      // Все операции завершились успешно, отправляем ответ
      res.status(204).send();
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
      } else {
        next(err);
      }
    });
}

// записать в БД email, id карточки
// function createUserPromo(req, res, next) {
//   const { userEmail, cardPromoId, title } = req.body;
//   UserPromoSelection.create({ userEmail, cardPromoId })
//     .then(() => {
//       //Обновляем состояние выбранных промокодов
//       CardPromoCount.updateOne(
//         {cardPromoId: cardPromoId},
//         { $inc: { countChoose: 1 } }
//       )
//         .then(() => {
//           res.status(204).send()
//           const emailText = await getMessageText(title)
//           transporter.sendMail({
//             from: process.env.EMAIL,
//             to: userEmail,
//             subject: 'Письмо от bsculptor',
//             text: emailText
//           })
//         })
//         .catch((err) => {
//           console.log(err)
//           return next(err);
//         });
//     })
//     .catch((err) => {
//       return next(err);
//     });
// }

module.exports = {
  createUserPromo
};
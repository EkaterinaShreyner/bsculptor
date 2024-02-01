require('dotenv').config();
const nodemailer = require('nodemailer')

const UserPromoSelection = require('../models/userPromoSelection');
const CardPromoCount = require('../models/cardPromoCount');


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

// записать в БД email, id карточки
function createUserPromo(req, res, next) {
  const { userEmail, cardPromoId } = req.body;
  UserPromoSelection.create({ userEmail, cardPromoId })
    .then(() => {
      //Обновляем состояние выбранных промокодов
      CardPromoCount.updateOne(
        {cardPromoId: cardPromoId},
        { $inc: { countChoose: 1 } }
      )
        .then(() => {
          res.status(204).send()
          transporter.sendMail({
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'Письмо от bsculptor',
            text: 'Спасибо за выбор промо'
          })
        })
        .catch((err) => {
          console.log(err)
          return next(err);
        });
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  createUserPromo
};
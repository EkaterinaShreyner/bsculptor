require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const { requestLogger, errorLogger } = require('./middlewares/logger');
const cardIdeaRouter = require('./routes/cardIdea');
const userPromoSelection = require('./routes/userPromoSelection');
const errorsHandler = require('./middlewares/errorsHandler');

const NotFoundError = require('./errors/NotFoundError');


const { PORT } = process.env;
// const { MONGO_URL = 'mongodb://127.0.0.1:27017/ideasdb' } = process.env;
const { MONGO_URL } = process.env;
const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'https://bsculptor.ru'] }));

mongoose.connect(MONGO_URL, {
  // useNewUrlParser: true,
})
  .then(() => {
    console.log('БД подключена');
  })
  .catch((err) => {
    console.error(`Ошибка при подключении к БД: ${err.massage}`);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Логгер запросов нужно подключить до всех обработчиков роутов
app.use(requestLogger);

app.use('/', cardIdeaRouter);
app.use('/promo', userPromoSelection);


// роут для несуществующей страницы
app.use('/*', (_req, _res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// логгер ошибок подключаем после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger);

// централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
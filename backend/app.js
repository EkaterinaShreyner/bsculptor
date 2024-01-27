require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cardIdeaRouter = require('./routes/cardIdea');

const { PORT = 4000 } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:27017/ideasdb' } = process.env;
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('БД подключена');
  })
  .catch((err) => {
    console.error(`Ошибка при подключении к БД: ${err.massage}`);
  });

app.use(express.json());
// // app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));


// Логгер запросов нужно подключить до всех обработчиков роутов
app.use(requestLogger);

app.use('/', cardIdeaRouter);

// логгер ошибок подключаем после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
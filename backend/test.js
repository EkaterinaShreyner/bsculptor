// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const { PORT = 4000 } = process.env;
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors({ origin: 'http://localhost:3000' }));

// const mysql = require('mysql');

// const conn = mysql.createConnection({
//   host: "server211.hosting.reg.ru",
//   user: "u2446084_IDEA",
//   database: "u2446084_DB_IDEA",
//   password: "rS1qZ2oC3qyW2gR5"
// })

// conn.connect(err => {
//   if (err) {
//     console.log(err);
//     return err;
//   } else {
//     console.log('DB OK')
//   }
// })

// app.use(express.json());

// app.get('/', async (req, res) => {
//   try {
//     let query = "SELECT * FROM CardIdea";
//     const getFromDB = await conn.query(query);
//     res.send(getFromDB);
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Application is running on port ${PORT}`);
// });
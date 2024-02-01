const router = require('express').Router();

const {
  createUserPromo
} = require('../controllers/userPromoSelection');

router.post('/', createUserPromo);

module.exports = router;

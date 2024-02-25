const router = require('express').Router();

const {
  createUserPromo,
  getPromoCodes
} = require('../controllers/userPromoSelection');

router.post('/', createUserPromo);
router.get('/', getPromoCodes);

module.exports = router;

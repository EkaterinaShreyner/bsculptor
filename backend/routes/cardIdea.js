const router = require('express').Router();

const {
  getCardIdeas,
  createNewCardIdea,
  likeCard,
  dislikeCard,
} = require('../controllers/cardIdea');

router.get('/', getCardIdeas);
router.post('/', createNewCardIdea);
router.patch('/other-ideas/:cardId/dislikes', dislikeCard);
router.patch('/other-ideas/:cardId/likes', likeCard);

module.exports = router;

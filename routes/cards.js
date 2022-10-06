const router = require('express').Router();

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { cardValidator, cardIdValidator } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', cardValidator, createCard);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);
router.delete('/:cardId', cardIdValidator, deleteCard);

module.exports = router;

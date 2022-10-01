const Cards = require('../models/card');

const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

const getCards = (_, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(ERROR_500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({
          message:
          'Неверные данные, ошибка',
        });
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
    });
};

const deleteCard = (req, res) => {
  Cards.findById(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => {
      Cards.deleteOne(card).then(() => {
        res.send(card);
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_400).send({
          message: 'Неверно введены данные',
        });
      } else if (err.message === 'NotFound') {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
    });
};

const likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_400).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
    });
};

const dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_400).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  createCard,
  likeCard,
  getCards,
  dislikeCard,
  deleteCard,
};

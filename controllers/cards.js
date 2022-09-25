const Cards = require('../models/card');

const getCards = (_, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerID = req.user._id;
  Cards.create({ name, link, owner: ownerID })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message:
            'Неверно введены данные',
        });
      } else {
        res.status(500).send({ message: `Произошла ошибка: ${err}` });
      }
    });
};

const deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message:
            'Неверные данные',
        });
      } else {
        res.status(500).send({ message: `Произошла ошибка: ${err}` });
      }
    });
};

const dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message:
          'Неверные данные',
        });
      } else {
        res.status(500).send({ message: `Произошла ошибка: ${err}` });
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

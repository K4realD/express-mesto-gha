const Cards = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (_, res, next) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Неверно введены данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Cards.deleteOne(card).then(() => {
          res.send(card);
        });
      } else {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Неверно введены данные'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Неверно введены данные'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Неверно введены данные'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError('Карточка не найдена'));
      } else {
        next(err);
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

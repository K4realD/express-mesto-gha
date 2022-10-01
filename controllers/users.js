const Users = require('../models/user');

const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

const getUsers = (_, res) => {
  Users.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_500).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  Users.findById(userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => {
      res.send(user);
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

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({
          message: 'Неверно введены данные',
        });
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({
          message: 'Неверно введены данные',
        });
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(ERROR_404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_400).send({
          message: 'Неверно введены данные',
        });
      } else {
        res.status(ERROR_500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};

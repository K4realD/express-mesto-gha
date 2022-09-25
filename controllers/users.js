const Users = require('../models/user');

const getUsers = (_, res) => {
  Users.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  Users.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
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

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
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

const updateUser = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
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

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
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

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
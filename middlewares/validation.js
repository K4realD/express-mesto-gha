const { Joi, celebrate } = require('celebrate');

const urlPattern = /https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?/;

const userValidator = celebrate({
  body: Joi.object().keys(
    {
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    },
  ),
});

const avatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlPattern),
  }),
});

const cardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlPattern),
  }),
});

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

const authValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const registretionValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlPattern),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  userValidator,
  avatarValidator,
  userIdValidator,
  cardValidator,
  cardIdValidator,
  authValidator,
  registretionValidator,
};

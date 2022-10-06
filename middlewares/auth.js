const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, _, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  req.user = payload;

  next();
};

module.exports = auth;

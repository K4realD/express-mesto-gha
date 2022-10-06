const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, _, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(
      token,
      'dev-secret',
    );
  } catch (err) {
    throw new UnauthorizedError('Неверный электронный адрес или пароль');
  }
  req.user = payload;
  next();
};

module.exports = auth;

const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { authValidator, registretionValidator } = require('../middlewares/validation');
const { createUser, login, signout } = require('../controllers/users');

router.post('/signin', authValidator, login);
router.post('/signup', registretionValidator, createUser);
router.get('/signout', signout);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Маршрут не на ден'));
});

module.exports = router;

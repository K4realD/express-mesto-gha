const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const error = require('./middlewares/error');
const { login, createUser } = require('./controllers/users');
const { authValidator, registretionValidator } = require('./middlewares/validation');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.post('/signin', authValidator, login);
app.post('/signup', registretionValidator, createUser);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Ошибка 404' });
});
app.use(error);
app.use(errors());
app.listen(PORT, () => {
  console.log(`Executing on ${PORT}`);
});

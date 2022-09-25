const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use((req, _, next) => {
  req.user = {
    _id: '632b66204218645b44b4f66e',
  };
  next();
});
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Ошибка 404' });
});
app.listen(PORT, () => {
  console.log(`Executing on ${PORT}`);
});

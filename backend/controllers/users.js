const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const ServerError = require('../errors/ServerError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

// Обрабатываем логин пользователя.
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { JWT_SECRET } = req.app.get('config');
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.name !== 'UnauthorizedError') {
        next(new ServerError(err.message));
      } else {
        next(err);
      }
    });
};

// Получаем пользователя по id.
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((document) => {
      if (document) {
        const user = document.toObject();
        delete user._id;
        res.send({ user });
      } else {
        next(new NotFoundError('Пользователь не найден.'));
      }
    })
    .catch((err) => {
      next(new ServerError(err.message));
    });
};

// Создаем пользователя.
module.exports.createUser = (req, res, next) => {
  // Получаем данные из req.body.
  const {
    email,
    password,
    name,
  } = req.body;
  // Создаем запись в БД и обрабатываем ошибку.
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((document) => {
      const user = document.toObject();
      delete user.password;
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с такой почтой уже существует'));
      } else {
        next(new ServerError(err.message));
      }
    });
};

// Обновляем профиль пользователя.
module.exports.updateUser = (req, res, next) => {
  const query = User.find().or({ _id: req.user._id });
  if (req.body.email) {
    query.or({ email: req.body.email });
  }

  query
    .then((users) => {
      if (users.length === 0) {
        throw (new NotFoundError('Пользователь не найден.'));
      } else if (users.length > 1) {
        throw (new ConflictError('Пользователь с такой почтой уже существует'));
      } else {
        const [userDoc] = users;
        const user = {
          ...userDoc.toObject(),
          ...req.body,
        };
        return userDoc.updateOne(req.body).then(() => user);
      }
    })
    .then((updateUser) => {
      res.send({ data: updateUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

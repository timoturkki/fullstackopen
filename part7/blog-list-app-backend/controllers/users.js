const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();

const User = require('../models/user');
const { decodeToken } = require('../utils/authentication');

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, author: 1 });

  res.json(users.map(user => user.toJSON()));
});

usersRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    res.json(user.toJSON());
  } else {
    res.status(404).end();
  }
});

usersRouter.post('/', async (req, res) => {
  const { password, username, name } = req.body;
  let error;

  if (!password) {
    error = 'password is required';
  } else if (password.length < 3) {
    error = 'password must be at lease 3 characters long';
  }

  if (error) {
    return res.status(400).json({ error });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();

  res.json(savedUser);
});

usersRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const decodedToken = decodeToken(req.token);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  if (id !== user._id.toString()) {
    return res.status(401).json({ error: 'not authorized to perform this operation' });
  }

  await User.findByIdAndRemove(id);

  res.status(204).end();
});

module.exports = usersRouter;
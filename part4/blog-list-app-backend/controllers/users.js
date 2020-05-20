const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
  const { password, username, name } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();

  res.json(savedUser);
});

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({}).populate('blogs', { likes: 1, title: 1, url: 1, author: 1 });

  res.json(users.map(user => user.toJSON()));
});

usersRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndRemove(id);

  res.status(204).end();
});

module.exports = usersRouter;
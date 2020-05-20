const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();

const User = require('../models/user');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const credentialsAreCorrect = !user ? false : await bcrypt.compare(password, user.passwordHash);

  if (!credentialsAreCorrect) {
    return res.status(401).json({ error: 'invalid username or password' });
  }

  const id = user._id;
  const userForToken = { username, id };

  const token = jwt.sign(userForToken, process.env.SECRET);
  const { name } = user;

  res.status(200).send({ token, username, name });
});

module.exports = loginRouter;
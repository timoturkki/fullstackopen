const jwt = require('jsonwebtoken');

const decodeToken = (token) => jwt.verify(token, process.env.SECRET);

module.exports = { decodeToken };
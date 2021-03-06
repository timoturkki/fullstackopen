const logger = require('./logger');

const requestLogger = (req, _res, next) => {
  logger.info('Method:', req.method);
  logger.info('Path:  ', req.path);
  logger.info('Body:  ', req.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send('{ error: \'unknown endpoint\' }');
};

const errorHandler = (err, _req, res, next) => {
  logger.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }

  next(err);
};

const getTokenFrom = req => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};


const tokenExtractor = (req, _res, next) => {
  req.token = getTokenFrom(req);

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};
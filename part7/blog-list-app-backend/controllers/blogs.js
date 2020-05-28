const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');
const { decodeToken } = require('../utils/authentication');

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes } = req.body;

  const decodedToken = decodeToken(req.token);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({ title, author, url, likes, user: user._id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const decodedToken = decodeToken(req.token);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const blogToRemove = await Blog.findById(id);

  if (blogToRemove.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'not authorized to perform this operation' });
  }

  await Blog.findByIdAndRemove(id);

  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { title, author, url, likes } = req.body;
  const blog = { title, author, url, likes };

  const decodedToken = decodeToken(req.token);

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const blogToUpdate = await Blog.findById(id);

  if (blogToUpdate.user.toString() !== user._id.toString()) {
    return res.status(401).json({ error: 'not authorized to perform this operation' });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

  res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes, userId } = req.body;
  const user = await User.findById(userId);
  const blog = new Blog({ title, author, url, likes, user });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndRemove(id);

  res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { title, author, url, likes } = req.body;
  const blog = { title, author, url, likes };
  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });

  res.json(updatedBlog.toJSON());
});

module.exports = blogsRouter;
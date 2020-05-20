const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

describe('when blogs found from database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    await Blog.insertMany(helper.initialBlogs);
  });


  describe('Getting blogs', () => {
    it('should return blogs as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    it('should return correct amount of blogs blogs', async () => {
      const response = await api.get('/api/blogs');

      expect(response.body).toHaveLength(helper.initialBlogs.length);
    });

    it('should return correct titles for blogs', async () => {
      const response = await api.get('/api/blogs');

      const titles = response.body.map(r => r.title);

      expect(titles).toEqual(helper.initialTitles);
    });

    it('should return id instead of default _id for blog objects', async () => {
      const response = await api.get('/api/blogs');

      expect(response.body[0].id).toBeDefined();
      expect(response.body[0]._id).not.toBeDefined();
    });
  });

  describe('Creating blog', () => {
    it('should add new blog to database', async () => {
      const blog = {
        title: 'This is a great blog, trust me',
        author: 'Âme solitaire',
        url: 'http://www.blog.com',
        likes: 6,
      };

      await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();

      const titles = blogsAtEnd.map(r => r.title);

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
      expect(titles).toContain('This is a great blog, trust me');
    });


    it('should not allow adding blog without title', async () => {
      const blogWithoutTitle = {
        author: 'Âme solitaire',
        url: 'http://www.blog.com',
        likes: 4,
      };

      await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    it('should not allow adding blog without url', async () => {
      const blogWithoutUrl = {
        title: 'This is a great blog, trust me',
        author: 'Âme solitaire',
        likes: 4,
      };

      await api
        .post('/api/blogs')
        .send(blogWithoutUrl)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    it('should default likes value to 0 if not provided', async () => {
      const blogWithoutLikes = {
        title: 'Default like should be 0!',
        author: 'Âme solitaire',
        url: 'http://www.blog.com',
      };

      await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const savedBlog = (await helper.blogsInDb()).find(b => b.title === blogWithoutLikes.title);

      expect(savedBlog.likes).toBe(0);
    });
  });

  describe('Deleting blog', () => {
    it('should return with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const titles = blogsAtEnd.map(r => r.title);

      expect(titles).not.toContain(blogToDelete.title);
    });
  });

  describe('Updating blog', () => {
    it('should update likes amount for blog', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      const { title, author, url } = blogToUpdate;
      const likes = 9876;

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ title, author, url, likes })
        .expect(200);

      const blogsAtEnd = await helper.blogsInDb();

      expect(blogsAtEnd[0].likes).toBe(likes);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
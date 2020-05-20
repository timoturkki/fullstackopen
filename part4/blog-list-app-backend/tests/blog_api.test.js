const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');

const api = supertest(app);

describe('when blogs and one user found from database', () => {
  let userId;

  beforeEach(async () => {
    await Blog.deleteMany({});

    await Blog.insertMany(helper.initialBlogs);

    const savedUser = await helper.initDbWithUser();
    userId = savedUser._id;
  });


  describe('Getting blogs', () => {
    it('should return blogs as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    it('should return correct amount of blogs', async () => {
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
        userId,
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
        userId,
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
        userId,
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
        userId,
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

describe('when there is one user at db', () => {
  beforeEach(async () => {
    await helper.initDbWithUser;
  });

  describe('getting users', () => {
    it('should return users as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    it('should return return 1 user', async () => {
      const response = await api.get('/api/users');

      expect(response.body).toHaveLength(1);
    });

    it('should return correct usernames', async () => {
      const response = await api.get('/api/users');

      const usernames = response.body.map(r => r.username);

      expect(usernames).toEqual(['root']);
    });
  });

  describe('creating user', () => {
    it('should succesfully create user with unique username', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'timoturkki',
        name: 'Timo Turkki',
        password: 'mystery',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map(u => u.username);
      expect(usernames).toContain(newUser.username);
    });

    it('should fail with proper statuscode and message if username already exists', async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: 'root',
        name: 'Root Vegetable',
        password: 'mystery',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toContain('`username` to be unique');

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
const listHelper = require('../utils/list_helper');

const MOCK_BLOGS = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

describe('dummy', () => {
  it('should return one', () => {
    expect(listHelper.dummy([])).toBe(1);
  });
});

describe('totalLikes', () => {
  it('should returen total amount of likes for multiple blogs', () => {
    const result = listHelper.totalLikes(MOCK_BLOGS);
    expect(result).toBe(36);
  });

  it('should return the amount of single blog when only one given as argument', () => {
    const result = listHelper.totalLikes([MOCK_BLOGS[0]]);
    expect(result).toBe(7);
  });

  it('should return 0 when no blogs', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});

describe('favoriteBlog', () => {
  it('should return blog with most likes', () => {
    const result = listHelper.favoriteBlog(MOCK_BLOGS);
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    expect(result).toEqual(expected);
  });

  it('should return first blog with the top likes when there is multiple with same amount', () => {
    const result = listHelper.favoriteBlog(MOCK_BLOGS.map(blog => ({ ...blog, likes: 100 })));
    const expected = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 100,
    };

    expect(result).toEqual(expected);
  });
});

describe('mostBlogs', () => {
  it('should return author with most blogs', () => {
    const result = listHelper.mostBlogs(MOCK_BLOGS);
    const expected = {
      author: 'Robert C. Martin',
      blogAmount: 3
    };

    expect(result).toEqual(expected);
  });

  it('should return null when empty array given as argument', () => {
    const result = listHelper.mostBlogs([]);
    const expected = null;

    expect(result).toEqual(expected);
  });
});

describe('mostLikes', () => {
  it('should return author with most likes', () => {
    const result = listHelper.mostLikes(MOCK_BLOGS);
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    };

    expect(result).toEqual(expected);
  });

  it('should return null when empty array given as argument', () => {
    const result = listHelper.mostLikes([]);
    const expected = null;

    expect(result).toEqual(expected);
  });
});
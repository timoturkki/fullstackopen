const listHelper = require('../utils/list_helper');
const helper = require('./test_helper');

describe('dummy', () => {
  it('should return one', () => {
    expect(listHelper.dummy([])).toBe(1);
  });
});

describe('totalLikes', () => {
  it('should returen total amount of likes for multiple blogs', () => {
    const result = listHelper.totalLikes(helper.initialBlogs);
    expect(result).toBe(36);
  });

  it('should return the amount of single blog when only one given as argument', () => {
    const result = listHelper.totalLikes([helper.initialBlogs[0]]);
    expect(result).toBe(7);
  });

  it('should return 0 when no blogs', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});

describe('favoriteBlog', () => {
  it('should return blog with most likes', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs);
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    };

    expect(result).toEqual(expected);
  });

  it('should return first blog with the top likes when there is multiple with same amount', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs.map(blog => ({ ...blog, likes: 100 })));
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
    const result = listHelper.mostBlogs(helper.initialBlogs);
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
    const result = listHelper.mostLikes(helper.initialBlogs);
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
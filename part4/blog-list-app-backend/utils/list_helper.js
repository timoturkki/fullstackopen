// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => (acc += cur.likes), 0);
};

const favoriteBlog = (blogs) => {
  const favourite = blogs.reduce((acc, cur) => (acc.likes >= cur.likes) ? acc : cur);
  const { title, author, likes } = favourite;

  return { title, author, likes };
};

const findAuthorWithLargestProperty = (obj) => {
  return Object.entries(obj).reduce((acc, cur) => acc[1] >= cur[1] ? acc : cur);
};

const mostBlogs = (blogList) => {
  // if no blogs, return null
  if (!blogList.length) {
    return null;
  }

  // collect the amount of blogs per author inside an object, e.g. { 'author name': 4 } etc.
  const blogAmountPerAuthor = blogList.reduce((acc, { author }) => {
    // get the previous blog amount for author, if not yet found start with zero
    const authorBlogAmount = acc[author] || 0;

    return {
      ...acc,
      [author]: authorBlogAmount + 1,
    };
  }, {});

  // then find the author with largest value and deconstruct the object entry into author and blogs
  const [author, blogs] = findAuthorWithLargestProperty(blogAmountPerAuthor);

  return { author, blogs };
};

const mostLikes = (blogs) => {
  // if no blogs, return null
  if (!blogs.length) {
    return null;
  }

  // collect the amount of likes per author inside an object, e.g. { 'author name': 10 } etc.
  const likeAmountPerAuthor = blogs.reduce((acc, { author, likes }) => {
    // get the previous like amount for author, if not yet found start with zero
    const authorLikeAmount = acc[author] || 0;

    return {
      ...acc,
      [author]: authorLikeAmount + likes,
    };
  }, {});

  // then find the author with largest value and deconstruct the object entry into author and blogs
  const [author, likes] = findAuthorWithLargestProperty(likeAmountPerAuthor);

  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
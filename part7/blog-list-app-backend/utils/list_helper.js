/**
 * Dummy function for testing purposes
 * @param {Object[]} blogs
 */
const dummy = (blogs) => {
  return blogs ? 1 : 0;
};

/**
 * Finds the largest total value for author and returns author name with it as tuple
 * For example ['Mister highest-total', 40]
 * @param {Object} authorScores
 */
const findAuthorWithLargestProperty = (authorScores) => {
  return Object.entries(authorScores).reduce((acc, cur) => acc[1] >= cur[1] ? acc : cur);
};

/**
 * Map array of blogs into object { authorName: totalScore }
 * total is the amount of what property is being reduced,
 * if author, just collect occurances of author names
 * @param {Object[]} blogs Array of blogs
 * @param {string} propName Name of the property to calculate
 */
const calculateBlogsTotalFor = (blogs, propName) => {
  return blogs.reduce((acc, blog) => {
    // get the previous amount for author, if not yet found start with zero
    const amount = acc[blog.author] || 0;
    // if propName is author simply incraese by one for the author, otherwise add the amount of the property
    const addition = propName === 'author' ? 1: blog[propName];

    return { ...acc, [blog.author]: amount + addition };
  }, {});
};

/**
 * Returns total like amount for given blogs
 * @param {Object[]} blogs
 */
const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => (acc += cur.likes), 0);
};

/**
 * Returns the blog with most likes
 * @param {Object[]} blogs
 */
const favoriteBlog = (blogs) => {
  const favourite = blogs.reduce((acc, cur) => (acc.likes >= cur.likes) ? acc : cur);
  const { title, author, likes } = favourite;

  return { title, author, likes };
};

/**
 * Finds the author with most amount of blogs written and
 * returns the total along the author name
 * @param {Object[]} blogs
 */
const mostBlogs = (blogs) => {
  // if no blogs, return null
  if (!blogs.length) {
    return null;
  }

  // Find the author with largest value for total occurances and deconstruct the result into author and blogs
  const [author, blogAmount] = findAuthorWithLargestProperty(calculateBlogsTotalFor(blogs, 'author'));

  return { author, blogAmount };
};

/**
 * Finds the author with most amount of likes received and
 * returns the total along the author name
 * @param {Object[]} blogs
 */
const mostLikes = (blogs) => {
  // if no blogs, return null
  if (!blogs.length) {
    return null;
  }

  // Find the author with largest value for total likes and deconstruct the result into author and blogs
  const [author, likes] = findAuthorWithLargestProperty(calculateBlogsTotalFor(blogs, 'likes'));

  return { author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
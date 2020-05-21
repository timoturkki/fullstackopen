import React from 'react';

import Loading from './Loading';
import Blog from './Blog';

const Blogs = ({ blogs, removeBlogHandler }) => {
  const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <>
      {!blogs.length ?
        <Loading /> :
        <ul>
          {sortedByLikes.map((blog) =>
            <Blog key={`blog-${blog.id}`} blog={blog} removeBlogHandler={removeBlogHandler} />
          )}
        </ul>
      }
    </>
  );
};

export default Blogs;
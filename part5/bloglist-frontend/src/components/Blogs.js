import React from 'react';

import Loading from './Loading';
import Blog from './Blog';

const Blogs = ({ blogs, removeBlogHandler, updateBlogHandler }) => {
  const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes);

  const blogsStyles = {
    margin: '12px 0',
    padding: '0 8px',
    border: '1px solid #2b4832',
    borderWidth: 1,
    backgroundColor: '#e7f7f5',
  };

  return (
    <>
      {!blogs.length ?
        <Loading /> :
        <ul className="unstyled-list" style={blogsStyles}>
          {sortedByLikes.map((blog) =>
            <Blog
              key={`blog-${blog.id}`}
              blog={blog}
              removeBlogHandler={removeBlogHandler}
              updateBlogHandler={updateBlogHandler}
            />
          )}
        </ul>
      }
    </>
  );
};

export default Blogs;
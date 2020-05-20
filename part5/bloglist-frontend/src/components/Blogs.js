import React from 'react';

import Loading from './Loading';

const Blogs = ({ blogs }) => (
  <>
    {!blogs.length ?
      <Loading /> :
      <ul>
        {blogs.map(({ title, author, id }) =>
          <li key={`blog-${id}`}>{ title } - { author }</li>
        )}
      </ul>
    }
  </>
);

export default Blogs;
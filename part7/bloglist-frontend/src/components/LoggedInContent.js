import React from 'react';

import Blogs from './Blogs';
import CreateBlogForm from './CreateBlogForm';
import Togglable from './Togglable';

const LoggedInContent = () => {
  const blogFormRef = React.createRef();

  return (
    <>
      <h2>Blogs!</h2>
      <Togglable showButtonLabel='Create blog' hideButtonLabel='Hide form' ref={blogFormRef}>
        <CreateBlogForm />
      </Togglable>
      <Blogs />
    </>
  );
};

export default LoggedInContent;

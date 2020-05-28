import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addBlog } from '../store/reducers/blogReducer';

const CreateBlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const createBlogHandler = (e) => {
    e.preventDefault();

    dispatch(addBlog({ title, author, url }));

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create new blog!</h2>

      <form id="blog-form" onSubmit={createBlogHandler}>
        <div>
          <label htmlFor="title">Title</label><br />
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={(e) => (setTitle(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="author">Author</label><br />
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={(e) => (setAuthor(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="url">Url</label><br />
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={(e) => (setUrl(e.target.value))}
          />
        </div>

        <button id="create-blog-btn" type="submit">Create</button>
      </form>
    </>
  );
};


export default CreateBlogForm;

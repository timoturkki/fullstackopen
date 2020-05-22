import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateBlogForm = ({ createBlogHandler }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    e.preventDefault();

    createBlogHandler({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create new blog!</h2>

      <form onSubmit={addBlog}>
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

        <button type="submit">Create</button>
      </form>
    </>
  );
};

CreateBlogForm.propTypes = {
  createBlogHandler: PropTypes.func.isRequired,
};


export default CreateBlogForm;

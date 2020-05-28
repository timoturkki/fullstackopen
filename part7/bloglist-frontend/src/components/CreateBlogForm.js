import React from 'react';
import { useDispatch } from 'react-redux';

import { addBlog } from '../store/reducers/blogReducer';

import  { useField } from '../hooks';

const CreateBlogForm = () => {
  const dispatch = useDispatch();
  const title = useField('text', 'title');
  const author = useField('text', 'author');
  const url = useField('text', 'url');

  const submitBlogHandler = (e) => {
    e.preventDefault();

    dispatch(addBlog({
      title: title.attr.value,
      author: author.attr.value,
      url: url.attr.value,
    }));

    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <>
      <h2>Create new blog!</h2>

      <form id="blog-form" onSubmit={submitBlogHandler}>
        <div>
          <label htmlFor={title.attr.id}>Title</label><br />
          <input { ...title.attr } />
        </div>

        <div>
          <label htmlFor={author.attr.id}>Author</label><br />
          <input { ...author.attr } />
        </div>

        <div>
          <label htmlFor={url.attr.id}>Url</label><br />
          <input { ...url.attr } />
        </div>

        <button id="create-blog-btn" type="submit">Create</button>
      </form>
    </>
  );
};


export default CreateBlogForm;

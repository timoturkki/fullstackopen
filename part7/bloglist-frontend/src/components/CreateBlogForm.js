import React from 'react';
import { useDispatch } from 'react-redux';

import { addBlog } from '../store/reducers/blogReducer';

import  { useField } from '../hooks';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
      <h3 style={{ marginTop: 40 }}>Create new blog!</h3>

      <form id="blog-form" onSubmit={submitBlogHandler}>
        <TextField fullWidth { ...title.attr } label={title.attr.id} />
        <TextField fullWidth { ...author.attr } label={author.attr.id} />
        <TextField fullWidth { ...url.attr } label={url.attr.id} />

        <Button style={{ marginTop: 12 }} type="submit" variant="contained" color="primary">Create</Button>
      </form>
    </>
  );
};


export default CreateBlogForm;

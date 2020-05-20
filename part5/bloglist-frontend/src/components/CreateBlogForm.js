import React from 'react';

const CreateBlogForm = ({ createBlogHandler, title, author, url, titleHandler, authorHandler, urlHandler }) => {
  return (
    <>
      <h2>Create new blog!</h2>

      <form onSubmit={createBlogHandler}>
        <div>
          <label htmlFor="title">Title</label><br />
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={titleHandler}
          />
        </div>

        <div>
          <label htmlFor="author">Author</label><br />
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={authorHandler}
          />
        </div>

        <div>
          <label htmlFor="url">Url</label><br />
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={urlHandler}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default CreateBlogForm;

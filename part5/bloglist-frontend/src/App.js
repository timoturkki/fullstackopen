import React, { useState, useEffect } from 'react';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Loading from './components/Loading';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

import { getLoggedInUser, setLoggedInUser, removeLoggedInUser } from './utils/user';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');
  const [hasError, setHasError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedUser = getLoggedInUser();

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification('');

    try {
      const user = await loginService.login({ username, password });

      setLoggedInUser(user);
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
      setLoading(false);
    } catch (e) {
      setLoading(false);
      triggerNotification('Wrong credentials, please try again', true);
    }
  };

  const createBlogHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    setNotification('');

    try {
      const newBlog = await blogService.createBlog({ title, author, url });
      setBlogs(blogs.concat(newBlog));

      triggerNotification(`a new blog "${title}" by ${author} added`);
      setTitle('');
      setAuthor('');
      setUrl('');
      setLoading(false);
    } catch (e) {
      setLoading(false);
      triggerNotification('Adding new blog failed, please check your blog information', true);
    }
  };

  const logutHandler = () => {
    removeLoggedInUser();
    setUser(null);
  };

  const triggerNotification = (message, isErrorMsg = false) => {
    setNotification(message);
    setHasError(isErrorMsg);

    setTimeout(() => {
      setNotification('');
      setHasError(false);
    }, 5000);
  };

  return (
    <>
      <h1>Welcome to browse some blogs!</h1>

      <Notification message={notification} isError={hasError} />

      {loading ?
        <Loading /> :
        <>
          {user ?
            <>
              <h2>Blogs!</h2>
              <p>You are logged in as {user.name}</p>
              <button type="button" onClick={logutHandler}>logout</button>
              <CreateBlogForm
                createBlogHandler={createBlogHandler}
                username={username}
                title={title}
                author={author}
                url={url}
                titleHandler={(e) => (setTitle(e.target.value))}
                authorHandler={(e) => (setAuthor(e.target.value))}
                urlHandler={(e) => (setUrl(e.target.value))}
              />
              <Blogs blogs={blogs} />
            </> :
            <>
              <h2>Log in please</h2>
              <LoginForm
                username={username}
                password={password}
                usernameHandler={(e) => setUsername(e.target.value)}
                passwordHandler={(e) => (setPassword(e.target.value))}
                loginHandler={loginHandler}
              />
            </>
          }
        </>
      }
    </>
  );
};

export default App;
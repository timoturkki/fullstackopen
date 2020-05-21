import React, { useState, useEffect } from 'react';
import { generate as generateId } from 'shortid';

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
  const [notifications, setNotifications] = useState([]);
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
      triggerNotification({ msg: 'Wrong credentials, please try again', isAlert: true });
    }
  };

  const createBlogHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    setNotifications('');

    try {
      const newBlog = await blogService.createBlog({ title, author, url });
      setBlogs(blogs.concat(newBlog));

      triggerNotification({ msg: `a new blog "${title}" by ${author} added`, isAlert: false });
      setTitle('');
      setAuthor('');
      setUrl('');
      setLoading(false);
    } catch (e) {
      setLoading(false);
      triggerNotification({ msg: 'Adding new blog failed, please check your blog information', isAlert: true });
    }
  };

  const logutHandler = () => {
    removeLoggedInUser();
    setUser(null);
  };

  const triggerNotification = (newNotification) => {
    const matchingIndex = notifications.findIndex(n => n.msg === newNotification.msg);
    const notificationWithId = { ...newNotification, id: generateId() };

    // if notification with same message exists already
    // then replace it so the timer starts again
    if (matchingIndex > -1) {
      const notificationsCopy = [...notifications];
      notificationsCopy[matchingIndex] = notificationWithId;
      setNotifications(notificationsCopy);
    } else {
      // otherwise add the new notification to the list
      // so multiple different can be shown at the same time
      setNotifications(notifications.concat(notificationWithId));
    }
  };

  const deleteAlertHandler = (id) => setNotifications(notifications.filter(n => n.id !== id));

  return (
    <>
      <h1>Welcome to browse some blogs!</h1>

      {(notifications || []).map((notification) =>
        <Notification
          key={`notification-${notification.id}`}
          notification={notification}
          deleteHandler={deleteAlertHandler}
        />
      )}

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
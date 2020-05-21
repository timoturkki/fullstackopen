import React, { useState, useEffect, useRef } from 'react';
import { generate as generateId } from 'shortid';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Loading from './components/Loading';
import CreateBlogForm from './components/CreateBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

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
  const blogFormRef = React.createRef();
  const notificationsRef = useRef(notifications);
  notificationsRef.current = notifications;

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

  const createBlogHandler = async (newBlog) => {
    setLoading(true);
    blogFormRef.current.toggleVisibility();

    try {
      const createdBlog = await blogService.createBlog(newBlog);
      const { title, author } = createdBlog;
      setBlogs(blogs.concat(createdBlog));

      triggerNotification({ msg: `A new blog "${title}" by ${author} added`, isAlert: false });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      triggerNotification({ msg: 'Adding new blog failed, please check your blog information', isAlert: true });
    }
  };

  const removeBlogHandler = async (id, title) => {
    setLoading(true);

    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(b => b.id !== id));
      triggerNotification({ msg: `Succesfully removed blog: ${title}`, isAlert: false });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      triggerNotification({ msg: 'Removing blog failed, please try again', isAlert: true });
    }
  };

  const updateBlogHandler = async (id, blog) => {
    const { title } = blog;

    try {
      const savedBlog = await blogService.updateBlog(id, blog);
      const oldindex = blogs.findIndex(blog => blog.id === id);
      const blogsCopy = [...blogs];
      blogsCopy[oldindex] = savedBlog;
      setBlogs(blogsCopy);

      triggerNotification({ msg: `Succesfully updated blog: ${title}`, isAlert: false });
    } catch (e) {
      triggerNotification({ msg: 'Updating blog failed, please try again', isAlert: true });
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

  const deleteAlertHandler = (id) => setNotifications(notificationsRef.current.filter(n => n.id !== id));

  return (
    <>
      <h1>Welcome to browse some blogs!</h1>

      {notifications.map((notification) =>
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
              <p>You are logged in as {user.name} <button type="button" onClick={logutHandler}>logout</button></p>
              <Togglable showButtonLabel='Create blog' hideButtonLabel='Hide form' ref={blogFormRef}>
                <CreateBlogForm createBlogHandler={createBlogHandler} />
              </Togglable>
              <Blogs
                blogs={blogs}
                removeBlogHandler={removeBlogHandler}
                updateBlogHandler={updateBlogHandler}
              />
            </> :
            <LoginForm
              username={username}
              password={password}
              usernameHandler={(e) => setUsername(e.target.value)}
              passwordHandler={(e) => (setPassword(e.target.value))}
              loginHandler={loginHandler}
            />
          }
        </>
      }
    </>
  );
};

export default App;
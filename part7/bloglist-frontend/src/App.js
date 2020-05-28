import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Loading from './components/Loading';
import CreateBlogForm from './components/CreateBlogForm';
import Notifications from './components/Notifications';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

import { addNotification } from './store/reducers/notificationReducer';

import { getLoggedInUser, setLoggedInUser, removeLoggedInUser } from './utils/user';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = React.createRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();

        if (blogs && blogs.length) {
          setBlogs(blogs);
        } else {
          setBlogs(null);
        }
      } catch(_e) {
        setBlogs(null);
      }
    };

    fetchBlogs();
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
      setBlogs((blogs || []).concat(createdBlog));

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
    dispatch(addNotification(newNotification, 5));
  };

  return (
    <>
      <h1>Welcome to browse some blogs!</h1>

      <Notifications />

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
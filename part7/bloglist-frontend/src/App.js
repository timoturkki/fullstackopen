import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import Loading from './components/Loading';
import CreateBlogForm from './components/CreateBlogForm';
import Notifications from './components/Notifications';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

import { addNotification } from './store/reducers/notificationReducer';
import { initializeBlogs, addBlog, deleteBlog, updateBlog } from './store/reducers/blogReducer';
import { setLoading } from './store/reducers/loadingReducer';

import { getLoggedInUser, setLoggedInUser, removeLoggedInUser } from './utils/user';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);
  const loading = useSelector(({ loading }) => loading);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const blogFormRef = React.createRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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
    dispatch(setLoading(true));

    try {
      const user = await loginService.login({ username, password });

      setLoggedInUser(user);
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(setLoading(false));
      triggerNotification({ msg: 'Wrong credentials, please try again', isAlert: true });
    }
  };

  const createBlogHandler = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    dispatch(addBlog(newBlog));
  };

  const removeBlogHandler = async (id, title) => {
    dispatch(deleteBlog(id, title));
  };

  const updateBlogHandler = async (id, blog) => {
    dispatch(updateBlog(id, blog));
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
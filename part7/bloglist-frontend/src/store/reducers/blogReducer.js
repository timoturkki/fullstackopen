import blogsService from '../../services/blogs';
import { addNotification } from './notificationReducer';
import { setLoading } from './loadingReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_BLOG':
      return state.map(a => a.id !== action.data.id ? a : action.data );
    case 'NEW_COMMENT':
      return state.map(a => a.id !== action.data.blogId ? a : {
        ...a,
        comments: [...a.comments, action.data],
      });
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.id);
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export const addBlog = (blog) => {
  return async dispatch => {
    dispatch(setLoading(true));

    try {
      const data = await blogsService.createBlog(blog);
      const { title, author } = data;

      dispatch(addNotification({ msg: `A new blog "${title}" by ${author} added`, isAlert: false }));
      dispatch({ type: 'NEW_BLOG', data });
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(addNotification({ msg: 'Adding new blog failed, please check your blog information', isAlert: true }));
      dispatch(setLoading(false));
    }
  };
};

export const addComment = (blogId, comment) => {
  return async dispatch => {
    dispatch(setLoading(true));

    try {
      const data = await blogsService.commentBlog(blogId, comment);

      dispatch(addNotification({ msg: 'Your comment has been sent!', isAlert: false }));
      dispatch({ type: 'NEW_COMMENT', data: { ...data, blogId } });
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(addNotification({ msg: 'Adding new comment failed, please check your blog information', isAlert: true }));
      dispatch(setLoading(false));
    }
  };
};


export const deleteBlog = (id, title) => {
  return async dispatch => {
    dispatch(setLoading(true));

    try {
      await blogsService.deleteBlog(id);
      dispatch({ type: 'DELETE_BLOG', id });
      dispatch(addNotification({ msg: `Succesfully removed blog: ${title}`, isAlert: false }));
      dispatch(setLoading(false));
    } catch(e) {
      dispatch(addNotification({ msg: 'Removing blog failed, please try again', isAlert: true }));
      dispatch(setLoading(false));
    }
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    dispatch(setLoading(true));

    try {
      const blogs = await blogsService.getAll();
      const data = blogs && blogs.length ? blogs : null;

      dispatch({ type: 'INIT_BLOGS', data });
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(addNotification({ msg: 'Fetching blogs failed', isAlert: true }));
      dispatch(setLoading(false));
    }
  };
};

export const updateBlog = (id, blog) => {
  return async dispatch => {
    try {
      const data = await blogsService.updateBlog(id, blog);
      const { title } = data;
      dispatch({ type: 'UPDATE_BLOG', data });
      dispatch(addNotification({ msg: `Succesfully updated blog: ${title}`, isAlert: false }));
    } catch(e) {
      dispatch(addNotification({ msg: 'Updating blog failed, please try again', isAlert: true }));
    }
  };
};

export default blogReducer;
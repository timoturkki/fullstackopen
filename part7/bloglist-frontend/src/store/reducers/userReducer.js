import blogService from '../../services/blogs';
import loginService from '../../services/login';

import { setLoading } from './loadingReducer';
import { addNotification } from './notificationReducer';

import { getLoggedInUser, setLoggedInUser, removeLoggedInUser } from '../../utils/user';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.user;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }
};

export const initUser = () => {
  return async (dispatch) => {
    const loggedUser = getLoggedInUser();

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch({ type: 'LOG_IN', user });
      blogService.setToken(user.token);
    }
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const user = await loginService.login(data);

      setLoggedInUser(user);
      blogService.setToken(user.token);

      dispatch({ type: 'LOG_IN', user });
      dispatch(setLoading(false));
    } catch (e) {
      dispatch(addNotification({ msg: 'Wrong credentials, please try again', isAlert: true }, 5));
      dispatch(setLoading(false));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    removeLoggedInUser();
    dispatch({ type: 'LOG_OUT' });
  };
};

export default userReducer;
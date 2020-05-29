import usersService from '../../services/users';
import { addNotification } from './notificationReducer';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const data = await usersService.getAll();

      dispatch({ type: 'INIT_USERS', data });
    } catch (e) {
      dispatch(addNotification({ msg: 'Fetching users failed', isAlert: true }));
    }
  };
};

export default usersReducer;
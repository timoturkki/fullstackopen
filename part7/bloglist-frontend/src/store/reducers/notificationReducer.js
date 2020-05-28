import { generate as generateId } from 'short-id';

const DEFAULT_NOTIFICATION_DURATION_S = 5;

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const { data } = action;
      return [...state, data];
    case 'REMOVE_NOTIFICATION':
      return state.filter(s => s.id !== action.id);
    default:
      return state;
  }
};

export const addNotification = (notification, duration_s = DEFAULT_NOTIFICATION_DURATION_S) => {
  const id = generateId();

  return async (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', id });
    }, duration_s * 1000);

    dispatch({ type: 'ADD_NOTIFICATION', data: { ...notification, id } });
  };
};

export const removeNotification = id => {
  return { type: 'REMOVE_NOTIFICATION', id };
};

export default notificationReducer;
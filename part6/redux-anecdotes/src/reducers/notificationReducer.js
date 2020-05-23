import { generate as generateId } from 'short-id';

// this allows rendering multiple notifications at the same time
// thus making clearing the timeout redundant
const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const { id, msg } = action;
      return [...state, { id, msg }];
    case 'REMOVE_NOTIFICATION':
      return state.filter(s => s.id !== action.id);
    default:
      return state;
  }
};

export const addNotification = (msg, duration_s) => {
  const id = generateId();

  return async (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', id });
    }, duration_s * 1000);

    dispatch({ type: 'ADD_NOTIFICATION', id, msg });
  };
};

export const removeNotification = id => {
  return { type: 'REMOVE_NOTIFICATION', id };
};

export default notificationReducer;
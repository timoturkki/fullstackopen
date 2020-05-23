// allows user to see multiple notification at the same time

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const { id, msg, timer } = action;
      return [...state, { id, msg, timer }];
    case 'REMOVE_NOTIFICATION':
      return state.filter(s => s.id !== action.id);
    default:
      return state;
  }
};

export const addNotification = (id, msg, timer) => {
  return {
    type: 'ADD_NOTIFICATION',
    id,
    msg,
    timer,
  };
};

export const removeNotification = id => {
  return { type: 'REMOVE_NOTIFICATION', id };
};

export default notificationReducer;
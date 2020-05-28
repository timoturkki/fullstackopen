const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.data;
    default:
      return state;
  }
};

export const setLoading = (status) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADING', data: status });
  };
};

export default loadingReducer;
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import loadingReducer from './reducers/loadingReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  loading: loadingReducer,
  user: userReducer,
  users: usersReducer,
});

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
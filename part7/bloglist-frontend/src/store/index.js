import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import notificationReducer from './reducers/notificationReducer';
import blogReducer from './reducers/blogReducer';
import loadingReducer from './reducers/loadingReducer';

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  loading: loadingReducer,
});

const store = createStore(reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

export default store;
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const increaseStat = (type) => {
    store.dispatch({ type });
  };

  return (
    <div>
      <button onClick={() => increaseStat('GOOD')}>good</button>
      <button onClick={() => increaseStat('OK')}>neutral</button>
      <button onClick={() => increaseStat('BAD')}>bad</button>
      <button onClick={() => increaseStat('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);

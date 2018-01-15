import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Reducers
import todoApp from './reducers/index';

// Components
import ToDoApp from './components/ToDoApp';


ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <ToDoApp />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();

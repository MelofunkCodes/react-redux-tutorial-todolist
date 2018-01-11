import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// Reducers
import todoApp from './reducers/index';

// Components
import ToDoApp from './components/ToDoApp';

const store = createStore(todoApp);

ReactDOM.render(
  <ToDoApp store={store} />,
  document.getElementById('root'),
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createStore } from 'redux';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// Reducers
import todoApp from './reducers/index';

// Components
import ToDoApp from './components/ToDoApp';


class Provider extends Component {
  /*
   This method is what makes the store available to any component that it renders.
   Now the store will be available to any children and grandchildren of the components Provider
   renders. In this case, the ToDoApp and any presentational components and containers built inside
   of it!
    */
  getChildContext() {
    return {
      store: this.props.store, // This corresponds to the `store` passed in as a prop
    };
  }

  render() {
    return this.props.children;
  }
}

Provider.childContextTypes = {
  store: PropTypes.object,
};

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <ToDoApp />
  </Provider>,
  document.getElementById('root'),
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

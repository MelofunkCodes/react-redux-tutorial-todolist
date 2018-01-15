import React from 'react';

import './ToDoApp.css';
import AddTodo from './AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';


const ToDoApp = ({ store }) => (
  <div className="todoApp">
    <AddTodo
      store={store}
    />
    <VisibleTodoList
      store={store}
    />
    <Footer
      store={store}
    />
  </div>
);

export default ToDoApp;

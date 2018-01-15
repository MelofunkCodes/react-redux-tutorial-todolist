import React from 'react';

import './ToDoApp.css';
import AddTodo from './AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';


const ToDoApp = () => (
  <div className="todoApp">
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default ToDoApp;

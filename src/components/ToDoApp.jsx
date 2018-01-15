import React, { Component } from 'react';

import './ToDoApp.css';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';


const getVisibleTodos = (
  todos,
  filter,
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
};

const ToDoApp = ({ store }) => {
  return (
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
}

export default ToDoApp;


// Container Components

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.props;

    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { props } = this;
    const { store } = props;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(
          state.todos,
          state.visibilityFilter,
        )}
        onTodoClick={id => store.dispatch({
          type: 'TOGGLE_TODO',
          id,
        })
        }
      />
    );
  }
}

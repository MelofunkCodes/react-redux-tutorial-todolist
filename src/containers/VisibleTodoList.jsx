import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TodoList from '../components/TodoList';


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

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;

    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
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

/*
 * Context is opt-in for all components, so we have to specify contextTypes. If you don't do this,
 * the component will not receive the relevant context, so essential to declare!
 */
VisibleTodoList.contextTypes = {
  store: PropTypes.object,
};

export default VisibleTodoList;

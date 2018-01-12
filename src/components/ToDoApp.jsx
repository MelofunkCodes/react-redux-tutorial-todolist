import React, { Component } from 'react';

import './ToDoApp.css';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

let nextToDoId = 0;
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

class ToDoApp extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.props;
    const state = store.getState();
    const { todos, visibilityFilter } = state;
    const visibleTodos = getVisibleTodos(
      todos,
      visibilityFilter,
    );

    return (
      <div className="todoApp">
        <AddTodo
          onAddClick={text =>
            store.dispatch({
              type: 'ADD_TODO',
              text,
              id: nextToDoId += 1,
            })
          }
        />
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id,
            })
          }
        />
        <Footer
          store={store}
          visibilityFilter={visibilityFilter}
          onFilterClick={filter =>
            store.dispatch({
              type: 'SET_VISIBILITY_FILTER',
              filter,
            })
          }
        />
      </div>
    );
  }
}

export default ToDoApp;




// Stuff to be moved to other files
const FilterLink = ({
  store,
  filter,
  currentFilter,
  children,
  onClick,
}) => {
  /*
   This condition removes the <a></a> tag styling and just shows the currentFilter with
   plain text styling
    */
  if (filter === currentFilter) {
    // the children being whatever text is between the <FilterLink></FilterLink> tags
    return <span>{children}</span>;
  }
  return (
    <a
      href='#'
      onClick={(event) => {
         event.preventDefault();
         onClick(filter);
       }}
    >
      {children}
    </a>
  );
};

// Presentational Components
const Footer = ({
  store,
  visibilityFilter,
  onFilterClick,
}) => (
  <p>
    Show:
    {' '}
    <FilterLink
      store={store}
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      store={store}
      filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      store={store}
      filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Completed
    </FilterLink>
  </p>
);
import React, { Component } from 'react';

import './ToDoApp.css';

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
const Todo = ({
  onClick,
  completed,
  text,
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick,
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo} // this passes the rest of the props of todo (i.e. todo.completed and todo.text) as props to the Todo component
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
);

const AddTodo = ({
  onAddClick,
}) => {
  let input; // make it a local variable
  return (
    <div>
      <input ref={(node) => {
        /*
         using the ref attribute to link whatever the user types in the input so that we can
         then access it with this.input.value
          */
        input = node;
      }}
      />
      <button onClick={() => {
        onAddClick(input.value);
        input.value = ''; // clears the input field after button is clicked
      }}>
        Add Todo
      </button>
    </div>
  );
};

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
import React, { Component } from 'react';

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
      <div>
        <input ref={(node) => {
            /*
             using the ref attribute to link whatever the user types in the input so that we can
             then access it with this.input.value
              */
            this.input = node;
          }}
        />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextToDoId += 1,
          });
          this.input.value = ''; // clears the input field after button is clicked
        }}>
          Add Todo
        </button>
        <ul>
          {visibleTodos.map(todo =>
            <li
              key={todo.id}
              onClick={() => {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id,
                });
              }}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:
          {' '}
          <FilterLink
            store={store}
            filter='SHOW_ALL'
          >
            All
          </FilterLink>
          {' '}
          <FilterLink
            store={store}
            filter='SHOW_ACTIVE'
          >
            Active
          </FilterLink>
          {' '}
          <FilterLink
            store={store}
            filter='SHOW_COMPLETED'
          >
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

export default ToDoApp;

// Stuff to be moved to other files
const FilterLink = ({
  store,
  filter,
  children,
}) => {
  return (
    <a
      href='#'
      onClick={(event) => {
         event.preventDefault();
         store.dispatch({
           type: 'SET_VISIBILITY_FILTER',
           filter,
         });
       }}
    >
      {children}
    </a>
  );
};


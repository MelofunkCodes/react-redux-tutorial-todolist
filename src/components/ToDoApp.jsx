import React, { Component } from 'react';

import './ToDoApp.css';
import AddTodo from './AddTodo';
import TodoList from './TodoList';


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




// Stuff to be moved to other files
const Link = ({
  active,
  children,
  onClick,
}) => {
  /*
   This condition removes the <a></a> tag styling and just shows the currentFilter with
   plain text styling
    */
  if (active) {
    // the children being whatever text is between the <FilterLink></FilterLink> tags
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={(event) => {
         event.preventDefault();
         onClick();
       }}
    >
      {children}
    </a>
  );
};


// Container Components

class FilterLink extends Component {
  /*
   Need to subscribe to store changes
   - So we will move subscription to the store to the React life cycle methods
   - forceUpdate: forces a re-rendering of the component. This is called anytime the store changes
    */
  componentDidMount() {
    const { store } = this.props;

    // Declaring the unsubscribe function in componentDidMount
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  // important to unsubscribe as well to clean up the subscription
  componentWillUnmount() {
    // this is the *return* value of the store.subscribe() method above in componentDidMount
    this.unsubscribe();
  }

  render() {
    const { props } = this;
    const { store } = props;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter,
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

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

// Presentational Components
const Footer = ({
  store,
}) => (
  <p>
    Show:
    {' '}
    <FilterLink
      store={store}
      filter="SHOW_ALL"
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      store={store}
      filter="SHOW_ACTIVE"
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      store={store}
      filter="SHOW_COMPLETED"
    >
      Completed
    </FilterLink>
  </p>
);

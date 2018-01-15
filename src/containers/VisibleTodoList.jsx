import { connect } from 'react-redux';

import TodoList from '../components/TodoList';
import { toggleTodo } from '../actions/index';


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

/*
mapStateToProps takes the Redux store's state, and returns the props that we need to pass to the
presentational TodoList component so it can be rendered with the current state.

This returns the props that depend on the current state of the Redux store, which in this case is
just the todos.

These props will be updated any time the state changes.
 */
const mapStateToProps = state => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter,
  ),
});

/*
mapDispatchToProps accepts the dispatch() from store as its only argument. It returns the props
that should be passed to TodoList that depend on the dispatch() method. So it returns the callback
props needed by the presentational component.

Note that we don't need the reference to store anymore, and can just change store.dispatch() to
dispatch(), which is provided as an argument in mapDispatchToProps.
 */
const mapDispatchToProps = dispatch => ({
  onTodoClick: (id) => {
    dispatch(toggleTodo(id));
  },
});

/*
This replaces the original VisibleTodoList class. This is a curried function, so we must call it
again, and pass it the presentational component that we want it to wrap and pass the props, thereby
connecting to the redux store (in this case, TodoList).
 */
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);

export default VisibleTodoList;

import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

const propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

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

TodoList.propTypes = propTypes;

export default TodoList;

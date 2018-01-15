import React from 'react';
// import PropTypes from 'prop-types';

let nextToDoId = 0;

const AddTodo = ({
  store,
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
        store.dispatch({
          type: 'ADD_TODO',
          text: input.value,
          id: nextToDoId += 1,
        });
        input.value = ''; // clears the input field after button is clicked
      }}
      >
        Add Todo
      </button>
    </div>
  );
};

// AddTodo.propTypes = propTypes;

export default AddTodo;
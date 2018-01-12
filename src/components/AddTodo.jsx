import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onAddClick: PropTypes.func.isRequired,
};

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
      }}
      >
        Add Todo
      </button>
    </div>
  );
};

AddTodo.propTypes = propTypes;

export default AddTodo;

import React from 'react';
import PropTypes from 'prop-types';

let nextToDoId = 0;

// Context is received as a second argument after props
const AddTodo = (props, { store }) => {
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

/*
 Need to specify contextTypes to specify which context we want to receive (in this case, store
 from Provider). Context can be passed down to any level, without having been specified in the
 parent component. Almost like a wormhole. You just have to opt-in to the context by specifying
 contextTypes
  */
AddTodo.contextTypes = {
  store: PropTypes.object,
};

// AddTodo.propTypes = propTypes;

export default AddTodo;

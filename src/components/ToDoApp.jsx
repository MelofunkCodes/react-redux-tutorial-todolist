import React, { Component } from 'react';

let nextToDoId = 0;

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
          {state.todos.map(todo =>
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
      </div>
    );
  }
}

export default ToDoApp;

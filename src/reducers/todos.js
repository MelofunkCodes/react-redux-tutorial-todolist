// Child reducer that looks at each todo vs the array of todos
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      return (state.id === action.id) ? { ...state, completed: !state.completed }
        : state;
    /*
    If getting an error message above with using the spread operator in object literal,
    uncomment out below
    */
    // case 'TOGGLE_TODO':
    //   return (state.id === action.id) ? Object.assign({}, state, { completed: !state.completed })
    //     : state;
    default:
      return state;
  }
};

// Top-level Parent Reducer
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};


export default todos;

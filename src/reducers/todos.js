const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        ((todo.id === action.id) ? { ...todo, completed: !todo.completed }
          : todo));
    /*
     If getting an error message above with using the spread operator in object literal,
      uncomment out below
      */
    // case 'TOGGLE_TODO':
    //   return state.map( todo =>
    //     ((todo.id === action.id) ? Object.assign({}, todo, { completed: !todo.completed })
    //       : todo));
    default:
      return state;
  }
};


export default todos;

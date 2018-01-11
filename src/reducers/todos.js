// Child reducer that looks at each todo vs the array of todos
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    // case 'TOGGLE_TODO':
    //   return (state.id === action.id) ? { ...state, completed: !state.completed }
    //     : state;
    /*
    If getting an error message above with using the spread operator in object literal,
    uncomment out below
    */
    case 'TOGGLE_TODO':
      return (state.id === action.id) ? Object.assign({}, state, { completed: !state.completed })
        : state;
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


// export default todos;


// //------- testing out logging the state in node on terminal -------
// const { createStore } = require('redux');
//
// const store = createStore(todos);
//
// console.log('Initial state:');
// console.log(store.getState());
// console.log('--------------');
//
// console.log('Dispatching ADD_TODO.');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 0,
//   text: 'Learn Redux',
// });
//
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');
//
// console.log('Dispatching ADD_TODO.');
// store.dispatch({
//   type: 'ADD_TODO',
//   id: 1,
//   text: 'Go shopping',
// });
//
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');
//
// console.log('Dispatching TOGGLE_TODO');
// store.dispatch({
//   type: 'TOGGLE_TODO',
//   id: 0,
// });
//
// console.log('Current state:');
// console.log(store.getState());
// console.log('--------------');

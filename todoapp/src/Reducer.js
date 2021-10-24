export default function appReducer(state, action) {
  function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.username;
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }
  function todoReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const createTodoJson = {
          id: action.id,
          title: action.title,
          description: action.description,
          dateCreated: action.dateCreated,
          completed: action.completed,
          dateCompleted: action.dateCompleted,
        };
        return [createTodoJson, ...state];
      case "TOGGLE_TODO": {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        // state.map((todo) => {
        //   if (todo.id === action.id) {
        //     todo.completed = !action.completed;
        //     todo.dateCompleted = `${date} ${time}`;
        //   }
        // });
        state.map((todo) => {
          if (todo.id === action.id) {
            todo.completed = action.completed;
            todo.dateCompleted = action.dateCompleted;
          }
        });
        console.log(state);
        return state;
      }
      case "DELETE_TODO": {
        return state.filter((x) => x.id !== action.id);
      }
      case "FETCH_TODOS": {
        return action.todoList;
      }
      default:
        return state;
    }
  }
  return {
    user: userReducer(state.user, action),
    todoList: todoReducer(state.todoList, action),
  };
}

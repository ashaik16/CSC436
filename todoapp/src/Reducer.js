export default function appReducer(state, action) {
  function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      // case "REGISTER":
      //   return action.username;
      // case "LOGOUT":
      //   return "";
      case "REGISTER":
        return {
          username: action.username,
          access_token: action.access_token,
        };
      case "LOGOUT":
        return {
          username: undefined,
          access_token: undefined,
        };
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
          author: action.author,
          authorId: action.authorId,
          description: action.description,
          dateCreated: action.dateCreated,
          completed: action.completed,
          dateCompleted: action.dateCompleted,
        };
        return [createTodoJson, ...state];
      case "TOGGLE_TODO": {
        state.map((todo) => {
          if (todo.id === action.id) {
            todo.completed = action.completed;
            todo.dateCompleted = action.dateCompleted;
          }
        });

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
  function userListReducer(state, action) {
    switch (action.type) {
      case "FETCH_USERS": {
        return action.userList;
      }
      default:
        return state;
    }
  }
  return {
    userList: userListReducer(state.userList, action),
    user: userReducer(state.user, action),
    todoList: todoReducer(state.todoList, action),
  };
}

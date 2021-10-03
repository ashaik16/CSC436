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
          title: action.title,
          description: action.description,
          dateCreated: new Date().toLocaleDateString(),
          id: Math.random(),
        };
        return [createTodoJson, ...state];
      default:
        return state;
    }
  }
  return {
    user: userReducer(state.user, action),
    todo: todoReducer(state.posts, action),
  };
}

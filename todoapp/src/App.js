import UserBar from "./User/UserBar";
import CreateTodo from "./Todo/CreateTodo";
import TodoList from "./Todo/TodoList";
function App() {
  const todoList = [
    {
      title: "abc",
      description: "1",
      dateCreated: Date.now(),
    },
    {
      title: "def",
      description: "2",
      dateCreated: Date.now(),
    },
    {
      title: "ghi",
      description: "3",
      dateCreated: Date.now(),
    },
    {
      title: "jkl",
      description: "4",
      dateCreated: Date.now(),
    },
  ];
  const user = "Anam";

  return (
    <div>
      <UserBar user={user} />
      <hr />
      <CreateTodo user={user} />
      <hr />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;

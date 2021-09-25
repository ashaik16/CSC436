import UserBar from "./User/UserBar";
import CreateTodo from "./Todo/CreateTodo";
import TodoList from "./Todo/TodoList";
import { useState } from "react";
function App() {
  const dummyTodoList = [
    {
      id: Math.random(),
      title: "Check Mails",
      description: "Check if there are any new mails.",
      dateCreated: new Date().toLocaleDateString(),
    },
    {
      id: Math.random(),
      title: "Pay rent",
      description: "Check for the utilities bills as well.",
      dateCreated: new Date().toLocaleDateString(),
    },
    {
      id: Math.random(),
      title: "Pay tution fee",
      description: "Check if the CTA pass fee is included.",
      dateCreated: new Date().toLocaleDateString(),
    },
  ];
  const [todoList, setTodoList] = useState(dummyTodoList);
  const user = "Anam";
  function onSubmitHandler(createdTodoObject) {
    setTodoList((previousTodoList) => {
      return [createdTodoObject, ...previousTodoList];
    });
  }
  return (
    <div>
      <UserBar user={user} />
      <hr />
      <CreateTodo user={user} onSubmit={onSubmitHandler} />
      <hr />
      <TodoList todoList={todoList} />
    </div>
  );
}

export default App;

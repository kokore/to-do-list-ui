import TodoInput from "../todolist/TodoInput";
import TodoList from "../todolist/TodoList";

function Todolist() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default Todolist;

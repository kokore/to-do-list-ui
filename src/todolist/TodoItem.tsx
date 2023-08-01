import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "./RecoilState";
import { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.title);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateTask = () => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((item) =>
        item.id === todo.id ? { ...item, title: task } : item
      )
    );
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    setTodoList((prevTodoList) =>
      prevTodoList.filter((item) => item.id !== todo.id)
    );
  };

  return (
    <div className="flex items-center py-2 border-b">
      {isEditing ? (
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-grow px-2 py-1 border rounded"
        />
      ) : (
        <div className="flex-grow px-2 py-1">{todo.title}</div>
      )}
      <button
        className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
        onClick={isEditing ? handleUpdateTask : handleToggleEdit}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <button
        className="px-2 py-1 bg-red-500 text-white rounded"
        onClick={handleDeleteTask}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;

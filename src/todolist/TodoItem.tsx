import { ChangeEvent, useState } from "react";
import { Todo } from "./types";
import noImage from "../../public/No_image_available.svg.png";
import { updateTodolist } from "../api";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description);
  const [base64Image, setBase64Image] = useState<string>(todo.image);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateTask = () => {
    updateTodolist({
      id: todo.id || "",
      title: title || "",
      description: description || "",
      image: base64Image,
      status: todo.status,
    });
    setIsEditing(false);
    window.location.reload();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
    }
  };

  const handleUpdateStatus = () => {
    if (!isEditing) {
      updateTodolist({
        id: todo.id || "",
        title: todo.title || "",
        description: todo.description || "",
        image: todo.image,
        status: todo.status === "IN_PROGRESS" ? "COMPLETED" : "IN_PROGRESS",
      });
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center py-2 border-b">
      <button
        className="flex flex-grow items-center bg-black-400 hover:bg-sky-700 rounded disabled:opacity-50"
        disabled={todo.status === "COMPLETED"}
        onClick={handleUpdateStatus}
      >
        {isEditing ? (
          <input
            type="file"
            name="image"
            id="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            className="flex-grow px-2 py-1"
          />
        ) : (
          <div className="flex-grow mt-3 grid place-items-center">
            <img src={base64Image || noImage} alt="Selected" width="70" />
          </div>
        )}

        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow px-2 py-1 border rounded"
          />
        ) : (
          <div className="flex-grow  px-2 py-1">{todo.title}</div>
        )}
        {isEditing ? (
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-grow px-2 py-1 border rounded"
          />
        ) : (
          <div className="flex-grow px-2 py-1">{todo.description}</div>
        )}

        <div className="flex-grow px-2 py-1">{todo.status}</div>
      </button>
      <button
        className="mr-2 px-2 py-1 bg-green-500 text-white rounded"
        onClick={isEditing ? handleUpdateTask : handleToggleEdit}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default TodoItem;

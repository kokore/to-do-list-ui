import { ChangeEvent, useState } from "react";
import { Todo } from "./types";
import { saveTodolist } from "../api";

const TodoInput: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");

  const handleAddTask = () => {
    if (title.trim() !== "") {
      const newTodo: Todo = {
        title: title.trim(),
        description: description.trim(),
        image: base64Image.trim(),
        status: "IN_PROGRESS",
      };
      saveTodolist(newTodo);
      setTitle("");
      setDescription("");
      setBase64Image("");
    }
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

  return (
    <form>
      <div className="w-80 mx-auto mt-4">
        <div className="border rounded p-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new title"
            className="w-full px-2 py-1 border rounded"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter new description"
            className="w-full px-2 py-1 border rounded mt-3"
          />
          {base64Image && (
            <div className="mt-3 grid place-items-center">
              <img src={base64Image} alt="Selected" width="200" />
            </div>
          )}
          <label htmlFor="file">Choose an image</label>
          <input
            type="file"
            name="image"
            id="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            className="mt-3"
          />
        </div>

        <button
          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoInput;

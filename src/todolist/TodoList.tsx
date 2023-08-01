import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "./RecoilState";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { fetchTodolist } from "../api";

const TodoList: React.FC = () => {
  const todoList = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);

  useEffect(() => {
    const getTodoList = async () => {
      try {
        // const todos = await fetchTodolist({
        //   orderType: "",
        //   orderBy: "",
        //   search: "",
        // });

        const todos = await fetchTodolist({});
        setTodoList(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    getTodoList();
  }, []);

  console.log(">>", todoList);

  return (
    <div className="w-80 mx-auto mt-8">
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;

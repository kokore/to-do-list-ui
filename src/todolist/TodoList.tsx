import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoListState } from "./RecoilState";
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import { fetchTodolist } from "../api";
import { debounce } from "debounce";

const TodoList: React.FC = () => {
  const [filter, setFilter] = useState({
    orderType: "",
    orderBy: "",
    search: "",
  });
  const todoList = useRecoilValue(todoListState);
  const setTodoList = useSetRecoilState(todoListState);

  const getTodoList = async () => {
    try {
      const todos = await fetchTodolist(filter);
      setTodoList(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, [filter.search, filter.orderBy, filter.orderType]);

  const onOptionChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const searchFilter = debounce((query: string) => {
    setFilter((prevState) => ({
      ...prevState,
      search: query,
    }));
  }, 500);

  return (
    <div className="mx-auto mt-8">
      <div className="flex flex-row-reverse mt-5 mb-5">
        <form>
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search" // Associate the label with the input field
            name="Search" // Name attribute to identify the input element
            value={filter.search}
            onChange={(e) => searchFilter(e.target.value)}
          />
          <label htmlFor="orderBy">Order By:</label>
          <select name="By" id="orderBy" onChange={onOptionChangeHandler}>
            <option value="">None</option>
            <option value="title">Title</option>
            <option value="date">Date</option>
            <option value="status">Status</option>
          </select>
          <label htmlFor="orderType">Order Type:</label>
          <select name="type" id="orderType" onChange={onOptionChangeHandler}>
            <option value="">None</option>
            <option value="DESC">DESC</option>
            <option value="ASC">ASC</option>
          </select>
        </form>
      </div>
      {todoList.length > 0 &&
        todoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
};

export default TodoList;

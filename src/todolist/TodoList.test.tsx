import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import TodoList from "./TodoList";

jest.mock("../api", () => ({
  fetchTodolist: jest.fn(() =>
    Promise.resolve([
      {
        id: "1",
        title: "Test Todo 1",
        description: "Test Description 1",
        image: "",
        status: "IN_PROGRESS",
      },
      {
        id: "2",
        title: "Test Todo 2",
        description: "Test Description 2",
        image: "",
        status: "COMPLETED",
      },
    ])
  ),
}));

test("filters todo items by orderBy and orderType options", async () => {
  render(
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  );

  await waitFor(() => {
    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems).toHaveLength(2);
  });

  const orderBySelect = screen.getByLabelText("Order By:");
  fireEvent.change(orderBySelect, { target: { value: "title" } });

  const orderTypeSelect = screen.getByLabelText("Order Type:");
  fireEvent.change(orderTypeSelect, { target: { value: "DESC" } });

  await waitFor(() => {
    const filteredTodoItems = screen.getAllByTestId("todo-item");
    expect(filteredTodoItems).toHaveLength(2);
  });
});

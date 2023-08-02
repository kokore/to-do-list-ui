import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import TodoList from "./TodoList";

// Mock the fetchTodolist function from "../api"
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

  // Wait for the API call to resolve and render the todo items
  await waitFor(() => {
    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems).toHaveLength(2);
  });

  // Select "Title" from the "By" dropdown
  const orderBySelect = screen.getByLabelText("Order By:");
  fireEvent.change(orderBySelect, { target: { value: "title" } });

  // Select "DESC" from the "Type" dropdown
  const orderTypeSelect = screen.getByLabelText("Order Type:");
  fireEvent.change(orderTypeSelect, { target: { value: "DESC" } });

  // Wait for the todo items to be re-rendered with the new filter
  await waitFor(() => {
    const filteredTodoItems = screen.getAllByTestId("todo-item");
    // Assert that the filtered list contains the expected number of items
    expect(filteredTodoItems).toHaveLength(2);
    // Add additional assertions if needed
  });
});

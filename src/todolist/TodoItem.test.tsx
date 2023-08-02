import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoItem, { TodoItemProps } from "./TodoItem";
import { updateTodolist } from "../api";

jest.mock("../api", () => ({
  updateTodolist: jest.fn(),
}));

const mockTodo: TodoItemProps["todo"] = {
  id: "1",
  title: "Test Todo",
  description: "Test Description",
  image: "test-image.jpg",
  status: "IN_PROGRESS",
};

describe("TodoItem component", () => {
  test("renders todo item correctly", () => {
    render(<TodoItem todo={mockTodo} />);

    const imageElement = screen.getByAltText("Selected");
    const titleElement = screen.getByText(mockTodo.title);
    const descriptionElement = screen.getByText(mockTodo.description);
    const statusElement = screen.getByText(mockTodo.status);
    const editButton = screen.getByRole("button", { name: "Edit" });

    expect(imageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });

  test("shows edit inputs when clicking the Edit button", () => {
    render(
      <TodoItem
        todo={{
          id: "1",
          title: "Test Todo",
          description: "Test Description",
          image: "",
          status: "IN_PROGRESS",
        }}
      />
    );

    const editButton = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(editButton);

    const titleInput = screen.getByLabelText("Title");
    const descriptionInput = screen.getByLabelText("Description");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  test("calls updateTodolist function when clicking the Save button", () => {
    render(<TodoItem todo={mockTodo} />);

    const editButton = screen.getByRole("button", { name: "Edit" });

    fireEvent.click(editButton);

    const titleInput = screen.getByRole("textbox", { name: "Title" });
    const descriptionInput = screen.getByRole("textbox", {
      name: "Description",
    });
    const saveButton = screen.getByRole("button", { name: "Save" });

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });

    fireEvent.click(saveButton);

    expect(updateTodolist).toHaveBeenCalledWith({
      id: mockTodo.id,
      title: "Updated Title",
      description: "Updated Description",
      image: mockTodo.image,
      status: mockTodo.status,
    });
  });
});

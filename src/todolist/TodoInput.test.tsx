import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import TodoInput from "./TodoInput";

test("renders input fields and add button", () => {
  render(<TodoInput />);

  const titleInput = screen.getByPlaceholderText("Enter new title");
  const descriptionInput = screen.getByPlaceholderText("Enter new description");
  const imageInput = screen.getByLabelText(/choose an image/i);
  const addButton = screen.getByRole("button", { name: "Add Task" });

  expect(titleInput).toBeInTheDocument();
  expect(descriptionInput).toBeInTheDocument();
  expect(imageInput).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test("adding a new task", () => {
  HTMLFormElement.prototype.requestSubmit = jest.fn();
  render(<TodoInput />);

  const titleInput = screen.getByPlaceholderText("Enter new title");
  const descriptionInput = screen.getByPlaceholderText("Enter new description");
  const imageInput = screen.getByLabelText("Choose an image");

  userEvent.type(titleInput, "Test Title");
  userEvent.type(descriptionInput, "Test Description");

  const imageFile = new File(["dummy content"], "test.jpg", {
    type: "image/jpeg",
  });
  fireEvent.change(imageInput, { target: { files: [imageFile] } });

  const addButton = screen.getByRole("button", { name: "Add Task" });
  userEvent.click(addButton);

  expect(titleInput).toHaveValue("");
  expect(descriptionInput).toHaveValue("");
  expect(imageInput).toHaveValue("");
});

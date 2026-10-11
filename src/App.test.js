
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  render(<App />);
});

test("renders the Little Lemon booking form", () => {
  expect(
    screen.getByRole("heading", { name: /little lemon/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("heading", { name: /reserve a table/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /make your reservation/i })
  ).toBeInTheDocument();
});

test("shows all booking form fields", () => {
  expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
});

test("submits a valid reservation", () => {
  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-12-25" },
  });

  fireEvent.click(
    screen.getByRole("button", { name: /make your reservation/i })
  );

  expect(
    screen.getByText(/booking form has been submitted successfully/i)
  ).toBeInTheDocument();

  expect(screen.getByText(/2099-12-25/)).toBeInTheDocument();
});

test("allows the user to make another booking", () => {
  fireEvent.change(screen.getByLabelText(/choose date/i), {
    target: { value: "2099-12-25" },
  });

  fireEvent.click(
    screen.getByRole("button", { name: /make your reservation/i })
  );

  fireEvent.click(
    screen.getByRole("button", { name: /make another booking/i })
  );

  expect(
    screen.getByRole("heading", { name: /reserve a table/i })
  ).toBeInTheDocument();
});

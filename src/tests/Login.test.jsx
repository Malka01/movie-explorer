import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import {
  BrowserRouter,
} from "react-router-dom";

import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthContext";

function renderLogin() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
}

test("renders login form", () => {
  renderLogin();

  expect(
    screen.getByRole("heading", {
      name: /movie explorer/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/username/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/password/i)
  ).toBeInTheDocument();
});

test("login button exists", () => {
  renderLogin();

  expect(
    screen.getByRole("button", {
      name: /login/i,
    })
  ).toBeInTheDocument();
});

test("user can enter username and password", () => {
  renderLogin();

  const username =
    screen.getByLabelText(/username/i);

  const password =
    screen.getByLabelText(/password/i);

  fireEvent.change(username, {
    target: {
      value: "admin",
    },
  });

  fireEvent.change(password, {
    target: {
      value: "123456",
    },
  });

  expect(username).toHaveValue("admin");
  expect(password).toHaveValue("123456");
});
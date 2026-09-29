import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import SearchBar from "../components/SearchBar";
import { MovieProvider } from "../context/MovieContext";

function renderSearchBar() {
  return render(
    <MovieProvider>
      <SearchBar />
    </MovieProvider>
  );
}

test("renders search input", () => {
  renderSearchBar();

  expect(
    screen.getByLabelText(/search movies/i)
  ).toBeInTheDocument();
});

test("renders search button", () => {
  renderSearchBar();

  expect(
    screen.getByRole("button", {
      name: /search/i,
    })
  ).toBeInTheDocument();
});

test("search button is disabled when input is empty", () => {
  renderSearchBar();

  expect(
    screen.getByRole("button", {
      name: /search/i,
    })
  ).toBeDisabled();
});

test("search input accepts text", () => {
  renderSearchBar();

  const input =
    screen.getByLabelText(/search movies/i);

  fireEvent.change(input, {
    target: {
      value: "Batman",
    },
  });

  expect(input).toHaveValue("Batman");
});
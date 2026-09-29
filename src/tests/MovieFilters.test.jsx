import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import MovieFilters from "../components/MovieFilters";

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 35,
    name: "Comedy",
  },
];

function renderFilters() {
  const setGenreId = jest.fn();
  const setYear = jest.fn();
  const setMinRating = jest.fn();
  const onReset = jest.fn();

  render(
    <MovieFilters
      genres={genres}
      genreId=""
      setGenreId={setGenreId}
      year=""
      setYear={setYear}
      minRating=""
      setMinRating={setMinRating}
      onReset={onReset}
    />
  );

  return {
    setGenreId,
    setYear,
    setMinRating,
    onReset,
  };
}

test("renders filter controls", () => {
  renderFilters();

  expect(
    screen.getByLabelText(/genre/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/release year/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/minimum rating/i)
  ).toBeInTheDocument();
});

test("renders genre options", () => {
  renderFilters();

  expect(
    screen.getByText("Action")
  ).toBeInTheDocument();

  expect(
    screen.getByText("Comedy")
  ).toBeInTheDocument();
});

test("renders release year options and selects a year", () => {
  const { setYear } = renderFilters();
  const currentYear = new Date().getFullYear();
  const releaseYearSelect = screen.getByLabelText(/release year/i);

  expect(
    screen.getByRole("option", {
      name: String(currentYear),
    })
  ).toBeInTheDocument();

  fireEvent.change(releaseYearSelect, {
    target: { value: "2020" },
  });

  expect(setYear).toHaveBeenCalledWith("2020");
});

test("calls reset handler", () => {
  const { onReset } = renderFilters();

  fireEvent.click(
    screen.getByRole("button", {
      name: /reset/i,
    })
  );

  expect(onReset).toHaveBeenCalledTimes(1);
});
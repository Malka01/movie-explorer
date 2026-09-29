import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import { MovieProvider } from "../context/MovieContext";

const movie = {
  id: 123,
  title: "Test Movie",
  release_date: "2025-05-10",
  vote_average: 8.4,
  poster_path: "/test-poster.jpg",
};

function renderMovieCard() {
  return render(
    <BrowserRouter>
      <MovieProvider>
        <MovieCard movie={movie} />
      </MovieProvider>
    </BrowserRouter>
  );
}

test("renders movie title", () => {
  renderMovieCard();

  expect(
    screen.getByText("Test Movie")
  ).toBeInTheDocument();
});

test("renders movie release year", () => {
  renderMovieCard();

  expect(
    screen.getByText("2025")
  ).toBeInTheDocument();
});

test("renders movie rating", () => {
  renderMovieCard();

  expect(
    screen.getByText("8.4")
  ).toBeInTheDocument();
});
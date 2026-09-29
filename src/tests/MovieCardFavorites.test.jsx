import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import MovieCard from "../components/MovieCard";
import {
  MovieProvider,
  useMovies,
} from "../context/MovieContext";

const movie = {
  id: 123,
  title: "Test Movie",
  release_date: "2025-05-10",
  vote_average: 8.4,
  poster_path: "/test-poster.jpg",
};

function FavoriteStatus() {
  const { isFavorite } = useMovies();

  return (
    <div>
      {isFavorite(movie.id)
        ? "Favorite"
        : "Not Favorite"}
    </div>
  );
}

function renderFavoriteTest() {
  return render(
    <BrowserRouter>
      <MovieProvider>
        <MovieCard movie={movie} />
        <FavoriteStatus />
      </MovieProvider>
    </BrowserRouter>
  );
}

test("movie is not a favorite initially", () => {
  localStorage.clear();

  renderFavoriteTest();

  expect(
    screen.getByText("Not Favorite")
  ).toBeInTheDocument();
});

test("adds movie to favorites", () => {
  localStorage.clear();

  renderFavoriteTest();

  const favoriteButton =
    screen.getByRole("button", {
      name: /add to favorites/i,
    });

  fireEvent.click(favoriteButton);

  expect(
    screen.getByText("Favorite")
  ).toBeInTheDocument();
});

test("stores favorite movie in localStorage", () => {
  localStorage.clear();

  renderFavoriteTest();

  const favoriteButton =
    screen.getByRole("button", {
      name: /add to favorites/i,
    });

  fireEvent.click(favoriteButton);

  const savedFavorites =
    JSON.parse(
      localStorage.getItem("favorites")
    );

  expect(savedFavorites).toHaveLength(1);

  expect(savedFavorites[0].id).toBe(123);
});
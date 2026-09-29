import { createContext, useContext, useEffect, useState } from "react";

import {
  getTrendingMovies,
  searchMovies,
  getMovieGenres,
} from "../services/tmdbApi";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [trendingMovies, setTrendingMovies] = useState([]);

const [searchResults, setSearchResults] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [hasSearched, setHasSearched] = useState(false);
const [favorites, setFavorites] = useState([]);
const [genres, setGenres] = useState([]);

  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const [error, setError] = useState("");
  const [searchError, setSearchError] = useState("");

  // Fetch trending movies
  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTrendingMovies();

      setTrendingMovies(data.results || []);
    } catch (err) {
      console.error("Failed to fetch trending movies:", err);

      setError(
        "Unable to load trending movies. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Search movies
  const searchMovie = async (query, page = 1) => {
    if (!query.trim()) {
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError("");

      const data = await searchMovies(query, page);

      if (page === 1) {
        setSearchResults(data.results || []);
      } else {
        setSearchResults((previousResults) => [
          ...previousResults,
          ...(data.results || []),
        ]);
      }

      setSearchQuery(query);
    setSearchPage(page);
    setTotalPages(data.total_pages || 1);
      setHasSearched(true);
    localStorage.setItem("lastSearch", query);
    } catch (err) {
      console.error("Movie search failed:", err);

      setSearchError(
        "Unable to search movies. Please try again."
      );
    } finally {
      setSearchLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchResults([]);
    setSearchQuery("");
    setHasSearched(false);
    setSearchPage(1);
    setTotalPages(1);
    setSearchError("");
  };

  // Load next search page
  const loadMoreSearchResults = () => {
    if (
      searchPage < totalPages &&
      !searchLoading &&
      searchQuery
    ) {
      searchMovie(searchQuery, searchPage + 1);
    }
  };

  // Load saved favorites
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error(
          "Failed to parse saved favorites:",
          error
        );

        localStorage.removeItem("favorites");
      }
    }
  }, []);

  // Add or remove favorite
  const toggleFavorite = (movie) => {
    setFavorites((previousFavorites) => {
      const alreadyFavorite = previousFavorites.some(
        (favorite) => favorite.id === movie.id
      );

      let updatedFavorites;

      if (alreadyFavorite) {
        updatedFavorites = previousFavorites.filter(
          (favorite) => favorite.id !== movie.id
        );
      } else {
        updatedFavorites = [...previousFavorites, movie];
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    });
  };

  // Check whether movie is favorite
  const isFavorite = (movieId) => {
    return favorites.some(
      (favorite) => favorite.id === movieId
    );
  };

  const fetchGenres = async () => {
  try {
    const data = await getMovieGenres();

    setGenres(data.genres || []);
  } catch (err) {
    console.error("Failed to fetch movie genres:", err);
  }
};

  // Load trending movies on startup
  useEffect(() => {
    fetchTrendingMovies();
    fetchGenres();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,

        searchResults,
        searchQuery,
        hasSearched,
        searchPage,
        totalPages,

        genres,

        loading,
        searchLoading,

        error,
        searchError,

        favorites,
        toggleFavorite,
        isFavorite,

        fetchTrendingMovies,
        searchMovie,
        clearSearch,
        loadMoreSearchResults,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}
import { createContext, useContext, useEffect, useState } from "react";
import {
  getTrendingMovies,
  searchMovies,
} from "../services/tmdbApi";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [trendingMovies, setTrendingMovies] = useState([]);

  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

      // Save last search
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

  // Get previous search from LocalStorage
  useEffect(() => {
    const savedSearch = localStorage.getItem("lastSearch");

    if (savedSearch) {
      setSearchQuery(savedSearch);
    }
  }, []);

  // Load trending movies on startup
  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,

        searchResults,
        searchQuery,
        searchPage,
        totalPages,

        loading,
        searchLoading,

        error,
        searchError,

        fetchTrendingMovies,
        searchMovie,
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
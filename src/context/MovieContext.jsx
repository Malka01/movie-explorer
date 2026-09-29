import { createContext, useContext, useEffect, useState } from "react";
import { getTrendingMovies } from "../services/tmdbApi";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        loading,
        error,
        fetchTrendingMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}
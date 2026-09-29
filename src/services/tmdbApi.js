import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

// Get trending movies
export const getTrendingMovies = async () => {
  const response = await tmdbApi.get("/trending/movie/week");

  return response.data;
};

// Search movies
export const searchMovies = async (query, page = 1) => {
  const response = await tmdbApi.get("/search/movie", {
    params: {
      query,
      page,
    },
  });

  return response.data;
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}`);

  return response.data;
};

// Get movie credits
export const getMovieCredits = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/credits`);

  return response.data;
};

// Get movie videos
export const getMovieVideos = async (movieId) => {
  const response = await tmdbApi.get(`/movie/${movieId}/videos`);

  return response.data;
};

// Get movie genres
export const getMovieGenres = async () => {
  const response = await tmdbApi.get("/genre/movie/list");

  return response.data;
};

export default tmdbApi;
import { useState } from "react";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import MovieFilters from "../components/MovieFilters";

import { useMovies } from "../context/MovieContext";

function Home() {
  const {
    trendingMovies,
    searchResults,
    hasSearched,
    searchQuery,
    genres,
    loading,
    searchLoading,
    error,
    searchError,
    fetchTrendingMovies,
    loadMoreSearchResults,
    searchPage,
    totalPages,
  } = useMovies();

  const [genreId, setGenreId] = useState("");
  const [year, setYear] = useState("");
  const [minRating, setMinRating] = useState("");

  const resetFilters = () => {
    setGenreId("");
    setYear("");
    setMinRating("");
  };

  const moviesToFilter = hasSearched
    ? searchResults
    : trendingMovies;

  const filteredMovies = moviesToFilter.filter(
    (movie) => {
      const movieYear = movie.release_date
        ? movie.release_date.substring(0, 4)
        : "";

      const selectedGenreId = Number(genreId);

      const matchesGenre =
        !genreId ||
        (movie.genre_ids || []).includes(
          selectedGenreId
        ) ||
        (movie.genres || []).some(
          (genre) =>
            genre.id === selectedGenreId
        );

      const matchesYear =
        !year || movieYear === year;

      const matchesRating =
        !minRating ||
        movie.vote_average >=
          Number(minRating);

      return (
        matchesGenre &&
        matchesYear &&
        matchesRating
      );
    }
  );

  const isSearching = hasSearched;

  return (
    <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 3,
            sm: 4,
          },
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
            },
            textAlign: "center",
          }}
        >
          Discover Movies 🎬
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{textAlign: "center"}}
        >
          Search for movies, explore trending titles,
          and save your favorites.
        </Typography>
      </Box>

      <SearchBar />

      <MovieFilters
        genres={genres}
        genreId={genreId}
        setGenreId={setGenreId}
        year={year}
        setYear={setYear}
        minRating={minRating}
        setMinRating={setMinRating}
        onReset={resetFilters}
      />

      {isSearching ? (
        <>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            sx={{
              mb: 3,
              fontSize: {
                xs: "1.6rem",
                sm: "2rem",
              },
            }}
          >
            Search Results
          </Typography>

          {searchQuery && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3 }}
            >
              Showing results for{" "}
              <strong>
                "{searchQuery}"
              </strong>
            </Typography>
          )}

          {searchLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 6,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {searchError && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {searchError}
            </Alert>
          )}

          {!searchLoading &&
            !searchError &&
            filteredMovies.length === 0 && (
              <Alert severity="info">
                No movies match the selected
                filters.
              </Alert>
            )}

          {!searchLoading &&
            !searchError &&
            filteredMovies.length > 0 && (
              <MovieGrid
                movies={filteredMovies}
              />
            )}

          {!searchLoading &&
            !searchError &&
            searchResults.length > 0 &&
            searchPage < totalPages && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                }}
              >
                <Button
                  variant="contained"
                  onClick={loadMoreSearchResults}
                >
                  Load More
                </Button>
              </Box>
            )}

          {!searchLoading &&
            !searchError &&
            searchResults.length > 0 &&
            searchPage >= totalPages && (
              <Typography
                textAlign="center"
                color="text.secondary"
                sx={{ mt: 5 }}
              >
                You've reached the end of the
                search results.
              </Typography>
            )}
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            sx={{ mb: 3 }}
          >
            Trending Movies 🔥
          </Typography>

          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 6,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
            >
              {error}

              <Button
                size="small"
                onClick={fetchTrendingMovies}
                sx={{ ml: 2 }}
              >
                Retry
              </Button>
            </Alert>
          )}

          {!loading &&
            !error &&
            filteredMovies.length > 0 && (
              <MovieGrid
                movies={filteredMovies}
              />
            )}

          {!loading &&
            !error &&
            trendingMovies.length > 0 &&
            filteredMovies.length === 0 && (
              <Alert severity="info">
                No trending movies match the
                selected filters.
              </Alert>
            )}

          {!loading &&
            !error &&
            trendingMovies.length === 0 && (
              <Alert severity="info">
                No trending movies found.
              </Alert>
            )}
        </>
      )}
    </Container>
  );
}

export default Home;
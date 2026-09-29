import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
} from "@mui/material";

import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";

import { useMovies } from "../context/MovieContext";

function Home() {
  const {
    trendingMovies,

    searchResults,
    searchQuery,

    loading,
    searchLoading,

    error,
    searchError,

    fetchTrendingMovies,
    loadMoreSearchResults,

    searchPage,
    totalPages,
  } = useMovies();

  const isSearching = Boolean(searchQuery);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Discover Movies
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Search and discover your favorite movies.
      </Typography>

      <SearchBar />

      {/* Search Results */}
      {isSearching ? (
        <>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Search Results for "{searchQuery}"
          </Typography>

          {searchError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {searchError}
            </Alert>
          )}

          {searchLoading && searchResults.length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 8,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {!searchLoading &&
            !searchError &&
            searchResults.length === 0 && (
              <Alert severity="info">
                No movies found for "{searchQuery}".
              </Alert>
            )}

          {searchResults.length > 0 && (
            <>
              <MovieGrid movies={searchResults} />

              {searchPage < totalPages && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={loadMoreSearchResults}
                    disabled={searchLoading}
                  >
                    {searchLoading
                      ? "Loading..."
                      : "Load More"}
                  </Button>
                </Box>
              )}

              {searchPage >= totalPages && (
                <Typography
                  align="center"
                  color="text.secondary"
                  sx={{ mt: 4 }}
                >
                  You've reached the end of the results.
                </Typography>
              )}
            </>
          )}
        </>
      ) : (
        /* Trending Movies */
        <>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Trending Movies
          </Typography>

          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 8,
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Box sx={{ mb: 3 }}>
              <Alert severity="error">
                {error}
              </Alert>

              <Button
                variant="contained"
                onClick={fetchTrendingMovies}
                sx={{ mt: 2 }}
              >
                Try Again
              </Button>
            </Box>
          )}

          {!loading &&
            !error &&
            trendingMovies.length > 0 && (
              <MovieGrid movies={trendingMovies} />
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
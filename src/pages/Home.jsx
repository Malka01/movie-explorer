import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
} from "@mui/material";

import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

function Home() {
  const {
    trendingMovies,
    loading,
    error,
    fetchTrendingMovies,
  } = useMovies();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: "bold", mb: 1 }}
      >
        Discover Movies
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Explore the most popular movies right now.
      </Typography>

      <Typography
        variant="h5"
        component="h2"
        sx={{ fontWeight: "bold", mb: 3 }}
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
    </Container>
  );
}

export default Home;
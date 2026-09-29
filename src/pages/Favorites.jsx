import {
  Alert,
  Container,
  Typography,
} from "@mui/material";

import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

function Favorites() {
  const { favorites } = useMovies();

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
        My Favorites ❤️
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Movies you've saved to your favorites.
      </Typography>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <Alert severity="info">
          You haven't added any movies to your favorites yet.
        </Alert>
      )}
    </Container>
  );
}

export default Favorites;
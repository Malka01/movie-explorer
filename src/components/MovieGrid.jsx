import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid
          item
          key={movie.id}
          xs={6}
          sm={4}
          md={3}
          lg={2.4}
        >
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieGrid;
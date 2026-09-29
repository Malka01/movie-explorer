import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  return (
    <Grid
      container
      spacing={{
        xs: 2,
        sm: 3,
      }}
    >
      {movies.map((movie) => (
        <Grid
          key={movie.id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieGrid;
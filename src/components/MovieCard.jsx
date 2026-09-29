import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  return (
    <Card
      component={Link}
      to={`/movie/${movie.id}`}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardMedia
        component="img"
        image={posterUrl}
        alt={movie.title}
        sx={{
          aspectRatio: "2 / 3",
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: "bold",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {movie.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {releaseYear}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 1,
          }}
        >
          <Rating
            value={movie.vote_average / 2}
            precision={0.1}
            readOnly
            size="small"
          />

          <Typography variant="body2">
            {movie.vote_average?.toFixed(1)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MovieCard;
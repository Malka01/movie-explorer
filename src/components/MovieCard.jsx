import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Link } from "react-router-dom";
import { useMovies } from "../context/MovieContext";

function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useMovies();

  const favorite = isFavorite(movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleFavorite(movie);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      {/* Favorite button */}
      <Tooltip
        title={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          {favorite ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon sx={{ color: "white" }} />
          )}
        </IconButton>
      </Tooltip>

      {/* Movie link */}
      <Box
        component={Link}
        to={`/movie/${movie.id}`}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <CardMedia
          component="img"
          image={posterUrl}
          alt={movie.title}
          loading="lazy"
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
              fontSize: {
                xs: "0.95rem",
                sm: "1.1rem",
              },
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
      </Box>
    </Card>
  );
}

export default MovieCard;
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  searchMovies,
} from "../services/tmdbApi";
import { getMovieTitleFromSlug } from "../utils/movieSlug";

function MovieDetails() {
  const { movieName } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const isLegacyId = /^\d+$/.test(movieName);
        let movieId = movieName;

        if (!isLegacyId) {
          const title = getMovieTitleFromSlug(movieName);
          const searchData = await searchMovies(title);
          const matchingMovie = (searchData.results || []).find(
            (result) => result.title?.toLowerCase() === title.toLowerCase()
          ) || searchData.results?.[0];

          if (!matchingMovie) {
            throw new Error("Movie not found");
          }

          movieId = matchingMovie.id;
        }

        const [movieData, creditsData, videosData] =
          await Promise.all([
            getMovieDetails(movieId),
            getMovieCredits(movieId),
            getMovieVideos(movieId),
          ]);

        setMovie(movieData);
        setCast((creditsData.cast || []).slice(0, 6));

        const youtubeTrailer = (videosData.results || []).find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official
        );

        const fallbackTrailer = (videosData.results || []).find(
          (video) =>
            video.site === "YouTube" &&
            video.type === "Trailer"
        );

        setTrailer(youtubeTrailer || fallbackTrailer || null);
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
        setError("Unable to load movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieName]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>

        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 3 }}
        >
          Back to Movies
        </Button>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="info">Movie not found.</Alert>
      </Container>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";

  return (
    <Box>
      {/* Backdrop */}
      {backdropUrl && (
        <Box
          component="img"
          src={backdropUrl}
          alt={`${movie.title} backdrop`}
          sx={{
            display: "block",
            width: "100%",
            height: { xs: 220, md: 400 },
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4 }}
        >
          Back to Movies
        </Button>

        {/* Main movie information */}
        <Grid
            container
            spacing={{
              xs: 3,
              md: 5,
            }}
          >
          {/* Poster */}
          <Grid item xs={12} md={4} lg={3}>
            <Box
              component="img"
              src={posterUrl}
              alt={movie.title}
              sx={{
                width: "100%",
                maxWidth: 350,
                display: "block",
                mx: "auto",
                borderRadius: 2,
                boxShadow: 6,
              }}
            />
          </Grid>

          {/* Details */}
          <Grid item xs={12} md={8} lg={9}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "bold",
                mb: 1,
              }}
            >
              {movie.title}
            </Typography>

            {movie.original_title &&
              movie.original_title !== movie.title && (
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Original title: {movie.original_title}
                </Typography>
              )}

            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ mb: 3 }}
            >
              <Chip label={releaseYear} />

              <Chip label={runtime} />

              <Chip
                label={`${movie.vote_average?.toFixed(1)}/10`}
                color="primary"
              />

              {movie.genres?.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  variant="outlined"
                />
              ))}
            </Stack>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 3,
              }}
            >
              <Rating
                value={movie.vote_average / 2}
                precision={0.1}
                readOnly
              />

              <Typography>
                {movie.vote_count?.toLocaleString()} votes
              </Typography>
            </Box>

            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Overview
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.8,
                maxWidth: 900,
              }}
            >
              {movie.overview || "No overview available."}
            </Typography>
          </Grid>
        </Grid>

        {/* Cast */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Cast
          </Typography>

          {cast.length > 0 ? (
            <Grid container spacing={3}>
              {cast.map((actor) => {
                const actorImage = actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image";

                return (
                  <Grid
                    item
                    key={actor.id}
                    xs={6}
                    sm={4}
                    md={2}
                    sx={{ minWidth: "20%" }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: {
                          xs: 320,
                          sm: 350,
                          md: 360,
                        },
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        borderRadius: 2,
                        bgcolor: "background.paper",
                        boxShadow: 2,
                      }}
                    >
                      <Box
                        component="img"
                        src={actorImage}
                        alt={actor.name}
                        sx={{
                          width: "100%",
                          height: {
                            xs: 220,
                            sm: 245,
                            md: 270,
                          },
                          objectFit: "cover",
                        }}
                      />

                      <Box sx={{ p: 1.5 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {actor.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {actor.character || "Unknown role"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography color="text.secondary">
              Cast information is not available.
            </Typography>
          )}
        </Box>

        {/* Trailer */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
          >
            Trailer On Board
          </Typography>

          {trailer ? (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 1000,
                paddingTop: "56.25%",
                mx: "auto",
              }}
            >
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                  borderRadius: 2,
                }}
              />
            </Box>
          ) : (
            <Alert severity="info">
              No YouTube trailer is available for this movie.
            </Alert>
          )}
        </Box>
      </Container>

      <Box
        component="footer"
        sx={{
          mt: 4,
          py: 3,
          px: 2,
          textAlign: "center",
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Movie Explorer · Movie data provided by TMDb
        </Typography>
      </Box>
    </Box>
  );
}

export default MovieDetails;
import { Container, Typography } from "@mui/material";

function MovieDetails() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">
        Movie Details
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Movie details will appear here.
      </Typography>
    </Container>
  );
}

export default MovieDetails;
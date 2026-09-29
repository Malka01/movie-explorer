import { Container, Typography } from "@mui/material";

function Home() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Discover Movies
      </Typography>

      <Typography variant="body1">
        Search and discover your favorite movies.
      </Typography>
    </Container>
  );
}

export default Home;
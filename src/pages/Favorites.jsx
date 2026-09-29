import { Container, Typography } from "@mui/material";

function Favorites() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4">
        My Favorites
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Your favorite movies will appear here.
      </Typography>
    </Container>
  );
}

export default Favorites;
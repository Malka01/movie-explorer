import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

function MovieFilters({
  genres,
  genreId,
  setGenreId,
  year,
  setYear,
  minRating,
  setMinRating,
  onReset,
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, index) => currentYear - index
  );

  const activeFilterCount = [
    genreId,
    year,
    minRating,
  ].filter(Boolean).length;

  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
          >
            Filter Movies
          </Typography>

          {activeFilterCount > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {activeFilterCount} active filter
              {activeFilterCount > 1 ? "s" : ""}
            </Typography>
          )}
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <FormControl
            fullWidth
            size="small"
          >
            <InputLabel>Genre</InputLabel>

            <Select
              value={genreId}
              label="Genre"
              onChange={(event) =>
                setGenreId(event.target.value)
              }
            >
              <MenuItem value="">
                All Genres
              </MenuItem>

              {genres.map((genre) => (
                <MenuItem
                  key={genre.id}
                  value={genre.id}
                >
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            size="small"
          >
            <InputLabel>Release Year</InputLabel>

            <Select
              value={year}
              label="Release Year"
              onChange={(event) =>
                setYear(event.target.value)
              }
            >
              <MenuItem value="">
                All Years
              </MenuItem>

              {years.map((releaseYear) => (
                <MenuItem
                  key={releaseYear}
                  value={String(releaseYear)}
                >
                  {releaseYear}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            size="small"
          >
            <InputLabel>
              Minimum Rating
            </InputLabel>

            <Select
              value={minRating}
              label="Minimum Rating"
              onChange={(event) =>
                setMinRating(event.target.value)
              }
            >
              <MenuItem value="">
                Any Rating
              </MenuItem>

              <MenuItem value="9">
                9+
              </MenuItem>

              <MenuItem value="8">
                8+
              </MenuItem>

              <MenuItem value="7">
                7+
              </MenuItem>

              <MenuItem value="6">
                6+
              </MenuItem>

              <MenuItem value="5">
                5+
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            onClick={onReset}
            disabled={activeFilterCount === 0}
            sx={{
              minWidth: 110,
              height: 40,
            }}
          >
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default MovieFilters;
import { useEffect, useState } from "react";

import {
  TextField,
  Button,
  Box,
} from "@mui/material";

import { useMovies } from "../context/MovieContext";

function SearchBar() {
  const {
    searchMovie,
    searchQuery,
    searchLoading,
  } = useMovies();

  const [query, setQuery] =
    useState(searchQuery);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!query.trim()) {
      return;
    }

    searchMovie(query.trim(), 1);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        gap: 1,
        mb: 4,
        width: "100%",
      }}
    >
      <TextField
        fullWidth
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
        placeholder="Search for a movie..."
        label="Search Movies"
      />

      <Button
        type="submit"
        variant="contained"
        disabled={
          searchLoading ||
          !query.trim()
        }
        sx={{
          minWidth: {
            xs: "100%",
            sm: "110px",
          },
          minHeight: 56,
        }}
      >
        {searchLoading
          ? "Searching..."
          : "Search"}
      </Button>
    </Box>
  );
}

export default SearchBar;
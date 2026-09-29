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
    clearSearch,
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
      clearSearch();
      return;
    }

    searchMovie(query.trim(), 1);
  };

  const handleQueryChange = (event) => {
    const nextQuery = event.target.value;

    setQuery(nextQuery);

    if (!nextQuery.trim()) {
      clearSearch();
    }
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
        onChange={handleQueryChange}
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
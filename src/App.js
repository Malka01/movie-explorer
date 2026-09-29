import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";

import { lightTheme, darkTheme } from "./theme/theme";
import { MovieProvider } from "./context/MovieContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <MovieProvider>

      <BrowserRouter>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/movie/:id"
            element={<MovieDetails />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />
        </Routes>
      </BrowserRouter>
      </MovieProvider>
    </ThemeProvider>
  );
}

export default App;
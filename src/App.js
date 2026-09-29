import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";

import { lightTheme, darkTheme } from "./theme/theme";
import { MovieProvider } from "./context/MovieContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AuthProvider>
        <MovieProvider>
          <BrowserRouter>
            <Navbar
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />

            <Routes>
              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/movie/:movieName"
                element={<MovieDetails />}
              />

              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
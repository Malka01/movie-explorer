import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";

import {
  DarkMode,
  LightMode,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const {
    user,
    logout,
    isAuthenticated,
  } = useAuth();

  const [menuAnchor, setMenuAnchor] = useState(null);

  const menuOpen = Boolean(menuAnchor);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
            <LightMode />
  };
            <DarkMode />
  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  const handleNavigation = (path) => {
    handleMenuClose();
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          🎬 Movie Explorer
        </Typography>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Button
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>

          {isAuthenticated && (
            <Button
              color="inherit"
              component={Link}
              to="/favorites"
            >
              Favorites
            </Button>
          )}

          {isAuthenticated ? (
            <>
              <Typography
                variant="body2"
                sx={{ mx: 1 }}
              >
                Hi, {user.username}
              </Typography>

              <Button
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Login
            </Button>
          )}
        </Box>

        {/* Theme Toggle */}
        <IconButton
          color="inherit"
          onClick={() =>
            setDarkMode(
              (previous) => !previous
            )
          }
          sx={{ ml: 1 }}
        >
          {darkMode ? (
            // <Brightness7 />
              <LightMode />
          ) : (
            // <Brightness4 />
            <DarkMode />
          )}
        </IconButton>

        {/* Mobile Menu */}
        <IconButton
          color="inherit"
          onClick={handleMenuOpen}
          sx={{
            display: {
              xs: "flex",
              sm: "none",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() =>
              handleNavigation("/")
            }
          >
            Home
          </MenuItem>

          {isAuthenticated && (
            <MenuItem
              onClick={() =>
                handleNavigation("/favorites")
              }
            >
              Favorites
            </MenuItem>
          )}

          {isAuthenticated ? (
            <MenuItem onClick={handleLogout}>
              Logout ({user.username})
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() =>
                handleNavigation("/login")
              }
            >
              Login
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
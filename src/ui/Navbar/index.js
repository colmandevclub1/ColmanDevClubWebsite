import * as React from "react";

import { NavLink, Outlet, useLocation } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import css from "./style.module.css";
import { UserAuth } from "src/lib/auth/authContext";

const pages = [
  { title: "Home", path: "/" },
  { title: "The Team", path: "/team" },
  //{ title: 'Sign Up', path: '/Sign-up' },
  //{ title: "Signin", path: "/signin" },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { user, logout } = UserAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
      await logout();
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="secondary"
        sx={{ borderBottom: "1px solid #1F1F53" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Colman<span className={css["text-yellow"]}>Dev</span>Club
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <NavLink
                    key={page.title}
                    to={page.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.title}</Typography>
                    </MenuItem>
                  </NavLink>
                ))}
                {user && (
                  <>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        Hello, {user.email}
                      </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        handleCloseNavMenu();
                      }}
                    >
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </>
                )}
                {!user && (
                  <NavLink
                    to="/sign-in"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Sign In</Typography>
                    </MenuItem>
                  </NavLink>
                )}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Colman<span className={css["text-yellow"]}>Dev</span>Club
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <NavLink
                  key={page.title}
                  to={page.path}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    sx={{
                      marginLeft: "0.25rem",
                      my: 2,
                      color: "white",
                      display: "block",
                      textTransform: "none",
                    }}
                    className={page.path === pathname ? css["text-yellow"] : ""}
                  >
                    {page.title}
                  </Button>
                </NavLink>
              ))}
              {user ? (
                <>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  ></Box>
                  <Button
                    sx={{
                      color: "white",
                      textTransform: "none",
                      cursor: "default",
                      "&:hover": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Hello !
                  </Button>
                  <Button
                    onClick={handleLogout}
                    sx={{
                      marginLeft: "0.25rem",
                      my: 2,
                      color: "white",
                      display: "block",
                      textTransform: "none",
                    }}
                  >
                    Logout
                  </Button>
                  <Box />
                </>
              ) : (
                // Only show Sign In when user is not logged in
                <NavLink
                  to="/sign-in"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Button
                    sx={{
                      marginLeft: "0.25rem",
                      my: 2,
                      color: "white",
                      display: "block",
                      textTransform: "none",
                    }}
                  >
                    Sign In
                  </Button>
                </NavLink>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <main>{<Outlet />}</main>
    </>
  );
};
export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { LOGO_URL } from "../utils/constants";
import { useSelector } from "react-redux";


// Optional: Styled image
const Logo = styled("img")({
  height: "50px",
  marginRight: "20px",
});

const Header = () => {
  const [loginBtn, setLoginBtn] = useState("Login");

  const selector = useSelector( (store) => store.cart.items)

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side: Logo + Nav Links */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Logo src={LOGO_URL} alt="logo" />

          <Box sx={{ display: "flex", gap: 3 }}>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/about" color="inherit">About Us</Button>
            <Button component={Link} to="/contact" color="inherit">Contact Us</Button>
            <Typography component={Link} to="/cart" color="inherit">Cart-({selector.length} items) </Typography>
          </Box>
        </Box>

        {/* Right side: Login Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setLoginBtn(loginBtn === "Login" ? "Logout" : "Login")
          }
        >
          {loginBtn}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

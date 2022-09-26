import { AppBar, Box, Button, CssBaseline, Divider, Drawer, GlobalStyles, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import Link from '@mui/material/Link';

import MenuIcon from '@mui/icons-material/Menu';
import { Container } from "@mui/system";

const drawerWidth = 240;

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Link href="/" variant="h6" sx={{ my: 2 }}>LOGO</Link>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Container maxWidth="lg">

          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" variant="h6" color="inherit" noWrap underline="none" sx={{ flexGrow: 1}}>LOGO</Link>
            <Button component={NavLink} to="user/signin" variant="outlined" size="small">
              Sign in
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </React.Fragment>
  );
}

export default Navbar;
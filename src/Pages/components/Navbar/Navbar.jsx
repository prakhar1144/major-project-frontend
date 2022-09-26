import { AppBar, Box, Button, CssBaseline, Divider, Drawer, GlobalStyles, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from "@mui/system";
import { HelpOutline, HomeOutlined, LocationCityOutlined, SettingsOutlined, SupportOutlined } from "@mui/icons-material";
import { auth } from "../../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const drawerWidth = 240;
const navItems = [
  {
    name: 'Home',
    icon: <HomeOutlined fontSize="small" />,
    path: '/'
  },
  {
    name: 'Features',
    icon: <SettingsOutlined fontSize="small" />,
    path: '/features'
  },
  {
    name: 'Nearby Points',
    icon: <LocationCityOutlined fontSize="small" />,
    path: '/nearby-points'
  },
  {
    name: 'Help',
    icon: <HelpOutline fontSize="small" />,
    path: '/help'
  }
];

const Navbar = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItemComponent = () => navItems.map((item, index) => (
    <ListItem key={index} disablePadding>
      <ListItemButton component={NavLink} to={item.path} color="primary">
        {item.icon}<ListItemText primary={item.name} />
      </ListItemButton>
    </ListItem>
  ));

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Downtown Charge
      </Typography>
      <Divider />
      <List>
        {navItemComponent()}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('token');
        navigate('/user/signin');
      })
  }
  //console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, (userdata) => {
      if (userdata) {
        setUser(userdata.toJSON());
      } else {
        console.log("not logged in");
        navigate('/user/signin')
      }
    });
  }, []);

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
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
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Downtown Charge
            </Typography>
            <Box component="nav" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item, index) => {
                return (
                  <Button key={index} component={NavLink} to={item.path}>
                    {item.icon}{item.name}
                  </Button>
                )
              })}
            </Box>
            {user ? (
              <Button onClick={() => handleLogout()} variant="outlined" size="small">
                Sign Out
              </Button>
            ) : (
              <Button component={NavLink} to="user/signin" variant="outlined" size="small">
                Sign in
              </Button>
            )}
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
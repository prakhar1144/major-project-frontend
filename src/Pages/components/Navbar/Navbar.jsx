import { AppBar, Box, Button, CssBaseline, Drawer, GlobalStyles, IconButton, Link, Toolbar } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from "@mui/system";
import { SmartContractContext } from "../../../Context/SmartContract";
import { shortenAddress } from "../../../Utils/addressShortener";

const drawerWidth = 240;

const Navbar = (props) => {
  const { connectWallet, currentAccount } = React.useContext(SmartContractContext);

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

  //console.log(user);
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
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" variant="h6" color="inherit" noWrap underline="none" sx={{ flexGrow: 1 }}>LOGO</Link>
            {/* <Box component="nav" sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item, index) => {
                return (
                  <Button key={index} component={NavLink} to={item.path}>
                    {item.icon}{item.name}
                  </Button>
                )
              })}
            </Box> */}
            {currentAccount ? (
              <Button variant="outlined" size="small">
                {shortenAddress(currentAccount)}
              </Button>
            ) : (
              <Button onClick={() => connectWallet()} variant="outlined" size="small">
                Connect Wallet
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
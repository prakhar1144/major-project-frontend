import { AppBar, Button, CssBaseline, GlobalStyles, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const Homepage = () => {
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
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Downtown Charge
                    </Typography>
                    <nav>
                        <Button component={NavLink} to="#">
                            Features
                        </Button>
                        <Button component={NavLink} to="#">
                            Nearby Points
                        </Button>
                        <Button component={NavLink} to="#">
                            Help
                        </Button>
                    </nav>
                    <Button component={NavLink} to="user/signin" variant="outlined">
                        Sign in
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Homepage;
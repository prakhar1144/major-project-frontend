import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function ProviderDashboard() {
    return (
        <Container sx={{ paddingTop: 2 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography>I'm a Provider</Typography>
                </Grid>
            </Grid>
        </Container>

    );
}
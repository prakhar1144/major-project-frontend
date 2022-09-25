import { ChevronRight } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import Divider from "./components/Navbar/Divider";

const features = [
    {
        name: 'Businesses',
        image: 'business.svg',
        caption: 'Premium EV charging for customers and employees.',
        buttonText: 'Explore Your Options',
        buttonLink: '#'
    },
    {
        name: 'Fleets',
        image: 'fleet.svg',
        caption: 'Intelligent, flexible charging solutions to meet all your fleet needs.',
        buttonText: 'Tell Me More',
        buttonLink: '#'
    },
    {
        name: 'Drivers',
        image: 'drivers.svg',
        caption: 'We make it easy to charge here, there and everywhere.',
        buttonText: 'How It Works',
        buttonLink: '#'
    }
];
const overviewData = [
    {
        title: 'Hundreds of thousands of places to charge',
        subtitle: 'One account to access them in North America and Europe.',
        caption: 'We’re leading the charge. Actually, we started it. You’d think after creating the world’s largest and most open EV charging network we’d be satisfied, but you’d be wrong. The way we see it, there’s still much more we can do—together. Join us in getting all people and goods moving on electricity.',
        image: 'hp_plug.png'
    },
    {
        title: 'We do it all',
        subtitle: '',
        caption: 'We’re the only network with an integrated portfolio of hardware, cloud services and support delivering the smoothest possible experience for all businesses and drivers. When everything works together, EV charging is better for everyone.',
        image: 'hp_bolt.png'
    },
    {
        title: '133 million charges delivered (and counting)',
        subtitle: '',
        caption: 'Networked charging is, and always has been, our sole focus. After more than a decade and millions of charges delivered, we’re still pioneering new ways to make electric mobility the easy choice.',
        image: 'hp_arrow.png'
    }
];
const overViewComponent = overviewData.map((item, index) => (
    <React.Fragment key={index}>
        <Divider />
        <Grid container px={1}>
            <Grid item xs={12} sm={5} order={{ sm: index % 2 === 1 ? 2 : 1 }}>
                <img src={item.image} style={{ width: '100%', height: 'auto' }} alt={item.title} loading="lazy" />
            </Grid>
            <Grid item sx={12} sm={7} order={{ sm: index % 2 === 1 ? 1 : 2 }}>
                <Typography sx={{ color: 'orangered', fontWeight: '200', margin: {
                    sm:'60px 0px 28px 0px',
                    xs:'10px 0px 20px 0px'
                }, fontSize: {
                    sm:'2.25rem',
                    xs:'1.5rem'
                }, lineHeight: '1.1' }}>
                    {item.title}
                </Typography>
                <Typography color="text.secondary" mb={2}>
                    {item.subtitle}
                </Typography>
                <Typography color="text.secondary">
                    {item.caption}
                </Typography>
            </Grid>
        </Grid>
    </React.Fragment>
));
const Banner = (
    <Paper
        sx={{
            backgroundColor: 'grey.800',
            color: '#fff',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center right',
            backgroundImage: 'url(Banner.png)',
            height: '40vh',
            position: 'relative'
        }}
        component="div"
    >
        <img style={{ display: 'none' }} src="Banner.png" alt="banner" />
        <Box
            sx={{
                position: 'absolute',
                top: {
                    xs: '20vh',
                    sm: '15vh'
                },
                bottom: 0,
                right: 0,
                left: {
                    xs: 0,
                    md: '25vw'
                },
                height: {
                    xs: '20vh',
                    sm: '40vh'
                },
                backgroundColor: {
                    xs: 'rgba(0,0,0,.3)',
                    sm: 'rgba(0,0,0,0)'
                },
            }}
        >
            <Box p={1}>
                <Typography component="h1" sx={{ fontWeight: '300', fontSize: { sm: '2.5rem', xs: '1.5rem' } }} color="inherit" gutterBottom>
                    Comprehensive Charging for <br />Any Fleet
                </Typography>
                <Typography variant="h6" color="inherit" component={Link} to="/features" sx={{ textDecoration: 'none' }}>
                    Meet our new solution <ChevronRight />
                </Typography>
            </Box>
        </Box>
    </Paper>
);
const featuresComponent = features.map((item, index) => {
    return (
        <Grid item sm={4} key={index}>
            <Card sx={{ textAlign: 'center', boxShadow: 'none' }}>
                <Box
                    sx={{
                        background: 'no-repeat center bottom',
                        width: '100 %',
                        height: '132px',
                        marginBottom: '20px',
                        backgroundImage: `url(${item.image})`
                    }}
                />
                <CardContent>
                    <Typography variant="h5" color="orangered" gutterBottom>
                        {item.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {item.caption}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button size="small" sx={{ backgroundColor: 'orangered', color: 'white', borderRadius: '20px', px: 2 }} component={Link} to={item.buttonLink}>{item.buttonText}</Button>
                </CardActions>
            </Card>
        </Grid>
    )
});

const HomePage = (props) => {
    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    {Banner}
                </Grid>
            </Grid>
            <Container maxWidth="lg">
                <Grid container spacing={4} px={1} py={5}>
                    {featuresComponent}
                </Grid>
                {overViewComponent}
            </Container>
        </>
    );
};
export default HomePage;
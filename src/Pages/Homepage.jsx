import { Button, Card, CardActions, CardContent, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import Divider from "./components/Navbar/Divider";

const features = [
    {
        name: 'Chargers Nearby',
        image: 'business.svg',
        caption: 'Search for nearby charging outlets.',
        buttonText: 'Explore Your Options',
        buttonLink: '/nearby'
    },
    {
        name: 'Charge',
        image: 'fleet.svg',
        caption: 'Charge the car and make a payment.',
        buttonText: 'Charge my vehicle',
        buttonLink: '/customer-dashboard'
    },
    {
        name: 'Provider',
        image: 'drivers.svg',
        caption: 'Register as a provider and reap the benefits.',
        buttonText: 'Register',
        buttonLink: '/provider-dashboard'
    }
];
const overviewData = [
    {
        title: 'Hundreds of unplanned places to charge',
        subtitle: 'One solution to utlize them efficiently',
        caption: "We're striving to create a blockchain-based solution to revolutionise the EV Charging market by maximising the use of existing charging stations as opposed to installing centralised charging stations on a large scale.",
        image: 'hp_plug.png'
    },
    {
        title: 'Beneficial for all',
        subtitle: 'Benefits accrue to consumers, providers, and everyone else',
        caption: 'Consumers will no longer need to precalculate distance before travelling, suppliers will be able to utilise their outlets during off-peak hours, and a key barrier to the widespread adoption of electric vehicles will be removed.',
        image: 'hp_bolt.png'
    },
    {
        title: 'Community Driven',
        subtitle: 'Blockchain technology ensures decentralisation, security, and transparency.',
        caption: 'We are eliminating the issue connected with the centralised model in which power trade will not be transparent and equitable, resulting in the collapse of the entire system.',
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
                <Typography sx={{
                    color: 'orangered', fontWeight: '200', margin: {
                        sm: '60px 0px 28px 0px',
                        xs: '10px 0px 20px 0px'
                    }, fontSize: {
                        sm: '2.25rem',
                        xs: '1.5rem'
                    }, lineHeight: '1.1'
                }}>
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
            <Box py={8}>
                <Typography component="h1" sx={{ fontWeight: '300', fontSize: { sm: '2.5rem', xs: '1.5rem' } }} color="inherit">
                    Major Project - I
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
                <Grid container spacing={4} px={1} my={18}>
                    {featuresComponent}
                </Grid>
                <Box mt={32} mb={10}>
                    {overViewComponent}
                </Box>

            </Container>
        </>
    );
};
export default HomePage;
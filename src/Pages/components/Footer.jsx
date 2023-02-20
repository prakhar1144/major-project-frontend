import { Paper, Typography } from '@mui/material';

const Footer = () => (
  <Paper variant="outlined" square sx={{ paddingY: '2vh' }}>
    <Typography align="center" variant="overline" component="div" sx={{ fontWeight: 'bold' }}>
      MAJOR PROJECT - 2022
    </Typography>
  </Paper>
);

export default Footer;

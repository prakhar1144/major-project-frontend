import { Box } from '@mui/material';

export default function Divider() {
  return (
    <Box
      sx={{
        width: '100 %',
        height: '10px',
        background: 'url(dashbolt-keyline.svg) center no-repeat',
        border: 0,
        backgroundSize: 'contain'
      }}
    />
  );
}

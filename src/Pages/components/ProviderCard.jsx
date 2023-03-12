import { Card, CardContent, Typography } from '@mui/material';
import { ethers } from 'ethers';

const ProviderCard = (props) => {
  const { providerInfo, rate } = props;
  return (
    providerInfo && (
      <Card
        sx={{
          height: 'auto',
          margin: '0 auto',
          width: '100%',
          backgroundColor: 'transparent',
          color: 'white'
        }}
        elevation={0}
      >
        <CardContent>
          <Typography variant="body2">
            <strong>Rate: </strong>₹ {rate}
            {/* (ethers.utils.formatEther(providerInfo.rate) * 1000000000000000000).toFixed(2) */}
          </Typography>
          <Typography variant="body2">
            <strong>Location: </strong>
            {providerInfo.location}
          </Typography>
          <Typography variant="body2">
            <strong>Port Type: </strong>
            {ethers.utils.formatEther(providerInfo.availableChargingPorts) * 1000000000000000000}
          </Typography>
          <Typography variant="body2">
            <strong>Total Power Supplied: </strong>
            {(ethers.utils.formatEther(providerInfo.supplied) * 1000000000000000000).toFixed(4)} U
          </Typography>
        </CardContent>
      </Card>
    )
  );
};
export default ProviderCard;

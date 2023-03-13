import { Container, Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SmartContractContext } from '../Context/SmartContract';
import shortenAddress from '../Utils/addressShortener';
import QRGenerator from './QRGenerator';
import QRScanner from './QRScanner';
import { BigNumber } from 'ethers';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 2
};
const AddProviderForm = ({
  open,
  handleClose,
  addProviderData,
  handleChange,
  submit,
  currentAccount,
  handleDownload,
  isProviderConfirmed
}) => (
  <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <form onSubmit={submit}>
      <Box sx={style}>
        {!isProviderConfirmed ? (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Fill out this form to become a provider
            </Typography>
            <Box sx={{ p: 1 }}>
              <TextField
                required
                id="outlined-basic"
                label="Wallet Address"
                variant="outlined"
                value={shortenAddress(currentAccount)}
                size="small"
                fullWidth
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <TextField
                required
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={addProviderData.name}
                size="small"
                fullWidth
                type="text"
                name="name"
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <TextField
                required
                id="outlined-basic"
                label="Rate"
                variant="outlined"
                value={addProviderData.rate}
                size="small"
                fullWidth
                type="number"
                name="rate"
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <TextField
                required
                id="outlined-basic"
                label="Location"
                variant="outlined"
                value={addProviderData.location}
                size="small"
                fullWidth
                name="location"
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <TextField
                type="number"
                required
                id="outlined-basic"
                label="Connector Type"
                variant="outlined"
                value={addProviderData.connectorType}
                size="small"
                fullWidth
                name="connectorType"
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ p: 1 }}>
              <Button fullWidth type="submit" variant="outlined">
                Submit
              </Button>
            </Box>
          </>
        ) : (
          <>
            <QRGenerator
              value={`${addProviderData.rate},${addProviderData.name},${addProviderData.location},${currentAccount},${addProviderData.connectorType}`}
            />
            <Button fullWidth variant="contained" color="success" onClick={() => handleDownload()}>
              Download QR
            </Button>
          </>
        )}
      </Box>
    </form>
  </Modal>
);

const ChargeForm = ({ open, handleClose, chargeData, handleChange, submit, totalPrice, scannerData, handleScan }) => (
  <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
    <Box sx={style}>
      {scannerData === null ? (
        <QRScanner handleScan={handleScan} />
      ) : (
        <form onSubmit={submit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Charge my Vehicle
          </Typography>
          <Box sx={{ p: 1 }}>
            <TextField
              required
              id="outlined-basic"
              label="Provider's Name"
              variant="outlined"
              value={chargeData.name}
              size="small"
              fullWidth
            />
          </Box>
          <Box sx={{ p: 1 }}>
            <TextField
              required
              id="outlined-basic"
              label="Provider's Wallet Address"
              variant="outlined"
              value={shortenAddress(chargeData.providerWalletAddress)}
              size="small"
              fullWidth
            />
          </Box>
          <Box sx={{ p: 1 }}>
            <TextField
              required
              id="outlined-basic"
              label="Rate"
              variant="outlined"
              value={chargeData.rate}
              size="small"
              fullWidth
              type="number"
            />
          </Box>
          <Box sx={{ p: 1 }}>
            <TextField
              required
              id="outlined-basic"
              label="Provider's Location"
              variant="outlined"
              value={chargeData.location}
              size="small"
              fullWidth
            />
          </Box>
          <Box sx={{ p: 1 }}>
            <TextField
              required
              id="outlined-basic"
              label="Connector Type"
              variant="outlined"
              value={chargeData.connectorType}
              size="small"
              fullWidth
              type="number"
            />
          </Box>
          <Box sx={{ p: 1 }}>
            <TextField
              required
              id="outlined-basic"
              label="Required Percent (%)"
              variant="outlined"
              value={chargeData.requiredPercent}
              size="small"
              fullWidth
              name="requiredPercent"
              onChange={handleChange}
              type="number"
            />
          </Box>
          <Box sx={{ p: 1 }}>
            <Button fullWidth type="submit" variant="contained">
              Pay {chargeData.totalPrice} MATIC
            </Button>
          </Box>
        </form>
      )}
    </Box>
  </Modal>
);

export default function CustomerDashboard() {
  const [scannerData, setScannerData] = useState(null);

  const { currentAccount, addProvider, payAmount, getConsumerData, getProviderData, isProviderConfirmed } =
    React.useContext(SmartContractContext);

  const initialProviderData = {
    name: '',
    rate: '',
    location: '',
    connectorType: ''
  };
  const initialChargeData = {
    rate: '',
    location: '',
    providerWalletAddress: '',
    connectorType: '',
    name: '',
    requiredPercent: '0',
    totalPrice: '0'
  };
  const [chargeData, setChargeData] = useState(initialChargeData);

  const [addProviderData, setAddProviderData] = useState(initialProviderData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);

  const handleAddCloseModal = () => {
    setIsAddModalOpen(false);
    setAddProviderData(initialProviderData);
  };
  const handleChargeCloseModal = () => {
    setIsChargeModalOpen(false);
    setScannerData(null);
    setChargeData(initialChargeData);
  };
  const handleChangeAddProvider = (e) => {
    setAddProviderData({
      ...addProviderData,
      [e.target.name]: e.target.value
    });
  };
  const handleChangePercent = (e) => {
    const temp = e.target.value >= 0 && e.target.value <= 100 ? e.target.value : chargeData.requiredPercent;
    setChargeData({
      ...chargeData,
      requiredPercent: temp === '' ? 0 : temp,
      totalPrice: ((parseFloat(chargeData.rate) * parseFloat(temp === '' ? 0 : temp)) / 3000.0).toFixed(10)
    });
  };
  const submitAddProvider = (e) => {
    e.preventDefault();
    // console.log(addProviderData);
    addProvider(addProviderData.name, addProviderData.rate, addProviderData.location, addProviderData.connectorType);
  };
  const submitChargeData = (e) => {
    e.preventDefault();
    // console.log(chargeData);
    payAmount(chargeData.totalPrice, chargeData.requiredPercent, chargeData.providerWalletAddress, Date.now());
    // handleChargeCloseModal();
  };
  const handleScan = (data) => {
    // console.log(data);
    if (data) {
      setScannerData(data.text);
      const providerInfo = data.text.split(',');
      setChargeData({
        ...chargeData,
        rate: providerInfo[0],
        name: providerInfo[1],
        location: `${providerInfo[2]},${providerInfo[3]}`,
        providerWalletAddress: providerInfo[4],
        connectorType: providerInfo[5] ? providerInfo[5] : '1'
      });
    }
  };
  const onClickDownload = () => {
    const svg = document.getElementById('QRCode');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/jpeg');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR-${Date.now()}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  useEffect(() => {
    const fun = async () => {
      // const data = await getConsumerData();
      // // console.log(data);
      // console.log(BigNumber.from(data.consumed).toString());
    };
    if (currentAccount) fun();
  }, [currentAccount]);

  return (
    <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={() => setIsAddModalOpen(true)} variant="contained">
              Become a Provider
            </Button>
            <Button onClick={() => setIsChargeModalOpen(true)} variant="contained" color="success">
              Charge your vehicle
            </Button>
          </Box>
          <AddProviderForm
            open={isAddModalOpen}
            addProviderData={addProviderData}
            handleChange={handleChangeAddProvider}
            handleClose={handleAddCloseModal}
            submit={submitAddProvider}
            currentAccount={currentAccount}
            handleDownload={onClickDownload}
            isProviderConfirmed={isProviderConfirmed}
          />
          <ChargeForm
            open={isChargeModalOpen}
            handleClose={handleChargeCloseModal}
            chargeData={chargeData}
            handleChange={handleChangePercent}
            submit={submitChargeData}
            setChargeData={setChargeData}
            handleScan={handleScan}
            scannerData={scannerData}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Realtime Battery Charging Status</Typography>
          <iframe
            title="rtsoc"
            width="450"
            height="260"
            style={{ border: '1px solid #cccccc' }}
            src="https://thingspeak.com/channels/1977413/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"
          />
        </Grid>
        <Grid item xs={12} md={6} />
      </Grid>
    </Container>
  );
}

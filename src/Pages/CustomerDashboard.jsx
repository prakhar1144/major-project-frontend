import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { SmartContractContext } from "../Context/SmartContract";
import { shortenAddress } from "../Utils/addressShortener";
import QRScanner from './QRScanner';
import { BigNumber } from "ethers";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 2,
};
const AddProviderForm = ({ open, handleClose, addProviderData, handleChange, submit, currentAccount }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={submit}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Fill out this form to become a provider
                    </Typography>
                    <Box sx={{ p: 1 }}>
                        <TextField required id="outlined-basic" label="Wallet Address" variant="outlined" value={shortenAddress(currentAccount)} size="small" fullWidth />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField required id="outlined-basic" label="Rate" variant="outlined" value={addProviderData.rate} size="small" fullWidth type="number" name="rate" onChange={handleChange} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField required id="outlined-basic" label="Location" variant="outlined" value={addProviderData.location} size="small" fullWidth name="location" onChange={handleChange} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <TextField type="number" required id="outlined-basic" label="Connector Type" variant="outlined" value={addProviderData.connectorType} size="small" fullWidth name="connectorType" onChange={handleChange} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Button fullWidth type="submit" variant="outlined">Save</Button>
                    </Box>
                </Box>
            </form>
        </Modal>
    )
};

const ChargeForm = ({ open, handleClose, chargeData, handleChange, submit, totalPrice, scannerData, handleScan }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                {scannerData === null ? (
                    <QRScanner handleScan={handleScan} />
                ) : (
                    <form onSubmit={submit}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Charge my Vehicle
                        </Typography>
                        <Box sx={{ p: 1 }}>
                            <TextField required id="outlined-basic" label="Provider's Name" variant="outlined" value={chargeData.name} size="small" fullWidth />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <TextField required id="outlined-basic" label="Provider's Wallet Address" variant="outlined" value={shortenAddress(chargeData.providerWalletAddress)} size="small" fullWidth />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <TextField required id="outlined-basic" label="Rate" variant="outlined" value={chargeData.rate} size="small" fullWidth type="number" />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <TextField required id="outlined-basic" label="Provider's Location" variant="outlined" value={chargeData.location} size="small" fullWidth />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <TextField required id="outlined-basic" label="Connector Type" variant="outlined" value={chargeData.connectorType} size="small" fullWidth type="number" />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <TextField required id="outlined-basic" label="Required Percent (%)" variant="outlined" value={chargeData.requiredPercent} size="small" fullWidth name="requiredPercent" onChange={handleChange} type="number" />
                        </Box>
                        <Box sx={{ p: 1 }}>
                            <Button fullWidth type="submit" variant="contained">Pay {chargeData.totalPrice} MATIC</Button>
                        </Box>
                    </form>
                )}
            </Box>
        </Modal >
    );
};

export default function CustomerDashboard() {
    const [scannerData, setScannerData] = useState(null);

    const { currentAccount, addProvider, payAmount, getConsumerData } = React.useContext(SmartContractContext);

    const initialProviderData = {
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
        let temp = e.target.value >= 0 && e.target.value <= 100 ? e.target.value : chargeData.requiredPercent;
        setChargeData({
            ...chargeData,
            requiredPercent: temp === '' ? 0 : temp,
            totalPrice: ((parseFloat(chargeData.rate) * parseFloat(temp === '' ? 0 : temp)) / 300.0).toFixed(10)
        });
    };
    const submitAddProvider = (e) => {
        e.preventDefault();
        //console.log(addProviderData);
        addProvider(addProviderData.rate, addProviderData.location, addProviderData.connectorType);
        handleAddCloseModal();
        setAddProviderData(initialProviderData);
    };
    const submitChargeData = (e) => {
        e.preventDefault();
        //console.log(chargeData);
        payAmount(chargeData.totalPrice, chargeData.requiredPercent, chargeData.providerWalletAddress, Date.now());
        handleChargeCloseModal();
        setChargeData(initialChargeData);
    };
    const handleScan = (data) => {
        //console.log(data);
        if (data) {
            setScannerData(data.text);
            let providerInfo = data.text.split(',');
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

    useEffect(() => {
        const fun = async () => {
            const data = await getConsumerData();
            console.log(data.addr);
            console.log(BigNumber.from(data.consumed).toString());
        };
        if (currentAccount) fun();
    }, [currentAccount]);
    return (
        <Container sx={{ paddingTop: 2, paddingBottom: 2 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={() => setIsAddModalOpen(true)} variant="contained">Become a Provider</Button>
                        <Button onClick={() => setIsChargeModalOpen(true)} variant="contained" color="success">Charge your vehicle</Button>
                    </Box>
                    <AddProviderForm open={isAddModalOpen} addProviderData={addProviderData} handleChange={handleChangeAddProvider} handleClose={handleAddCloseModal} submit={submitAddProvider} currentAccount={currentAccount} />
                    <ChargeForm open={isChargeModalOpen} handleClose={handleChargeCloseModal} chargeData={chargeData} handleChange={handleChangePercent} submit={submitChargeData} setChargeData={setChargeData} handleScan={handleScan} scannerData={scannerData} />
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </Container>

    );
}
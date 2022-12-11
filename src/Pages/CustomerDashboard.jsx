import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import { SmartContractContext } from "../Context/SmartContract";
import { shortenAddress } from "../Utils/addressShortener";
import { ethers } from 'ethers';
import QRScanner from './QRScanner';

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

const ChargeForm = ({ open, handleClose, chargeData, handleChange, submit, totalPrice }) => {
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
                        <Button fullWidth type="submit" variant="contained">Pay {chargeData.totalPrice}</Button>
                    </Box>
                </Box>
            </form>
        </Modal >
    );
};

export default function CustomerDashboard() {
    const [scannerData, setScannerData] = useState(null);

    const { currentAccount, addProvider, payAmount } = React.useContext(SmartContractContext);
    const initialProviderData = {
        rate: '',
        location: '',
        connectorType: ''
    };
    const [chargeData, setChargeData] = useState({
        rate: '9',
        location: 'Hamirpur Bus Stand',
        providerWalletAddress: '0x336Fa634e585077B5c6866FFE2d61C0fF6c62D69',
        connectorType: '2',
        name: 'Moris Chriss',
        requiredPercent: '0',
        totalPrice: '0'
    });

    const [addProviderData, setAddProviderData] = useState(initialProviderData);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);

    const handleAddCloseModal = () => {
        setIsAddModalOpen(false);
    };
    const handleChargeCloseModal = () => {
        setIsChargeModalOpen(false);
    };
    const handleChangeAddProvider = (e) => {
        setAddProviderData({
            ...addProviderData,
            [e.target.name]: e.target.value
        });
    };
    const handleChangeChargeData = (e) => {
        setChargeData({
            ...chargeData,
            requiredPercent: e.target.value,
            totalPrice: ((parseFloat(chargeData.rate) * parseFloat(e.target.value)) / 300.0).toFixed(10)
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
        setChargeData({
            rate: '9',
            location: 'Hamirpur Bus Stand',
            providerWalletAddress: '0x336Fa634e585077B5c6866FFE2d61C0fF6c62D69',
            connectorType: '2',
            name: 'Moris Chriss',
            requiredPercent: '0',
            totalPrice: '0'
        });
    };
    const handleScan = (data) => {
        console.log(data);
        if (data) {
            setScannerData(data.text);
            setIsChargeModalOpen(true);
        }
    };

    console.log(scannerData);
    return (
        <Container sx={{ paddingTop: 2 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ p: 1 }} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={() => setIsAddModalOpen(true)} variant="contained">Add Provider</Button>
                        <Button onClick={() => setIsChargeModalOpen(true)} variant="contained" color="success">Charge</Button>
                    </Box>
                    <AddProviderForm open={isAddModalOpen} addProviderData={addProviderData} handleChange={handleChangeAddProvider} handleClose={handleAddCloseModal} submit={submitAddProvider} currentAccount={currentAccount} />
                    <ChargeForm open={isChargeModalOpen} handleClose={handleChargeCloseModal} chargeData={chargeData} handleChange={handleChangeChargeData} submit={submitChargeData} currentAccount={currentAccount} />
                </Grid>
                {scannerData === null && <QRScanner setData={setScannerData} handleScan={handleScan} />}
            </Grid>
        </Container>

    );
}
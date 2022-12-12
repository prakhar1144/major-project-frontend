import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { BigNumber, ethers } from "ethers";
import React, { useEffect } from "react";
import { useState } from "react";
import { SmartContractContext } from "../Context/SmartContract";

export default function ProviderDashboard() {
    const { currentAccount, getProviderData } = React.useContext(SmartContractContext);

    const [providerInfo, setProviderInfo] = useState(null);

    useEffect(() => {
        const fun = async () => {
            const data = await getProviderData();
            console.log(data);
            setProviderInfo(data);
            //console.log(BigNumber.from(data.consumed).toString());
        };
        if (currentAccount) fun();
    }, [currentAccount]);
    return (
        <Container sx={{ paddingTop: 2 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant="h5">Provider Dashboard</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 400, width: "100%" }}>

                    </div>
                    {providerInfo && <Card sx={{ minWidth: 275, height: 'auto', margin: '0 auto', maxWidth: 400, width: '100%' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                My EV Charging Station
                            </Typography>
                            <Typography><strong>Rate: </strong>{ethers.utils.formatEther(providerInfo.rate) * 1000000000000000000}</Typography>
                            <Typography><strong>Location: </strong>{providerInfo.location}</Typography>
                            <Typography><strong>Port Type: </strong>{ethers.utils.formatEther(providerInfo.availableChargingPorts) * 1000000000000000000}</Typography>
                            <Typography><strong>Total Power Supplied: </strong>{ethers.utils.formatEther(providerInfo.supplied) * 1000000000000000000} U</Typography>
                        </CardContent>
                    </Card>}
                </Grid>
            </Grid>
        </Container>

    );
}
import { Container } from "@mui/material";
const NearbyStation = () => {
    return (
        <>
            <Container maxWidth="sm">
                <iframe title="nearby_charging_stations" src="https://www.google.com/maps/d/u/0/embed?mid=1y4_hgDCpK0rKgTD9VFtdoqHV3wol_F4&ehbc=2E312F" width="640" height="480"></iframe>
            </Container>
        </>
    );
}

export default NearbyStation;
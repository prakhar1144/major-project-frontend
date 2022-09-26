import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from "axios";

const columns = [
    { field: 'Name', headerName: 'Name', flex: 2, headerAlign: 'center' },
    { field: 'Connector_Type', headerName: 'Connector Type', flex: 2, headerAlign: 'center', align: 'center'},
    { field: 'Status', headerName: 'Status', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'Rate', headerName: 'Rate', description: 'Rs. per minute', flex: 1, headerAlign: 'center', align: 'center'},
    { field: 'Free_Connector_Count', headerName: 'Free Connector Count', flex: 1, headerAlign: 'center', align: 'center' },
];

const NearbyStation = () => {

    const [rows, setrows] = useState([]);
    const [pageSize, setPageSize] = React.useState(10);

    const getNearbyData = () => {

        var url = "https://sheets.googleapis.com/v4/spreadsheets/1Wy-y0_h53ioFGRyv_1bu87dotUOOkRenBrM5Re4MuAY/values/A:G?key=AIzaSyBWkq8DAo4pLZWIGCyGVvZFfTArgf7FbVQ";
        axios.get(url).then((response) => {
            // console.log(response.data);

            let temp_rows = response.data.values.map((item, index) => {
                console.log(typeof (index))
                if (index > 0) {
                    let obj = { id: index, 'Name': item[0], 'Connector_Type': item[3], 'Status': item[4], 'Rate': parseInt(item[5], 10), 'Free_Connector_Count': parseInt(item[6], 10) }

                    return obj;
                }
                return {};
            })
            // console.log(rows)
            temp_rows = temp_rows.slice(1)
            setrows(temp_rows);
        })
            .catch(function (error) {
                console.log(error);
            })


    }

    useEffect(() => {
        getNearbyData();
    }, [])

    return (
        <>
            <iframe title="nearby_charging_stations" src="https://www.google.com/maps/d/u/0/embed?mid=1y4_hgDCpK0rKgTD9VFtdoqHV3wol_F4&ehbc=2E312F" width="100%" height="480"></iframe>
            <br></br>
            <Container maxWidth="xl">
                <DataGrid
                    pageSize={pageSize}
                    onPageSizeChange={(newPage) => setPageSize(newPage)}
                    pagination 
                    autoHeight rows={rows} columns={columns} />
            </Container>
            
        </>
    );
}

export default NearbyStation;








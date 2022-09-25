import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect,useState } from 'react';
import axios from "axios";

const columns = [
    { field: 'Name', headerName: 'Name', width: 150 },
    { field: 'Connector_Type', headerName: 'Connector_Type', width: 150 },
    { field: 'Status', headerName: 'Status', width: 150 },
    { field: 'Rate', headerName: 'Rate', width: 250 },
    { field: 'Free_Connector_Count', headerName: 'Free_Connector_Count', width: 150 },
];


const NearbyStation = () => {

    const [rows, setrows] = useState([]);

    const getNearbyData =  ()=> {
 
        var url = "https://sheets.googleapis.com/v4/spreadsheets/1Wy-y0_h53ioFGRyv_1bu87dotUOOkRenBrM5Re4MuAY/values/A:G?key=AIzaSyBWkq8DAo4pLZWIGCyGVvZFfTArgf7FbVQ";
        axios.get(url).then((response) => {
            console.log(response.data);
            let headers = response.data.values[0];
            headers.map((item)=> {
                let obj = {'field': item, headerName: item, width: 150};
                columns.push(obj);
            })
    
            let temp_rows = response.data.values.map((item, index)=> {
                console.log(typeof(index))
                if(index > 0)
                {
                    let obj = {id: index, 'Name': item[0], 'Connector_Type': item[3], 'Status': item[4], 'Rate': parseInt(item[5], 10), 'Free_Connector_Count':  parseInt(item[6],10)}
                    
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
    console.log(rows);
    return (
        <>
            {/* <iframe title="nearby_charging_stations" src="https://www.google.com/maps/d/u/0/embed?mid=1y4_hgDCpK0rKgTD9VFtdoqHV3wol_F4&ehbc=2E312F" width="640" height="480"></iframe> */}
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid rows={rows} columns={columns} />
            </div>
        </>
    );
}

export default NearbyStation;








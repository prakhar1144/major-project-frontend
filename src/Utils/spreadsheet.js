import axios from 'axios';

const spreadsheetRow = {
  Name: '',
  Long: '',
  Lat: '',
  Connector_Type: '',
  Status: 'Yes',
  Rate: '0',
  Margin: ''
};
const appendSpreadsheet = async (_name, _margin, _location, _availableChargingPorts) => {
  const longLat = _location.split(',');
  spreadsheetRow.Name = _name;
  spreadsheetRow.Long = longLat[0];
  spreadsheetRow.Lat = longLat[1];
  spreadsheetRow.Connector_Type = _availableChargingPorts;
  spreadsheetRow.Margin = _margin;
  axios.post('https://sheet.best/api/sheets/b1164498-64fa-47d0-992e-37ccddf4a578', spreadsheetRow).then((response) => {
    console.log(response);
  });
};

export const updateSpreadsheet = async (_name, _margin, _rate) => {
  const rowJson = {
    Margin: _margin,
    Rate: _rate
  };
  axios.patch(`https://sheet.best/api/sheets/b1164498-64fa-47d0-992e-37ccddf4a578/Name/${_name}`, rowJson).then((response) => {
    console.log(response);
  });
};

export default appendSpreadsheet;

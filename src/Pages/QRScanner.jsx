import React from 'react'
import QrReader from 'react-qr-scanner'
const previewStyle = {
    height: 350,
    width: 350,
}
const QRScanner = ({ handleScan }) => {
    const handleError = (err) => {
        console.error(err)
    };
    return (
        <QrReader
            delay={500}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
        />
    )
}
export default QRScanner;
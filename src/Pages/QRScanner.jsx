import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'
const previewStyle = {
    height: 320,
    width: 320,
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
import React from "react";
import QRCode from "react-qr-code";

const QRGenerator = ({ value }) => {
    return (
        <div style={{ height: "auto", margin: "0 auto", maxWidth: 340, width: "100%" }}>
            <QRCode
                id="QRCode"
                size={512}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={value}
                viewBox={`0 0 512 512`}
            />
        </div>
    );
};
export default QRGenerator;
"use client"
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const RandomQRPage = () => {
    const [qrValue, setQrValue] = useState('');

    useEffect(() => {
        const generateRandomQR = () => {
            const leftSide = Math.floor(1000 + Math.random() * 9000);
            const rightSide = Math.floor(1000 + Math.random() * 9000);
            return `${leftSide}-${rightSide}`;
        };

        const intervalId = setInterval(() => {
            setQrValue(generateRandomQR());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Random QR Code Generator</h1>
            {qrValue && (
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <QRCode value={qrValue} size={256} />
                    <p className="mt-4 text-center text-xl font-semibold">{qrValue}</p>
                </div>
            )}
        </div>
    );
};

export default RandomQRPage;
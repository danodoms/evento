"use client"
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';

const RandomQRPage = () => {
    const [qrValue, setQrValue] = useState('');
    const [updateInterval, setUpdateInterval] = useState(1000);

    useEffect(() => {
        const generateRandomQR = () => {
            const leftSide = Math.floor(1000 + Math.random() * 9000);
            const rightSide = Math.floor(1000 + Math.random() * 9000);
            return `${leftSide}-${rightSide}`;
        };

        const intervalId = setInterval(() => {
            setQrValue(generateRandomQR());
        }, updateInterval);

        return () => clearInterval(intervalId);
    }, [updateInterval]);

    const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setUpdateInterval(value >= 100 ? value : 100); // Minimum 100ms to prevent too rapid updates
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <h1 className="text-3xl font-bold mb-8">Random QR Code Generator</h1>
            <div className="mb-6 flex items-center ">
                <label htmlFor="updateInterval" className="mr-3">Update Interval (ms):</label>
                <input
                    type="number"
                    id="updateInterval"
                    value={updateInterval}
                    onChange={handleIntervalChange}
                    className="border rounded px-2 py-1 w-24"
                    min="100"
                />
            </div>
            {qrValue && (
                <div className="p-8 rounded-lg shadow-md bg-white">
                    <QRCode value={qrValue} size={256} />
                    <p className="mt-4 text-center text-xl font-semibold">{qrValue}</p>
                </div>
            )}
        </div>
    );
};

export default RandomQRPage;
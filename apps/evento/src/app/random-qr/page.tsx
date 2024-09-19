"use client"

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { faker } from "@faker-js/faker"

const RandomQRPage = () => {
    const [qrValue, setQrValue] = useState('');
    const [updateInterval, setUpdateInterval] = useState(1000);
    const [studentCount, setStudentCount] = useState(1000);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [customYear, setCustomYear] = useState(2010);

    useEffect(() => {
        const generateRandomQR = () => {
            const deptId = Math.floor(Math.random() * 4) + 1; // Generates a number from 1 to 4
            const rightSide = 1000 + (currentStudentIndex % studentCount);
            setCurrentStudentIndex((prevIndex) => (prevIndex + 1) % studentCount);
            return `${customYear}-${rightSide},${faker.person.firstName()},${faker.person.lastName()},${deptId}`;
        };

        const intervalId = setInterval(() => {
            setQrValue(generateRandomQR());
        }, updateInterval);

        return () => clearInterval(intervalId);
    }, [updateInterval, studentCount, currentStudentIndex, customYear]);

    const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setUpdateInterval(value >= 100 ? value : 100); // Minimum 100ms to prevent too rapid updates
    };

    const handleStudentCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setStudentCount(value > 0 ? value : 1); // Ensure at least 1 student
        setCurrentStudentIndex(0); // Reset the index when count changes
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setCustomYear(value > 0 ? value : 1); // Ensure positive year
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
            <h1 className="text-3xl font-bold mb-8">Random QR Code Generator</h1>
            <div className="mb-6 flex flex-col items-center space-y-4">
                <div className="flex items-center">
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
                <div className="flex items-center">
                    <label htmlFor="studentCount" className="mr-3">Number of Students:</label>
                    <input
                        type="number"
                        id="studentCount"
                        value={studentCount}
                        onChange={handleStudentCountChange}
                        className="border rounded px-2 py-1 w-24"
                        min="1"
                    />
                </div>
                <div className="flex items-center">
                    <label htmlFor="customYear" className="mr-3">Custom Year:</label>
                    <input
                        type="number"
                        id="customYear"
                        value={customYear}
                        onChange={handleYearChange}
                        className="border rounded px-2 py-1 w-24"
                        min="1"
                    />
                </div>
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
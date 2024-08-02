"use client"

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
    const [name, setName] = useState('');
    const [schoolId, setSchoolId] = useState('');
    const [department, setDepartment] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
        generateQRCode();
    }, [name, schoolId, department]);

    const generateQRCode = async () => {
        try {
            const data = `Name: ${name}\nSchool ID: ${schoolId}\nDepartment: ${department}`;
            const url = await QRCode.toDataURL(data, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff',
                },
            });
            setQrCodeUrl(url);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const downloadQRCode = () => {
        const link = document.createElement('a');
        link.href = qrCodeUrl;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">QR Code Generator</h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        placeholder="School ID"
                        value={schoolId}
                        onChange={(e) => setSchoolId(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mt-6 flex justify-center">
                    {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
                </div>
                <button
                    onClick={downloadQRCode}
                    className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                >
                    Download QR Code
                </button>
            </div>
        </div>
    );
};

export default QRCodeGenerator;
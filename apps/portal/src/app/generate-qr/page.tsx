"use client"

import { Card } from "@/components/ui/card"

import React, { useState } from 'react';
import QRCode from 'qrcode';
import { UserRound } from "lucide-react";

const QRCodeGenerator = () => {



    const [formData, setFormData] = useState({
        name: '',
        schoolId: '',
        department: '',
    });
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const generateQRCode = async () => {
        try {
            const data = `Name: ${formData.name}\nSchool ID: ${formData.schoolId}\nDepartment: ${formData.department}`;
            const url = await QRCode.toDataURL(data, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff',
                },
            });
            setQrCodeUrl(url);
            setIsFormSubmitted(true);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        generateQRCode();
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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            {!isFormSubmitted ? (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-center">evento</h1>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <input
                            type="text"
                            name="schoolId"
                            placeholder="School ID"
                            value={formData.schoolId}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Generate QR Code
                    </button>
                </form>
            ) : (
                <div>
                    <Card className="w-full max-w-md p-6 grid gap-6 rounded-lg shadow-lg mb-4">
                        <div className="flex items-center gap-6">
                            <UserRound />
                            <div className="grid gap-1">
                                <h3 className="text-xl font-bold text-primary">John Doe</h3>
                                <p className="text-muted-foreground font-medium">Software Engineer</p>
                            </div>
                        </div>
                        <div className="grid gap-4">
                            {/* <div className="flex items-center justify-between border-b border-muted pb-2">
                                <span className="text-muted-foreground font-medium">ID Number:</span>
                                <span className="font-medium">123456789</span>
                            </div> */}

                            <h1 className="text-2xl font-bold mb-2 text-center">2021-3439</h1>
                            <div className="flex justify-center rounded-md mb-6">
                                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
                            </div>
                        </div>
                    </Card>



                    <button
                        onClick={downloadQRCode}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        Download QR Code
                    </button>
                    <button
                        onClick={() => setIsFormSubmitted(false)}
                        className="mt-4 w-full bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                    >
                        Generate Another QR Code
                    </button>


                </div>


            )}
        </div>
    );
};

export default QRCodeGenerator;
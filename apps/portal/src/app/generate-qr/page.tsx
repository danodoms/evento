"use client"

import { Card } from "@/components/ui/card"

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { ArrowDownToLine, BadgeCheck, CircleUserRound, QrCode, RotateCw, Scan, UserRound, UserRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Vortex } from "@/components/ui/vortex";
import { IdForm } from "@/components/IdForm";
import { getDeptNameById, getDeptShortNameById } from "@/departments";
import html2canvas from 'html2canvas'; // Import html2canvas







const QRCodeGenerator = () => {



    const [qrCodeUrl, setQrCodeUrl] = useState('');

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [id, setId] = useState("")
    const [dept, setDept] = useState("")

    // const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    //     const { name, value } = e.target;
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    const generateQRCode = async () => {
        try {
            console.log
            const data = id + "," + firstName + "," + lastName + "," + dept;
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

    useEffect(() => {
        generateQRCode()
    }, [id])


    // const onSubmit = () => {
    //     generateQRCode()
    // }



    // const downloadQRCode = () => {
    //     const link = document.createElement('a');
    //     link.href = qrCodeUrl;
    //     link.download = 'qrcode.png';
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };

    const downloadCardAsImage = async () => {
        const cardElement = document.getElementById('card'); // Get the card element by id
        if (cardElement) {
            try {
                const canvas = await html2canvas(cardElement);
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'qrcode.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error capturing the card as an image:', error);
            }
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
        <div className="min-h-screen  flex items-center justify-center p-4 ">
            {!firstName && !lastName && !id && !dept ? (
                <IdForm setId={setId} setFirstName={setFirstName} setLastName={setLastName} setDept={setDept} />
            ) : (
                <div className="bg-background">



                    <h1 className="text-xl max-w-2xl tracking-tighter text-center font-regular ">
                        This is your QR Code
                    </h1>

                    <p className="text-sm text-balance  leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mb-8">
                        Present this when attending events
                    </p>


                    {/* <div class="relative h-full w-full bg-white"><div class="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div> */}


                    {/* <div className="aspect-w-5 aspect-h-3 w-full max-w-md"> */}
                    <Card id="card" className="aspect-[2/3] p-8 max-w-sm min-w-80 grid gap-6 rounded-lg shadow-neutral-500 bg-muted shadow-sm bg-gradient-to-br from-muted to-slate-500 relative overflow-hidden drop-shadow-xl" >

                        <div className="absolute font-bold text-9xl rotate-90 top-52 right-4 z-0 opacity-40 bg-gradient-to-r bg-clip-text text-transparent from-transparent to-slate-500">
                            evento
                        </div>
                        <div className="absolute font-bold text-9xl rotate-90 top-8 left-8 z-0 opacity-40 bg-gradient-to-l bg-clip-text text-transparent from-transparent to-slate-500 ">
                            evento
                        </div>


                        <div className="flex flex-col bg-opacity-20 p-2 rounded-full gap-4 z-50">
                            <div className="flex items-center gap-2 justify-between">
                                <p className="font-bold">evento</p>

                                <BadgeCheck className="" />
                            </div>

                            <div className="flex flex-col">
                                <h3 className=" font-semibold text-xl mb-1 text-wrap">{`${firstName} ${lastName}`}</h3>
                                {/* <p className="text-muted-foreground text-xs font-medium">{getDeptNameById(Number(dept))}</p> */}
                                <p className="text-muted-foreground text tracking-wide font-medium">{getDeptShortNameById(Number(dept))}</p>
                            </div>
                        </div>
                        <div className="grid gap-4 z-50">
                            {/* <div className="flex items-center justify-between border-b border-muted pb-2">
                                <span className="text-muted-foreground font-medium">ID Number:</span>
                                <span className="font-medium">123456789</span>
                            </div> */}

                            {/* <h1 className="text-lg font-semibold tracking-widest mb-2 text-center">2021-3439</h1> */}

                            <div className="flex justify-center rounded-md flex-col items-center">
                                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="outline-2 rounded-md opacity-80" />}
                                <h1 className="text-lg font-semibold tracking-widest my-2 text-center opacity-80">{id}</h1>
                            </div>


                        </div>
                    </Card>
                    {/* </div> */}





                    <Button
                        onClick={downloadCardAsImage}
                        variant={"outline"}
                        className="w-full my-8 flex gap-2 items-center"
                    >
                        <ArrowDownToLine className="size-4" />
                        Download
                    </Button>
                    <Button
                        onClick={() => {
                            setId("");
                            setFirstName("")
                            setLastName("")
                            setDept("")
                        }}
                        variant={"ghost"}
                        className="w-full flex gap-2 items-center opacity-50"
                    >
                        <RotateCw className="size-4" />
                        Generate another
                    </Button>


                </div>


            )
            }
        </div >
    );
};

export default QRCodeGenerator;
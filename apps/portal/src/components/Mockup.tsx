import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const MobileDeviceMockup = () => {
    const [showMobile, setShowMobile] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowMobile(prev => !prev);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative mx-auto aspect-video w-full place-content-center rounded-md">
            <AnimatePresence mode="wait">
                {showMobile ? (
                    <motion.div
                        key="mobile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        // className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[37.5rem] w-[18.75rem]"
                        className="rounded-md aspect-video w-full relative place-content-center"
                    >
                        {/* <div className="h-8 w-0.5 bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[4.5rem] rounded-s-lg"></div>
                        <div className="h-11 w-0.5 bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[7.75rem] rounded-s-lg"></div>
                        <div className="h-11 w-0.5 bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[11.125rem] rounded-s-lg"></div>
                        <div className="h-16 w-0.5 bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[8.875rem] rounded-e-lg"></div>
                        <div className="rounded-[2rem] overflow-hidden w-[17rem] h-[35.75rem] bg-white dark:bg-gray-800">
                            <Image src="/narrow.png" width={272} height={572} className="dark:block w-[17rem] h-[35.75rem]" alt="Mobile mockup" />
                        </div> */}


                        <Image src="/narrow.png" alt=""
                            fill={true}
                            className=" rounded-md object-contain "
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="desktop"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-md aspect-video w-full relative place-content-center "
                    >
                        {/* <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
                            <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                                <Image src="/wide.png" width={512} height={278} className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg" alt="Desktop mockup" />
                            </div>
                        </div>
                        <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
                        </div> */}

                        <Image
                            src="/wide.png"
                            alt="wide"
                            fill={true}
                            className="rounded-md object-fit border"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileDeviceMockup;
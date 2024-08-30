"use client";

import { StudentMissingModal } from '@/components/modals/StudentMissingModal';
// import { createQueuedAttendanceRecord } from '@repo/models/Attendance';
// import type { QueuedAttendance } from '@repo/models/Attendance';
import { type Student, addStudent, getAllStudents, getStudentBySchoolId, getStudentFullName, isValidSchoolId, updateStudent, updateStudentBySchoolId } from '@repo/models/Student';
// import useQueuedAttendanceStore from '@/store/useQueuedAttendanceStore';
import { failSound, networkErrorSound, offlineSound, successSound } from '@/utils/sound';
import { type Html5QrcodeResult, Html5QrcodeScanner, Html5QrcodeScannerState } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fulfillWithTimeLimit, throwErrorAfterTimeout } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { set } from 'zod';
import { Attendance, createOrUpdateAttendanceRecord } from '@repo/models/Attendance';
import { motion } from 'framer-motion';
import { useAttendanceStore } from "@/store/useAttendanceStore";
import { LogIn, LogOut, TriangleAlert, UserRound } from 'lucide-react';
import useOnlineStatus from "@/hooks/useOnlineStatus";
import { useAuth } from "@/hooks/useAuth";
import { useCurrentUserStore } from '@/store/useCurrentUserStore';
import { Department, getDepartments } from '@repo/models/Department';


interface ModalContent {
    desc: string;
    subtitle: string;
}

export default function Scanner() {
    const isOnline = useOnlineStatus();

    const { addAttendanceRecord } = useAttendanceStore();

    const [scannedStudent, setScannedStudent] = useState<Student | null>(null);
    const [scannedStatus, setScannedStatus] = useState<"TIMED IN" | "TIMED OUT" | null>(null);
    const [scannedMessage, setScannedMessage] = useState<string>("");


    // const currentLoggedUserEmail = String(useAuth().user?.emailAddresses[0].emailAddress)

    const currentLoggedUserEmail = useCurrentUserStore(state => state.email);


    const {
        data: departments = [],
        error: departmentsError,
        isLoading: isDepartmentsLoading,
    } = useQuery<Department[]>({
        queryKey: ["departments"],
        queryFn: getDepartments,
    });




    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (scannedStudent) {
            timer = setTimeout(() => {
                setScannedStudent(null);
            }, 2000); // 2 seconds
        }
        return () => clearTimeout(timer);
    }, [scannedStudent]);


    const html5QrcodeScannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [modalContent, setModalContent] = useState<ModalContent | null>(null);


    const pauseScanner = (pauseVideo = false) => {
        if (html5QrcodeScannerRef.current) {
            const state = html5QrcodeScannerRef.current.getState();
            if (state === Html5QrcodeScannerState.SCANNING) {
                html5QrcodeScannerRef.current.pause(pauseVideo); // freeze scanning
            }
        }
    };

    const resumeScanner = () => {
        if (html5QrcodeScannerRef.current) {
            const state = html5QrcodeScannerRef.current.getState();
            if (state === Html5QrcodeScannerState.PAUSED) {
                html5QrcodeScannerRef.current.resume();
            }
        }
    };

    const pauseAndResumeScanner = (milliseconds: number, pauseVideo: boolean = false) => {
        pauseScanner(pauseVideo);
        setTimeout(resumeScanner, milliseconds);
    };


    //! DEPRECATED
    // const splitIdAndName = (input: String) => {
    //     const [id, ...nameParts] = input.split(',');
    //     const name = nameParts.join(',').trim();
    //     return { id: id.trim(), name };
    // };


    function extractQRCodeData(input: string): { schoolId: string, firstName: string, lastName: string, deptId: number } {
        // Split the input string by commas
        const parts = input.split(',');


        // Destructure parts into variables
        const [schoolId, firstName, lastName, deptIdString] = parts;

        // Parse department ID to a number
        const deptId = parseInt(deptIdString, 10);


        // Return the extracted parts in an object
        return {
            schoolId,
            firstName,
            lastName,
            deptId
        };
    }

    async function handleStudentRegistration(studentFromQRCode: Omit<Student, "id" | "created_at">) {
        // * CHECK IF STUDENT EXISTS IN THE DATABASE
        const studentFromDatabase = await getStudentBySchoolId(studentFromQRCode.school_id);

        // * IF STUDENT DOES NOT EXIST IN THE DATABASE, ADD THEM AND RETURN THE NEW STUDENT
        if (!studentFromDatabase) {
            const newStudent = await addStudent(studentFromQRCode);
            console.log("SCANNER: NEW STUDENT ADDED TO DATABASE", newStudent);
            return newStudent;
        }

        // * CHECK FOR DATA MISMATCHES AND UPDATE IF NECESSARY
        const isFirstNameMatch = studentFromDatabase.first_name === studentFromQRCode.first_name;
        const isLastNameMatch = studentFromDatabase.last_name === studentFromQRCode.last_name;
        const isDeptIdMatch = studentFromDatabase.dept_id === studentFromQRCode.dept_id;

        // * IF ANY STUDENT DATA HAS MISMATCH, UPDATE AND RETURN THE UPDATED STUDENT
        if (!isFirstNameMatch || !isLastNameMatch || !isDeptIdMatch) {
            const updatedStudent = await updateStudentBySchoolId(studentFromQRCode.school_id, studentFromQRCode);
            console.log("SCANNER: STUDENT UPDATED", updatedStudent);
            return updatedStudent;
        }

        // * IF ALL STUDENT DATA MATCHES, RETURN THE EXISTING STUDENT
        console.log("SCANNER: STUDENT ALREADY EXISTS", studentFromDatabase);
        return studentFromDatabase;
    }


    type ScanErrorType =
        | "EARLY_TIMEOUT"
        | "EARLY_TIMEIN"
        | "OFFLINE"
        | "TIME_LIMIT_REACHED"
        | "EMPTY_STUDENTS_REFERENCE"
        | "INVALID_SCHOOL_ID"
        | "DAILY_LIMIT_REACHED"
        | "UNKNOWN_ERROR"
        | "INVALID_QR_CODE_FORMAT";

    function isQRcodeFormatValid(qrCodeValue: string): boolean {
        //* IT SHOULD BE IN THE FORMAT: "school_id,first_name,last_name,dept_id"
        //* e.g. "1234-5678,John,Doe,1"

        // Updated pattern to include accented characters and special letters like ñ
        const qrCodePattern = /^\d{4}-\d{4},[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+,[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+,\d+$/;

        return qrCodePattern.test(qrCodeValue);
    }

    function getDepartmentNameById(departmentId: number): string | undefined {
        const department = departments.find((dept) => dept.id === departmentId);
        return department ? department.short_name : undefined;
    }



    const onScanSuccess = async (decodedText: string, decodedResult: Html5QrcodeResult) => {
        try {
            //* Pause scanning immediately
            pauseScanner();



            //* IF USER IS OFFLINE THEN THROW OFFLINE ERROR
            if (!isOnline) throw new Error("OFFLINE");



            //* VALIDATE SCANNED QR CODE FORMAT
            //* IT SHOULD BE IN THE FORMAT: "school_id,first_name,last_name,dept_id"
            //* e.g. "1234-5678,John,Doe,1"
            if (!isQRcodeFormatValid(decodedText)) throw new Error("INVALID_QR_CODE_FORMAT");



            //* EXTRACT THE DATA FROM THE SCANNED QR CODE
            const { schoolId: scannedSchoolId, firstName: scannedFirstName, lastName: scannedLastName, deptId: scannedDeptId } = extractQRCodeData(decodedText);
            // const { id: scannedSchoolId, name } = splitIdAndName(decodedText);



            //* PROCEED OR CONTINUE CODE EXECUTION ONLY IF THE SCHOOL ID IS VALID
            if (!isValidSchoolId(scannedSchoolId)) throw new Error("INVALID_SCHOOL_ID");



            //* CREATE STUDENT OBJECT FROM THE SCANNED QR CODE
            const studentFromQRCode: Omit<Student, "id" | "created_at"> = {
                school_id: scannedSchoolId,
                first_name: scannedFirstName,
                last_name: scannedLastName,
                dept_id: scannedDeptId,
                is_active: true
            }



            //* RETURNS THE STUDENT OBJECT BASED ON DEFINED RULES
            const student = await handleStudentRegistration(studentFromQRCode)



            console.log("currentLoggedUserEmail: ", currentLoggedUserEmail);
            setScannedStudent(student);

            //* ATTEMPTS TO RESET THE SPLASH TEXT
            setScannedStatus(null);
            setScannedMessage("");

            const newAttendanceRecord: Attendance | null = await throwErrorAfterTimeout(
                2300,
                () => createOrUpdateAttendanceRecord(scannedSchoolId, currentLoggedUserEmail),
                "TIME_LIMIT_REACHED"
            );

            if (!newAttendanceRecord) throw new Error("DAILY_LIMIT_REACHED");

            setScannedStatus(newAttendanceRecord.is_time_in ? "TIMED IN" : "TIMED OUT");

            //* ADD THE RETURNED ATTENDANCE OBJECT TO THE GLOBAL ATTENDANCE RECORDS STATE ARRAY ON THE QUEUE SECTION BELOW THE SCANNER UI
            addAttendanceRecord({
                ...newAttendanceRecord, student,
                department: { id: 0, name: "", created_at: "", short_name: getDepartmentNameById(student.dept_id) as string }
            });

            successSound?.play();
            setTimeout(resumeScanner, 1250);

        } catch (error) {
            console.error("Error in scan process:", error);

            const errorType = (error as Error).message as ScanErrorType;

            switch (errorType) {
                case "INVALID_QR_CODE_FORMAT":
                    toast.error("Invalid QR Code Format", { autoClose: 1500, toastId: "toast-invalid-qr-code" });
                    failSound?.play();
                    pauseAndResumeScanner(1000);
                    break;
                case "EARLY_TIMEOUT":
                    setScannedMessage("Early timeout, retry in 1 min");
                    failSound?.play();
                    pauseAndResumeScanner(1000);
                    break;
                case "EARLY_TIMEIN":
                    setScannedMessage("Early time-in, retry in 10 sec");
                    failSound?.play();
                    pauseAndResumeScanner(1000);
                    break;
                case "OFFLINE":
                    offlineSound?.play();
                    toast.error("You are offline, please check your internet connection", { autoClose: 2500, toastId: "toast-offline" });
                    pauseAndResumeScanner(1000);
                    break;
                case "TIME_LIMIT_REACHED":
                    networkErrorSound?.play();
                    toast.error("Server took too long to respond, try again", { autoClose: 2500 });
                    pauseAndResumeScanner(1000);
                    break;
                case "EMPTY_STUDENTS_REFERENCE":
                    toast.error("No students to compare in the database", { autoClose: 2500, toastId: "toast-empty-students" });
                    failSound?.play();
                    pauseAndResumeScanner(1000);
                    break;
                case "INVALID_SCHOOL_ID":
                    setModalContent({ desc: "The scanned ID does not match any student", subtitle: `Scanned ID: ${decodedText}` });
                    failSound?.play();
                    pauseScanner(true);
                    break;
                case "DAILY_LIMIT_REACHED":
                    setScannedMessage("Daily attendance limit reached!");
                    pauseAndResumeScanner(1000);
                    break;
                default:
                    setModalContent({ desc: "An error occurred while fetching student details.", subtitle: `Scanned ID: ${decodedText}` });
                    failSound?.play();
                    pauseScanner();
            }
        }
    };

    const onScanFailure = (error: any) => {
        // Handle scan failure if needed
    };

    const handleCloseModal = () => {
        setModalContent(null);
        resumeScanner(); // Ensure scanner is resumed when modal is closed
    };

    const setScannerRef = (node: HTMLDivElement | null) => {
        if (node && !html5QrcodeScannerRef.current) {
            const scanner = new Html5QrcodeScanner(
                node.id,
                { fps: 15, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0, rememberLastUsedCamera: true, showTorchButtonIfSupported: true },
                false
            );

            scanner.render(onScanSuccess, onScanFailure);
            html5QrcodeScannerRef.current = scanner;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center relative">
            <div id="reader" ref={setScannerRef} className="w-full max-w-sm border-none outline-none rounded-md" />




            {scannedStudent && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="p-4 bg-background opacity-90 backdrop-blur-lg rounded-md text-center flex items-center flex-col gap-1 outline-1 mb-16">
                        <UserRound className='size-8' />
                        <div>
                            <p className='font-bold'>{getStudentFullName(scannedStudent)}</p>
                            <p className='text-sm'>{scannedStudent.school_id}</p>

                        </div>

                        {scannedStatus && (
                            <motion.div
                                className=" flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 0, scale: 0.2 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div>
                                    <p className={`${scannedStatus === "TIMED OUT" ? "bg-destructive" : "bg-green-700"} w-full flex items-center gap-2 tracking-wide p-2 font-bold mt-2 rounded-md`}>
                                        {scannedStatus === "TIMED OUT" ? (
                                            <LogOut />
                                        ) : (
                                            <LogIn />
                                        )}

                                        {scannedStatus}
                                    </p>
                                </div>
                            </motion.div>
                        )}


                        {scannedMessage && (
                            <motion.div
                                className=" flex items-center justify-center pointer-events-none"
                                initial={{ opacity: 0, scale: 0.2 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div>
                                    <p className="flex items-center bg-yellow-500 text-sm bg-opacity-50 gap-2 text-pretty tracking-wide p-2 font-semibold mt-2 rounded-md w-full">
                                        <TriangleAlert className='size-4' />
                                        {scannedMessage}
                                    </p>
                                </div>
                            </motion.div>
                        )}








                    </div>
                </motion.div>
            )}



            {modalContent && (
                <StudentMissingModal
                    subtitle={modalContent.subtitle}
                    description={modalContent.desc}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

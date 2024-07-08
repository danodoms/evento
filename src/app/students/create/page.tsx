import { StudentForm } from "../StudentForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link"
import { UserRound } from "lucide-react";

export default function RegisterStudentPage() {
    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Add Student</h1>
                <Link href="/students" className="flex gap-2 items-center button font-semibold border p-2 rounded-lg">
                    <UserRound className="mr size-4" />View Students
                </Link>
            </div>
            <div className=" gap-y-6">
                <StudentForm />
            </div>

            <ToastContainer />
        </div>
    );
}
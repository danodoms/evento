import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Calendar } from "lucide-react";
import Link from "next/link";
import { UserForm } from "../UserForm";

export default function AddUserPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Add User</h1>
                <Link
                    href="/admin"
                    className="flex gap-2 items-center button font-semibold border p-2 rounded-lg"
                >
                    <Calendar className="mr size-4" />
                    View Users
                </Link>
            </div>

            <div className="gap-y-6">
                <UserForm />
            </div>

            <ToastContainer />
        </div>
    );
}

import { StudentForm } from "@/components/StudentForm";

export default function RegisterStudentPage() {
    return (
        <div className="p-4 flex flex-col gap-4 justify-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Register Student
            </h1>
            <div className="grid w-full max-w-md grid-cols-1 gap-y-6 sm:w-[400px]">
                <StudentForm />
            </div>
        </div>
    );
}
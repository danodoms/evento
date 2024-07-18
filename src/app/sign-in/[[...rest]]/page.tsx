import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="h-screen w-full flex items-center justify-center gap-8 flex-wrap">
            <div className=" border rounded-lg p-16">
                <h1 className="font-extrabold text-7xl ">
                    evento
                </h1>
                <h2 className="text-balance mt-1 tracking-wide">Streamlining university events for students</h2>

                <p className="mt-4 opacity-50">
                    Only authorized emails can login
                </p>

            </div>
            <SignIn />
        </div>
    )
}
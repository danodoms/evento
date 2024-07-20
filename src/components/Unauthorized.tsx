import Link from "next/link"
import { Lock, TriangleAlert, LogInIcon } from "lucide-react"
import { useClerk } from "@clerk/nextjs";

export default function Unauthorized() {

    const { signOut } = useClerk();
    return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md text-center">
                <div className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {/* <Lock className="mr-2 inline-block h-5 w-5" /> */}
                    You are not authorized
                </h1>
                <p className="mt-4 text-muted-foreground">
                    <TriangleAlert className="mr-2 inline-block h-5 w-5" /> You do not have permission to access this page.
                </p>
                <div className="mt-6">
                    <Link
                        href="/sign-in"
                        className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        prefetch={false}

                        onClick={() => signOut()}
                    >
                        <LogInIcon className="mr-2 inline-block h-5 w-5" /> Go to Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}

// components/HeroSection.jsx
import Link from "next/link"

export function HeroSection() {
    return (
        <section className="w-full min-h-screen flex items-center py-12">
            <div className="container px-4 mx-auto">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Effortless Attendance Tracking</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Streamlining university events for students by students
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/generate-qr"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                            prefetch={false}
                        >
                            Generate QR Code
                        </Link>
                        {/* <Link
                            href="#"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-input bg-background font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
                            prefetch={false}
                        >
                            Download App
                        </Link> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
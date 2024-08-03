export function FeaturesSection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Attendance Tracking</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our attendance tracking app provides a comprehensive solution to manage employee attendance, time off,
                            and more. Say goodbye to manual processes and embrace the future of HR automation.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                    <img
                        src="/placeholder.svg"
                        width="550"
                        height="310"
                        alt="Image"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                    />
                    <div className="flex flex-col justify-center space-y-4">
                        <ul className="grid gap-6">
                            {[
                                {
                                    title: "Real-Time Insights",
                                    description: "Get instant access to attendance data and analytics to make informed decisions.",
                                },
                                {
                                    title: "Automated Workflows",
                                    description: "Streamline your HR processes with automated time-off requests, approvals, and more.",
                                },
                                {
                                    title: "Flexible Scheduling",
                                    description: "Easily manage employee schedules, shifts, and attendance records.",
                                },
                            ].map((feature, index) => (
                                <li key={index}>
                                    <div className="grid gap-1">
                                        <h3 className="text-xl font-bold">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
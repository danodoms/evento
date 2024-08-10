"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { ArrowRight, Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export const Header = () => {

    const [isOpen, setOpen] = useState(false);
    return (
        <header className="w-full z-40 fixed top-0 left-0 backdrop-blur-lg">
            <div className="container relative mx-auto p-4 flex gap-4 flex-row  items-center">
                {/* <div className="justify-start items-center gap-4 lg:flex hidden flex-row">

                </div> */}
                <div className="flex items-center gap-2 justify-between w-full" >
                    <div className="flex items-center gap-2">
                        <Link href="/" className="font-bold ">evento</Link>
                        <ModeToggle compactMode={true} />
                    </div>

                    <div className="hidden lg:flex ml-auto gap-8  items-center ">
                        <Link href="/" className="font-semibold">
                            Home
                        </Link>
                        <Link href="#features" className="font-semibold">
                            Features
                        </Link>

                        <Link href="#get-started" className="font-semibold">
                            <Button>
                                Get Started
                            </Button>
                        </Link>
                    </div>





                    <Sheet>
                        <SheetTrigger asChild>
                            {/* <Button variant="outline" size="icon" className="lg:hidden">
                                <MenuIcon className="h-6 w-6" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button> */}
                            <div className="flex lg:hidden gap-8 items-center ">
                                <Menu className=" rounded-md" />
                            </div>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-[300px] bg-background p-6">
                            <nav className="grid gap-4">
                                <Link href="/" className="text-lg font-medium hover:underline" prefetch={false}>
                                    Home
                                </Link>
                                <Link href="/#features" className="text-lg font-medium hover:underline" prefetch={false}>
                                    Features
                                </Link>
                                <Link href="/#get-started" className="text-lg font-medium hover:underline" prefetch={false}>
                                    Get Started
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>


                </div>




            </div>


        </header>
    );
};
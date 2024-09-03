import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


import { Student } from "@repo/models/Student";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { TableProperties, CircleAlert, Eye, AlignLeft, GalleryHorizontalEnd, LogIn, LogOut, CircleDashed } from "lucide-react";
import AttendanceHistory from "../history/AttendanceHistory";
import { SwitchIcon } from "@radix-ui/react-icons";
import useScanModeStore from "@/store/useScanModeStore";
import { useEffect, useState } from "react";






const ScanModeDialog = () => {


    const { mode: scanMode, setMode: setScanMode } = useScanModeStore();









    const isDesktop = useMediaQuery("(min-width: 768px)");

    const title = "Scan Override";
    const description =
        "Choose between three modes";

    if (isDesktop) {
        return (
            <Dialog>
                <DialogTrigger>
                    {/* <Button variant="ghost" className="">Edit</Button> */}
                    <Trigger />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="text-balance">
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="max-h-96 overflow-auto">
                        <Content />
                    </div>


                    {/* <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter> */}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer>
            <DrawerTrigger>
                {/* <Button variant="ghost" className="">Edit</Button> */}
                <Trigger />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl">{title}</DrawerTitle>

                    <DrawerDescription className="text-balance text-xs px-4">
                        {description}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="max-h-96 overflow-auto">

                    <Content />
                </div>


                <DrawerFooter>
                    {/* <Button>Submit</Button> */}
                    <DrawerClose>
                        <Button variant="ghost" className="w-full">
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};




const Trigger = () => {

    const { mode: scanMode, setMode: setScanMode } = useScanModeStore();

    useEffect(() => {
        switch (scanMode) {
            case 'auto':
                setText('No Attendance Override');
                break;
            case 'in':
                setText('Attendees will be timed in');
                break;
            case 'out':
                setText('Attendees will be timed out');
                break;
            default:
                setText('');
        }
    }, [scanMode]);


    const [text, setText] = useState('');
    return (
        <div className='absolute inset-0 flex items-center justify-center'>
            <div className='px-4 py-2 opacity-90 backdrop-blur-lg rounded-md text-center flex items-center flex-col gap-1 outline-1 bg-primary mt-20 animate-pulse'>
                {text && (
                    <p className="text-sm text-background font-medium">{text}</p>
                )}
                <p className='text-xs text-background'>
                    Tap to change
                </p>
            </div>
        </div>
    )
}

const Content = () => {
    const { mode: scanMode, setMode: setScanMode } = useScanModeStore();
    return (
        <div>

            <div className="bg-background rounded-lg p-6 w-full max-w-md flex flex-col gap-6">
                <div className="bg-card rounded-lg p-4 flex items-center gap-4" onClick={() => setScanMode("auto")}>
                    <div className="rounded-full w-10 h-10 flex items-center justify-center">
                        <CircleDashed className="text-muted-foreground" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Auto</h3>
                        <p className="text-muted-foreground text-sm">Default</p>
                    </div>
                </div>
                <div className="bg-card rounded-lg p-4 flex items-center gap-4" onClick={() => setScanMode("in")}>
                    <div className="rounded-full w-10 h-10 flex items-center justify-center">
                        <LogIn className="text-muted-foreground" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Time in</h3>
                        {/* <p className="text-muted-foreground"> seconds</p> */}
                    </div>
                </div>
                <div className="bg-card rounded-lg p-4 flex items-center gap-4" onClick={() => setScanMode("out")}>
                    <div className="rounded-full w-10 h-10 flex items-center justify-center">
                        <LogOut className="text-muted-foreground" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Time out</h3>
                        {/* <p className="text-muted-foreground">seconds</p> */}
                    </div>
                </div>
            </div>

        </div >
    )
}

export default ScanModeDialog;

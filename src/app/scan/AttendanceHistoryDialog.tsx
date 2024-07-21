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


import { Student } from "@/models/Student";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { TableProperties, CircleAlert, Eye, AlignLeft, GalleryHorizontalEnd } from "lucide-react";
import AttendanceHistory from "../history/AttendanceHistory";






const AttendanceHistoryDialog = () => {




    const isDesktop = useMediaQuery("(min-width: 768px)");

    const title = "Recent Scans";
    const description =
        "Make changes to the student here. Click save when you're done.";

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
                        </DialogDescription>
                    </DialogHeader>

                    <div className="max-h-96 overflow-auto">

                        <AttendanceHistory />
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

                    <DrawerDescription className="text-balance text-xs px-4"></DrawerDescription>
                </DrawerHeader>

                <div className="max-h-96 overflow-auto">

                    <AttendanceHistory />
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
    return (
        // <div className="flex gap-1 items-center rounded-full border px-3 py-1">
        // 	<TableProperties className="size-4" />
        // 	<p className="text-xs font-bold">View Records</p>
        // </div>
        <h4 className="text-xs font-semibold text-center px-4 py-1 border rounded-e-full flex gap-2 items-center hover:bg-neutral-500 hover:bg-opacity-20">
            <GalleryHorizontalEnd className="size-4" />
            View History
        </h4>
    )
}

export default AttendanceHistoryDialog;


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { EventForm } from "./EventForm"
import { Event } from "@/models/Event"

import useMediaQuery from '@custom-react-hooks/use-media-query';



type EventFormDialogProps = {
    event?: Event;
}


const EventFormDialog = ({ event }: EventFormDialogProps) => {

    const isDesktop = useMediaQuery("(min-width: 768px)")

    const title = "Edit event";
    const description = "Make changes to the event here. Click save when you're done.";


    if (isDesktop) {
        return (

            <Dialog>
                <DialogTrigger>
                    <Button variant="ghost" className="">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="text-balance">
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    {/* <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
            </div> */}

                    <EventForm event={event} />

                    {/* <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter> */}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <Button variant="ghost" className="">Edit</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription className="text-balance">{description}</DrawerDescription>
                </DrawerHeader>

                <div className="p-4">
                    <EventForm event={event} />
                </div>

                <DrawerFooter>
                    {/* <Button>Submit</Button> */}
                    <DrawerClose>
                        <Button variant="ghost" className="w-full">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )


}

export default EventFormDialog;
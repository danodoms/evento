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

import { UserForm } from "./UserForm";
import { type User } from "@/models/User";

import { useToast } from "@/components/ui/use-toast";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { useState } from "react";

type UserFormDialogProps = {
    user?: User;
};

import { PenLineIcon } from "lucide-react"

const UserFormDialog = ({ user }: UserFormDialogProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const title = "Edit user";
    const description =
        "Make changes to the user here. Click save when you're done.";
    const { toast } = useToast();

    const handleClose = () => {
        setIsOpen(false);
        toast({
            description: "Your changes have been saved!",
            duration: 2250,
        });
    };

    const handleError = (message: string) => {
        toast({
            description: message,
            duration: 2250,
        });
    };

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                    <Trigger />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription className="text-balance">
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <UserForm
                        user={user}
                        handleClose={handleClose}
                        handleError={handleError}
                    />

                    {/* <DialogFooter>
                <Button type="submit">Save changes</Button>
            </DialogFooter> */}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger>
                <Trigger />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl">{title}</DrawerTitle>
                    <DrawerDescription className="text-balance text-xs px-4">
                        {description}
                    </DrawerDescription>
                </DrawerHeader>

                <div className="p-4">
                    <UserForm
                        user={user}
                        handleClose={handleClose}
                        handleError={handleError}
                    />
                </div>

                <DrawerFooter>
                    {/* <Button>Submit</Button> */}
                    <DrawerClose>
                        <Button variant="ghost" className="w-full">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};


function Trigger() {
    return (
        <Button variant="ghost" className="w-full flex gap-2">
            <PenLineIcon className="size-4" />Edit
        </Button>
    )
}

export default UserFormDialog;

// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";

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
import { TableProperties, CircleAlert, Eye, AlignLeft, GalleryHorizontalEnd, Crop } from "lucide-react";

import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import { useCallback, useState } from "react";
import getCroppedImg from "@/utils/cropImage";
import { useStudentStore } from "@/store/useStudentStore";





const CropperDialog = () => {


    const { photo, croppedPhoto, setPhoto, setCroppedPhoto } = useStudentStore();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);


    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);


    const handleCrop = useCallback(async () => {
        if (photo && croppedAreaPixels) {
            const croppedImg: any = await getCroppedImg(
                photo,
                croppedAreaPixels
            );
            setCroppedPhoto(croppedImg); // Set the cropped image

        }
    }, [photo, croppedAreaPixels]);


    const isDesktop = useMediaQuery("(min-width: 768px)");

    const title = "Crop Profile";
    const description =
        "Make changes to the student here. Click save when you're done.";

    // if (isDesktop) {
    //     return (
    //         <Dialog>
    //             <DialogTrigger>
    //                 {/* <Button variant="ghost" className="">Edit</Button> */}
    //                 <Trigger />
    //             </DialogTrigger>
    //             <DialogContent className="sm:max-w-[425px]">
    //                 <DialogHeader>
    //                     <DialogTitle>{title}</DialogTitle>
    //                     <DialogDescription className="text-balance">
    //                     </DialogDescription>
    //                 </DialogHeader>

    //                 <div className="max-h-96 overflow-auto">

    //                     <AttendanceHistory />
    //                 </div>


    //                 {/* <DialogFooter>
    //             <Button type="submit">Save changes</Button>
    //         </DialogFooter> */}
    //             </DialogContent>
    //         </Dialog>
    //     );
    // }

    return (
        <Drawer>
            <DrawerTrigger>
                <Trigger />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl">{title}</DrawerTitle>

                    <DrawerDescription className="text-balance text-xs px-4"></DrawerDescription>
                </DrawerHeader>

                <div className="max-h-full min-h-96 overflow-auto p-4 flex flex-col gap-4">
                    <div className="relative h-80 w-full">
                        <Cropper
                            image={photo}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            cropShape="round"
                        />
                    </div>

                    <div className="flex flex-col space-y-4">
                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) => setZoom(value[0])}
                        />

                        <DrawerClose>
                            <Button onClick={handleCrop} className="w-full">Save and close</Button>
                        </DrawerClose>

                    </div>


                </div>


                <DrawerFooter>
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




const Trigger = () => {
    return (
        // <Button >Edit</Button>
        <Button variant="ghost" type="button" className="flex gap-1 items-center">
            <Crop className="size-4" />
            Crop & Resize
        </Button>
    )
}

export default CropperDialog;

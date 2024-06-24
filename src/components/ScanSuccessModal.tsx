// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"

// export default function ScanSuccessModal() {
//     return (
//         <AlertDialog>
//             {/* <AlertDialogTrigger asChild>
//                 <Button variant="outline">Show Dialog</Button>
//             </AlertDialogTrigger> */}
//             <AlertDialogContent>
//                 <AlertDialogHeader>
//                     <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                     <AlertDialogDescription>
//                         This action cannot be undone. This will permanently delete your
//                         account and remove your data from our servers.
//                     </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                     <AlertDialogCancel>Cancel</AlertDialogCancel>
//                     <AlertDialogAction>Continue</AlertDialogAction>
//                 </AlertDialogFooter>
//             </AlertDialogContent>
//         </AlertDialog>
//     )
// }



import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ScanSuccessModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
}

const ScanSuccessModal: React.FC<ScanSuccessModalProps> = ({ title, description, isOpen, onClose }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Deny</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ScanSuccessModal;

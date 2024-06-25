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
    success: boolean;
    title: string;
    subtitle: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
}

const ScanSuccessModal: React.FC<ScanSuccessModalProps> = ({ success, title, subtitle, description, isOpen, onClose }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>

                    {/* {success ? () : ()} */}

                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <h3>{subtitle}</h3>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col gap-4">
                    <AlertDialogCancel onClick={onClose}>Continue Scanning</AlertDialogCancel>
                    <Button >Register this ID</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ScanSuccessModal;

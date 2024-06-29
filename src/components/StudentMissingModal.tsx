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

interface StudentMissingModalProps {
    subtitle: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
}

export const StudentMissingModal: React.FC<StudentMissingModalProps> = ({ subtitle, description, isOpen, onClose }) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>User not found</AlertDialogTitle>
                    <h3>{subtitle}</h3>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Continue Scanning</AlertDialogCancel>
                    <Button >Register this ID instead</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

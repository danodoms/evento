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

interface EarlyTimeOutModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const EarlyTimeOutModal: React.FC<EarlyTimeOutModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Confirm Action</AlertDialogTitle>
					<h3></h3>
					<AlertDialogDescription>
						Less than 1 minute since time in. Confirm this time out?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>
						Continue Scanning
					</AlertDialogCancel>
					<Button>Confirm</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

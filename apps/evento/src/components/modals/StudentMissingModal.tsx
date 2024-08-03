import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type React from "react";
import { useEffect, useState } from "react";

interface StudentMissingModalProps {
	subtitle: string;
	description: string;
	onClose: () => void;
}

export const StudentMissingModal: React.FC<StudentMissingModalProps> = ({
	subtitle,
	description,
	onClose,
}) => {
	return (
		<AlertDialog open={true} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Invalid QR Code</AlertDialogTitle>
					<h3>{subtitle}</h3>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>
						Continue Scanning
					</AlertDialogCancel>
					{/* <Button>Register this ID instead</Button> */}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

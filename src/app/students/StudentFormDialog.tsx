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

import { StudentForm } from "./StudentForm";

import type { Student } from "@/models/Student";
import useMediaQuery from "@custom-react-hooks/use-media-query";

type StudentFormDialogProps = {
	student?: Student;
};

const StudentFormDialog = ({ student }: StudentFormDialogProps) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const title = "Edit student";
	const description =
		"Make changes to the student here. Click save when you're done.";

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger>
					<Button variant="ghost" className="">
						Edit
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription className="text-balance">
							{description}
						</DialogDescription>
					</DialogHeader>

					<StudentForm student={student} />

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
				<Button variant="ghost" className="">
					Edit
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle className="text-xl">{title}</DrawerTitle>
					<DrawerDescription className="text-balance text-xs px-4">
						{description}
					</DrawerDescription>
				</DrawerHeader>

				<div className="p-4">
					<StudentForm student={student} />
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

export default StudentFormDialog;

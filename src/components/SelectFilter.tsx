import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type SelectFilterComponentProps = {
	label: string;
	items: any[];
	value: any;
	setValue: (value: any) => void;
	defaultValue?: {
		label: string;
		value: string;
	};
};

export default function SelectFilter({
	label,
	items,
	value,
	setValue,
	defaultValue,
}: SelectFilterComponentProps) {
	return (
		<Select onValueChange={setValue} value={value}>
			<SelectTrigger className="">
				<SelectValue placeholder="Select Status" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>{label}</SelectLabel>

					{defaultValue && (
						<SelectItem value={defaultValue.value}>
							{defaultValue.label}
						</SelectItem>
					)}

					{items.map((item, index) => (
						<SelectItem key={index} value={item.toString()}>
							{item}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

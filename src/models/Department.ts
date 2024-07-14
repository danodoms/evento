import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export interface Department {
	id: number;
	created_at: string | null;
	name: string;
	short_name: string;
}

export async function getDepartments(): Promise<Department[]> {
	const { data, error } = await supabase.from("departments").select("*");

	if (error) {
		console.error("Error fetching departments", error);
	}
	console.log("All departments", data);
	return data as Department[];
}



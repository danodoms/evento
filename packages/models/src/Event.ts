import { createClient } from "@repo/utils/supabase";

const supabase = createClient();

export type Event = {
  id: number | undefined; // bigint type in the database, typically represented as number in TypeScript
  created_at: string | undefined; // timestamp with time zone type, usually represented as string
  is_active: boolean | undefined; // boolean type
  name: string; // text type, represented as string
  date: string; // date type, represented as string
  description: string | undefined; // text type, represented as string
  location: string | undefined; // text type, represented as string
  duration: eventDuration;
  duration_in_minutes: number;
  is_required: boolean;
  is_check_in_only: boolean;
};

export type EventStat = {
  date: string;
  time_in_count: string;
  time_out_count: string;
};

export type EventScannerStat = EventStat & {
  scanned_by_email: string;
};

export type eventDuration = "AM_ONLY" | "PM_ONLY" | "AM_AND_PM";

export async function getEvents(): Promise<Event[]> {
  const { data, error } = await supabase.from("events").select("*");

  if (error) {
    console.error("Error fetching events", error);
  }
  console.log("All events", data);
  return data as Event[];
}

export async function getActiveEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true); // Add condition to filter active events

  if (error) {
    console.error("Error fetching events", error);
  }
  console.log("All events", data);
  return data as Event[];
}

export async function addEvent(
  event: Omit<Event, "id" | "created_at">
): Promise<Event> {
  const { data, error } = await supabase.from("events").insert(event).single(); // Use .single() if you expect only one row to be inserted

  if (error) {
    console.error("Error adding event:", error);
    throw new Error("Error adding event");
  }

  console.log("Added event:", data);
  return data;
}

export async function updateEvent(event: Event): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .update(event)
    .eq("id", event.id)
    .single(); // Use .single() if you expect only one row to be updated

  if (error) {
    console.error("Error updating event:", error);
    throw new Error("Error updating event");
  }

  console.log("Updated event:", data);
  return data as Event;
}

export async function deactivateEvent(event: Event): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .update({ is_active: false })
    .eq("id", event.id)
    .single(); // Use .single() if you expect only one row to be updated

  if (error) {
    console.error("Error deactivating event:", error);
    return null;
  }

  console.log("Deactivated event:", data);
  return data as Event;
}

export async function getAttendanceForDate(
  attendanceDate: string
): Promise<object> {
  const { data, error } = await supabase.rpc("get_attendance_by_date", {
    attendance_date: attendanceDate,
  });

  if (error) {
    console.error("Error fetching attendance", error);
    throw error;
  }

  return data as object;
}

export const getEventRowCount = async () => {
  const { count, error } = await supabase
    .from("events")
    .select("id", { count: "exact", head: true });

  if (error) {
    console.error("Error fetching total event row count:", error);
    return 0;
  }

  console.log("Total event row count:", count);

  return count || 0;
};

export const getEventsStats = async () => {
  const { data, error } = await supabase.from("event_stats_view").select("*");

  if (error) {
    console.error("Error fetching event stats", error);
    return 0;
  }

  console.log("Event stats", data);

  return data as any;
};

export const getEventScannerStats = async () => {
  const { data, error } = await supabase
    .from("event_scanner_stats_view")
    .select("*");

  if (error) {
    console.error("Error fetching event scanner stats", error);
    return 0;
  }

  console.log("Event scanner stats", data);

  return data as any;
};

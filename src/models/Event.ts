import { createClient } from "@/utils/supabase/client";

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

export async function addEvent(
  event: Omit<Event, "id" | "created_at">
): Promise<Event | null> {
  const { data, error } = await supabase.from("events").insert(event).single(); // Use .single() if you expect only one row to be inserted

  if (error) {
    console.error("Error adding event:", error);
    return null;
  }

  console.log("Added event:", data);
  return data;
}

export async function updateEvent(event: Event): Promise<Event | null> {
  const { data, error } = await supabase
    .from("events")
    .update(event)
    .eq("id", event.id)
    .single(); // Use .single() if you expect only one row to be updated

  if (error) {
    console.error("Error updating event:", error);
    return null;
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

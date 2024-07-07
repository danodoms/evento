export type Event = {
  id: number; // bigint type in the database, typically represented as number in TypeScript
  created_at: string; // timestamp with time zone type, usually represented as string
  name: string; // text type, represented as string
  date: string; // date type, represented as string
  description: string; // text type, represented as string
  location: string; // text type, represented as string
  is_active: boolean; // boolean type
  duration: eventDuration;
};

export type eventDuration = "AM_ONLY" | "PM_ONLY" | "AM_AND_PM";

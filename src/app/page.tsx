import Image from "next/image";
import { CalendarX, GanttChart, GanttChartIcon, Asterisk } from "lucide-react";
import { appName } from "@/config";

export default function Home() {
  return (
    <section className="p-4 flex flex-col gap-4">
      <div className="font-bold text-4xl text-pretty flex items-center gap-2">
        {/* {appName} */}
        Dashboard
        {/* <Asterisk className="size-xl" /> */}
      </div>

      <div className="w-full rounded-md p-4 flex justify-between bg-destructive">
        <p>
          No Upcoming Event
        </p>

        <CalendarX />
      </div>
    </section>
  );
}

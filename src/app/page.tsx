import Image from "next/image";
import { CalendarX, GanttChart, GanttChartIcon, Asterisk, UsersRound, UserRoundPlus, CalendarFold } from "lucide-react";
import { appName } from "@/config";
import React from "react";

interface UiButton {
  name: string;
  iconName: React.ComponentType;
  link: string;
}


const buttons: UiButton[] = [{
  name: "Students",
  iconName: UsersRound,
  link: "/students"

},
{
  name: "Register",
  iconName: UserRoundPlus,
  link: "/register"
}, {
  name: "Attendance",
  iconName: GanttChart,
  link: "/attendance"
}, {
  name: "Events",
  iconName: CalendarFold,
  link: "/events"
}]

export default function Home() {
  return (
    <section className="p-4 flex flex-col gap-4">



      {/* TOP SECTION */}
      <div className="flex flex-col gap-2 ">
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
      </div>



      {/* BOTTOM SECTION */}
      <div className="gap-2 grid-cols-2 grid">

        {buttons.map((button, index) => (
          <a href={button.link} className="w-full rounded-md p-8 flex justify-center gap-2 border bg-secondary">
            {React.createElement(button.iconName)}
            <p className="font-semibold">
              {button.name}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

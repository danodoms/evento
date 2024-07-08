import Image from "next/image";
import { CalendarX, Heart, GanttChart, GanttChartIcon, Asterisk, UsersRound, UserRoundPlus, CalendarFold } from "lucide-react";
import { appName } from "@/config";
import React from "react";
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

import { Badge } from "@/components/ui/badge"


interface UiButton {
  name: string;
  iconName: React.ComponentType;
  link: string;
}


const buttons: UiButton[] = [

  {
    name: "Attendance",
    iconName: GanttChart,
    link: "/attendance"
  },
  {

    name: "Students",
    iconName: UsersRound,
    link: "/students"

  }, {
    name: "Events",
    iconName: CalendarFold,
    link: "/events"
  }]

export default function Home() {
  return (
    <section className="flex flex-col gap-4">


      {/* TOP SECTION */}


      <div className="flex flex-col gap-2 p-4 border rounded-lg ">

        <h1 className="text-2xl text-pretty  items-center gap-2">
          Welcome to
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500"> {appName}</span>



          <div className="w-full leading-relaxed rounded-md flex justify-between text-xs pt-1 ">
            Streamlining university events for students.
          </div>
        </h1>



        <Separator />

        <div className="w-full leading-relaxed rounded-md flex justify-between text-xs opacity-70 text-pretty">

          An internal web app for Davao Oriental State University Banaybanay Campus Student Council.
        </div>





        <div className="flex text-xs font-normal gap-1 opacity-50 pt-1 rounded-md items-center">
          made with
          <Heart className="size-3" />
          by
          <a href="https://danodoms.vercel.app" target="_blank" className="underline">danodoms</a>

        </div>
      </div>




      <div className="flex flex-col gap-2 p-4 border rounded-lg">
        <div className="font-semibold text-md text-pretty flex items-center gap-2">
          Dashboard
        </div>

        <div className="w-full rounded-md p-4 flex justify-between bg-destructive">
          <p>
            No Upcoming Event
          </p>

          <CalendarX />
        </div>
      </div>









      {/* BOTTOM SECTION */}
      <div className="gap-4 flex flex-col grid-cols-2 md:grid">

        {buttons.map((button, index) => (
          <Link href={button.link} key={index} className="w-full p-8 flex justify-center gap-2 border rounded-lg bg-card text-card-foreground shadow-sm">
            {React.createElement(button.iconName)}
            <p className="font-semibold">
              {button.name}
            </p>
          </Link>
        ))}
      </div>


    </section>
  );
}

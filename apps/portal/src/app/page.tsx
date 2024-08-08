import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"
import { Content1 } from "@/components/Content1"
import { Content2 } from "@/components/Content2"
import { Content3 } from "@/components/Content3"
import { DemoSection } from "@/components/DemoSection"

export default function Home() {
  return (
    <main className="flex flex-col min-h-[100dvh] justify-center items-center">


      <HeroSection />
      {/* <DemoSection /> */}


      <h1 className="text-3xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular w-full ">
        How it works
      </h1>
      <Content1 />
      <Content2 />
      <Content3 />



      {/* <div className="bg-opacity-5  bg-gradient-to-b  from-transparent to-slate-500"> */}

      <FeaturesSection />
      <CTASection />
      {/* </div> */}

    </main>
  )
}
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
    <div className="flex flex-col min-h-[100dvh]">

      <main className="flex-1">
        <HeroSection />
        {/* <DemoSection /> */}

        <Content1 />
        <Content2 />
        <Content3 />

        {/* <div className="bg-opacity-5  bg-gradient-to-b  from-transparent to-slate-500"> */}

        <FeaturesSection />
        <CTASection />
        {/* </div> */}
      </main>
    </div>
  )
}
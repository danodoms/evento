import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"
import { Content1 } from "@/components/Content1"
import { Content2 } from "@/components/Content2"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">

      <main className="flex-1">
        <HeroSection />
        <Content1 />
        <Content2 />
        <FeaturesSection />
        {/* <CTASection /> */}
      </main>
    </div>
  )
}
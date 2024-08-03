import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        {/* <CTASection /> */}
      </main>
    </div>
  )
}
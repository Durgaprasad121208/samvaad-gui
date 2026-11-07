import { HeroSection } from "@/features/samvaad-form/components/hero-section";
import { AboutSection } from "@/features/samvaad-form/components/about-section";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--bg-page, #050E21)" }}>
      <HeroSection completedQuestions={0} totalQuestions={23} />
      <AboutSection />
    </main>
  );
}

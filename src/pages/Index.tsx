import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DataSources from "@/components/DataSources";
import Analytics from "@/components/Analytics";
import Outreach from "@/components/Outreach";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features />
      <DataSources />
      <Analytics />
      <Outreach />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;

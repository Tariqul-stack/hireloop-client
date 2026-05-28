import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import JobDiscoverySection from "@/components/Jobdiscoverysection";
import PricingSection from "@/components/PricingSection";


export default function Home() {
  return (
    <div >
      <HeroSection></HeroSection>
      <JobDiscoverySection></JobDiscoverySection>
      <FeaturesSection></FeaturesSection>
      <PricingSection></PricingSection>
      
    </div>
  );
}

import { Helmet } from "react-helmet";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedTours from "@/components/home/FeaturedTours";
import DestinationShowcase from "@/components/home/DestinationShowcase";
import ExperienceShowcase from "@/components/home/ExperienceShowcase";
import VehicleSection from "@/components/home/VehicleSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div className="bg-white dark:bg-neutral-900">
      <Helmet>
        <title>Rahul Tours Sri Lanka - Discover the Pearl of the Indian Ocean</title>
        <meta 
          name="description" 
          content="Experience the beauty of Sri Lanka with our personalized tours. Explore beaches, wildlife, ancient temples and lush landscapes with expert local guides."
        />
        <meta 
          name="keywords" 
          content="Sri Lanka tours, Sri Lanka travel, Sri Lanka vacation, Sri Lanka holidays, Sri Lanka beaches, Sri Lanka wildlife, Sri Lanka temples"
        />
        <link rel="canonical" href="https://rahultourssrilanka.com/" />
      </Helmet>
      
      <HeroSlider />
      <FeaturedTours />
      <DestinationShowcase />
      <ExperienceShowcase />
      <VehicleSection />
      <TestimonialsSection />
      <CallToAction />
    </div>
  );
}

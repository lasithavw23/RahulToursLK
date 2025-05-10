import { Link } from "wouter";
import { CTA_IMAGE } from "@/lib/constants";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1567270646285-93f81f1f4dfc?q=80&w=1974&auto=format&fit=crop"
          alt="Sri Lankan landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-purple-900/80"></div>
      </div>
      
      <div className="container mx-auto relative z-10 text-center text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
          Ready to Experience Sri Lanka?
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Let us help you plan the perfect journey through this tropical paradise. 
          Our local experts will craft a personalized experience just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-primary hover:bg-gray-100 font-medium px-8 py-4 rounded-md transition text-lg"
          >
            Book a Free Consultation
          </Link>
          <Link
            href="/contact"
            className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium px-8 py-4 rounded-md transition text-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Link } from "wouter";
import { CTA_IMAGE } from "@/lib/constants";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={CTA_IMAGE}
          alt="Sri Lankan tea plantations"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
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
            href="/book-consultation"
            className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition"
          >
            Book a Free Consultation
          </Link>
          <Link
            href="/contact"
            className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-md transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

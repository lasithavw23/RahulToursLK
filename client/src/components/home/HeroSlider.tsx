import { useState, useEffect } from "react";
import { HERO_IMAGES } from "@/lib/constants";
import { Phone, MessageCircle, Star, CheckCircle } from "lucide-react";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-slider relative overflow-hidden">
      {/* Image Slides */}
      {HERO_IMAGES.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={
              index === 0 
                ? "Sigiriya Rock Fortress Romantic View at Sunset" 
                : index === 1 
                  ? "Sri Lanka Safari Elephants Watching Experience"
                  : index === 2
                    ? "Beach Paradise in Sri Lanka"
                    : index === 3
                      ? "Ella Train Ride through Sri Lanka Hill Country"
                      : `Sri Lanka scenic view ${index}`
            }
            className="w-full h-full object-cover"
            loading={index < 2 ? "eager" : "lazy"}
          />
          <div className="slide-content absolute inset-0 flex flex-col justify-end items-center text-white p-8 md:p-16">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fadeInUp">
                {index === 0 
                  ? "Sigiriya Rock - Explore Ancient Heritage" 
                  : index === 1
                    ? "Wild Safari Adventure"
                    : index === 2
                      ? "Beach Paradise"
                      : index === 3
                        ? "Hill Country Escape"
                        : "Discover the Pearl of the Indian Ocean"}
              </h1>
              <p
                className="text-lg md:text-xl max-w-2xl mb-8 animate-fadeInUp"
                style={{ animationDelay: "0.2s" }}
              >
                {index === 0
                  ? "Step into the past and discover Sri Lanka's rich cultural legacy. Ancient castles, cities, sacred temples, and timeless traditions await you."
                  : index === 1
                    ? "Get closer to nature in Sri Lanka's untamed wilderness. Experience thrilling wildlife encounters with leopards, elephants and breathtaking landscapes."
                    : index === 2
                      ? "Discover your private slice of paradise on Sri Lanka's untouched shores. Where the jungle kisses the sea, and serenity wraps around you."
                      : index === 3
                        ? "Breathe in the fresh mountain air and soak up the views while in a cinematic train ride through Sri Lanka's stunning hill country."
                        : "Experience the stunning beaches, ancient temples, and diverse wildlife of Sri Lanka with our exclusive tours."}
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fadeInUp"
                style={{ animationDelay: "0.4s" }}
              >
                <button className="call-button">
                  <Phone size={20} />
                  <p className="button-text">
                    <span>Call Us Now</span>
                    <br />
                    +94 74 227 1900
                  </p>
                </button>
                <button className="chat-button whatsapp">
                  <MessageCircle size={20} />
                  <p className="button-text">
                    <span>Chat on WhatsApp</span>
                    <br />
                    Quick Response
                  </p>
                </button>
              </div>
              
              <div className="hero-details animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
                <div className="review">
                  <span className="rating flex al-center">
                    4.9 <Star className="icon" />
                  </span>
                  <span className="reviews-count">500+ Reviews</span>
                </div>
                <div className="guide">
                  <CheckCircle className="icon-check" />
                  <span className="guide-text">Licensed Guide</span>
                </div>
                <div className="price">
                  <CheckCircle className="icon-check" />
                  <span className="price-text">Best Price Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

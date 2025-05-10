import { useState, useEffect } from "react";
import { Link } from "wouter";
import { HERO_IMAGES } from "@/lib/constants";
import SearchBox from "./SearchBox";

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
            alt={`Sri Lanka scenic view ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="slide-content absolute inset-0 flex flex-col justify-end items-center text-white p-8 md:p-16">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4 animate-fadeInUp">
                Discover the Pearl of the Indian Ocean
              </h1>
              <p
                className="text-lg md:text-xl max-w-2xl mb-8 animate-fadeInUp"
                style={{ animationDelay: "0.2s" }}
              >
                Experience the stunning beaches, ancient temples, and diverse wildlife of 
                Sri Lanka with our exclusive tours.
              </p>
              <div
                className="flex flex-col sm:flex-row gap-4 animate-fadeInUp"
                style={{ animationDelay: "0.4s" }}
              >
                <Link
                  href="/tours"
                  className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition text-center"
                >
                  Explore Tours
                </Link>
                <Link
                  href="/destinations"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white font-medium px-6 py-3 rounded-md transition text-center"
                >
                  View Destinations
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Search Box Component */}
      <SearchBox />
    </section>
  );
}

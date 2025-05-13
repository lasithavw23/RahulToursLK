import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Place, Tour } from "@/lib/types";

export default function Attractions() {
  const [attractions, setAttractions] = useState<Place[]>([]);
  
  // Fetch all tours to extract places
  const { data: tours, isLoading, error } = useQuery({
    queryKey: ['/api/tours'],
    enabled: true,
  });

  useEffect(() => {
    if (tours) {
      // Extract all places from all tours and create a unique set
      const allPlaces: Place[] = [];
      const slugMap = new Map<string, boolean>();
      
      tours.forEach((tour: Tour) => {
        tour.places.forEach((place: Place) => {
          // Create a slug from the place title for use in routing
          const slug = place.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
          // Check if we've already added this place
          if (!slugMap.has(slug)) {
            slugMap.set(slug, true);
            allPlaces.push({
              ...place,
              slug // Add slug for routing
            });
          }
        });
      });
      
      setAttractions(allPlaces);
    }
  }, [tours]);

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Attractions in Sri Lanka | Discover Beautiful Places</title>
        <meta name="description" content="Explore the most beautiful attractions in Sri Lanka. From ancient temples to stunning beaches and wildlife sanctuaries." />
      </Helmet>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-neutral-800 dark:text-white">
          Discover Sri Lanka's Beautiful Attractions
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
          Explore the island's most iconic landmarks, natural wonders, and cultural treasures.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 text-lg">Error loading attractions. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => {
            // Generate a slug for linking
            const slug = attraction.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            
            return (
              <Link 
                href={`/attractions/${slug}`} 
                key={index}
                className="group"
              >
                <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={attraction.imagePreview} 
                      alt={attraction.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-display font-bold mb-2 text-neutral-800 dark:text-white">
                      {attraction.title}
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                      {attraction.shortDescription}
                    </p>
                    <div className="text-primary font-medium group-hover:text-primary-dark transition-colors duration-300">
                      Explore more →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
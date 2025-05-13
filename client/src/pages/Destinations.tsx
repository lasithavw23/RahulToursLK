import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Destination } from "@/lib/types";
import DestinationCard from "@/components/common/DestinationCard";
import { Button } from "@/components/ui/button";

export default function Destinations() {
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  return (
    <>
      <Helmet>
        <title>Destinations in Sri Lanka - Dear Sri Lanka</title>
        <meta 
          name="description" 
          content="Explore the diverse destinations of Sri Lanka - from ancient cities and cultural sites to pristine beaches and wildlife parks."
        />
        <link rel="canonical" href="https://rahultoursrilanka.com/destinations" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-[60vh] min-h-[400px]">
          <img
            src="https://pixabay.com/get/g8d2ddffb6d1a9dbf5838d3473b5beff99899803e987c0cc8dc59892a18fde10deee3d7e78aad13ae48bc05a3b78a17c01d70c24044457230ceac4b99f6506e66_1280.jpg"
            alt="Sri Lanka Destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Discover Sri Lanka's Destinations
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                From ancient ruins to pristine beaches, explore the diverse landscapes 
                and experiences that await you in Sri Lanka.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">
            Where Would You Like to Explore?
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Each destination in Sri Lanka offers unique experiences and attractions. 
            Choose from cultural hotspots, wildlife sanctuaries, beach paradises, 
            and mountain retreats.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-72 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl"></div>
            ))}
          </div>
        ) : error || !destinations ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">
              Error loading destinations. Please try again later.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-primary hover:bg-primary-dark"
            >
              Refresh Page
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </div>

      {/* Destinations Map Section */}
      <div className="bg-neutral-50 dark:bg-neutral-800 py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Sri Lanka at a Glance
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Explore our interactive map to discover the geographic diversity of Sri Lanka 
              and plan your perfect itinerary.
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-700 rounded-xl shadow-lg p-4 h-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4047271.2199384123!2d78.4135179243458!3d7.851732110528847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sri Lanka Map"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}

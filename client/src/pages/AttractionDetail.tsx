import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Place, Tour } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Star, Users, Bookmark } from "lucide-react";
import BookingModal from "@/components/booking/BookingModal";

export default function AttractionDetail() {
  const { slug } = useParams();
  const [attraction, setAttraction] = useState<Place | null>(null);
  const [relatedTours, setRelatedTours] = useState<Tour[]>([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Fetch all tours to find the attraction and related tours
  const { data: tours = [], isLoading, error } = useQuery<Tour[]>({
    queryKey: ['/api/tours'],
    enabled: true,
  });

  useEffect(() => {
    if (tours && tours.length > 0 && slug) {
      // Find the attraction by comparing slugified titles
      const foundAttraction = findAttractionBySlug(tours, slug);
      setAttraction(foundAttraction);
      
      // If we found the attraction, find related tours
      if (foundAttraction) {
        const relatedToursList = findRelatedTours(tours, foundAttraction);
        setRelatedTours(relatedToursList);
      }
    }
  }, [tours, slug]);

  const generateThingsToDo = (place: Place): Place => {
    if (!place.thingsToDo || place.thingsToDo.length === 0) {
      // For Sigiriya, use specific things to do
      if (place.title.toLowerCase().includes('sigiriya')) {
        const activities = [
          'Climb to the Top of Sigiriya Rock',
          'Explore the Sigiriya Frescoes',
          'Walk Through the Water Gardens',
          'See the Lion\'s Paw Entrance',
          'Visit the Mirror Wall',
          'Explore the Royal Gardens and Pools'
        ];
        return {
          ...place,
          thingsToDo: activities
        };
      }
      
      // For other places, create generic activities
      const activities = [
        `Explore the ${place.title} area`,
        `Take memorable photos at ${place.title}`,
        `Learn about the history of ${place.title}`,
        `Experience the local culture around ${place.title}`,
        `Visit the nearby attractions`,
        `Try local cuisine near ${place.title}`
      ];
      return {
        ...place,
        thingsToDo: activities
      };
    }
    return place;
  };

  const findAttractionBySlug = (tours: Tour[], attractionSlug: string): Place | null => {
    for (const tour of tours) {
      if (tour.places && Array.isArray(tour.places)) {
        for (const place of tour.places) {
          const placeSlug = place.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
          if (placeSlug === attractionSlug) {
            // Return the place with added slug and things to do
            const placeWithSlug = { ...place, slug: placeSlug };
            return generateThingsToDo(placeWithSlug);
          }
        }
      }
    }
    return null;
  };

  const findRelatedTours = (tours: Tour[], attraction: Place): Tour[] => {
    return tours.filter(tour => 
      tour.places && Array.isArray(tour.places) &&
      tour.places.some(place => place.title === attraction.title)
    );
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !attraction) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Attraction Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the attraction you're looking for.</p>
        <Link href="/attractions">
          <Button>Return to Attractions</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900">
      <Helmet>
        <title>{attraction.title} | Sri Lanka Attractions</title>
        <meta name="description" content={attraction.shortDescription} />
      </Helmet>

      {/* Hero Section */}
      <div 
        className="w-full h-[40vh] md:h-[60vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${attraction.imagePreview})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {attraction.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs for different content sections */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="things-to-do">Things to Do</TabsTrigger>
                <TabsTrigger value="tours">Related Tours</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-xl font-medium text-neutral-700 dark:text-neutral-300 mb-4">
                    {attraction.shortDescription}
                  </p>
                  
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">About {attraction.title}</h2>
                    <p>{attraction.description}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="things-to-do" className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-6">Things to Do at {attraction.title}</h2>
                  
                  {attraction.thingsToDo && attraction.thingsToDo.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {attraction.thingsToDo.map((activity, index) => {
                        // Additional descriptions for Sigiriya activities
                        let description = "Experience the unique charm and authenticity of Sri Lanka through this activity.";
                        
                        if (attraction.title.toLowerCase().includes('sigiriya')) {
                          switch(index) {
                            case 0: // Climb to the Top
                              description = "The main highlight of Sigiriya is climbing the massive 200-meter rock, which was once the site of a royal palace. The climb involves a series of staircases, including a narrow spiral staircase inside the Lion's Paw, offering a spectacular view of the surrounding landscape.";
                              break;
                            case 1: // Frescoes
                              description = "Halfway up the rock, you'll find the famous Sigiriya frescoes. These ancient murals, believed to date back to the 5th century, depict beautiful women and are a major attraction. The frescoes are beautifully preserved in a sheltered area on the rock face.";
                              break;
                            case 2: // Water Gardens
                              description = "At the base of the rock, you can explore the ancient water gardens. These gardens include symmetrical ponds and fountains, designed to reflect the grandeur of the royal palace. The layout of the gardens is an exceptional example of ancient Sri Lankan landscaping.";
                              break;
                            case 3: // Lion's Paw
                              description = "The Lion's Paw is a massive sculpture at the foot of the rock, which originally formed part of the entrance to the royal palace. The entrance is shaped like a lion's mouth, and the paws that remain are a fascinating feature, giving the fortress its name.";
                              break;
                            case 4: // Mirror Wall
                              description = "On your way up the rock, you'll encounter the Mirror Wall, a highly polished surface originally designed to reflect the surroundings. Today, you can see old inscriptions on the wall, which were made by visitors who came to Sigiriya over the centuries.";
                              break;
                            case 5: // Royal Gardens
                              description = "In addition to the water gardens, Sigiriya also features royal bathing pools and sophisticated irrigation systems. These pools, set amidst well-maintained gardens, offer a glimpse into the luxurious lifestyle of the ancient kings.";
                              break;
                          }
                        }
                        
                        return (
                          <div 
                            key={index} 
                            className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-700"
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <span className="text-lg font-bold">{index + 1}</span>
                              </div>
                              <div className="ml-4 flex-1">
                                <h3 className="text-xl font-semibold mb-3">{activity}</h3>
                                <p className="text-neutral-600 dark:text-neutral-400">
                                  {description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Information about activities at this attraction is currently being updated.
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="tours">
                <h2 className="text-2xl font-bold mb-6">Tours featuring {attraction.title}</h2>
                
                {relatedTours.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedTours.map(tour => (
                      <Link 
                        key={tour.id} 
                        href={`/tours/${tour.slug}`}
                        className="group block"
                      >
                        <div className="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={tour.imageUrl} 
                              alt={tour.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">{tour.title}</h3>
                            <div className="flex items-center text-yellow-500 mb-2">
                              {[...Array(Math.floor(tour.rating))].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                              ))}
                              {tour.rating % 1 > 0 && (
                                <Star size={16} fill="currentColor" className="fill-half" />
                              )}
                              <span className="ml-1 text-sm text-neutral-600 dark:text-neutral-400">
                                ({tour.rating.toFixed(1)})
                              </span>
                            </div>
                            <div className="flex items-center text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                              <Clock size={14} className="mr-1" />
                              <span>{tour.duration} days</span>
                              <span className="mx-2">•</span>
                              <Users size={14} className="mr-1" />
                              <span>Small group</span>
                            </div>
                            <div className="font-bold text-lg text-primary mt-2">
                              ${tour.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    No tours currently feature this attraction.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Ready to Explore?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Book a tour featuring {attraction.title} and other amazing attractions in Sri Lanka.
              </p>
              <Button 
                className="w-full" 
                onClick={() => setShowBookingModal(true)}
              >
                Book a Tour Now
              </Button>
            </div>
            
            {relatedTours.length > 0 && (
              <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Popular Tours</h3>
                <div className="space-y-4">
                  {relatedTours.slice(0, 3).map(tour => (
                    <Link 
                      key={tour.id} 
                      href={`/tours/${tour.slug}`}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={tour.imageUrl} 
                          alt={tour.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {tour.title}
                        </h4>
                        <div className="flex items-center mt-1">
                          <span className="text-xs inline-flex items-center text-neutral-600 dark:text-neutral-400 mr-2">
                            <Clock size={12} className="mr-1" />
                            {tour.duration} days
                          </span>
                          <span className="text-primary font-bold text-sm">
                            ${tour.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showBookingModal && <BookingModal onClose={closeBookingModal} />}
    </div>
  );
}
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Destination, Tour } from "@/lib/types";
import TourCard from "@/components/common/TourCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DestinationDetail() {
  const [, params] = useRoute<{ slug: string }>("/destinations/:slug");
  const slug = params?.slug || "";

  const { data: destination, isLoading: isLoadingDestination } = useQuery<Destination>({
    queryKey: [`/api/destinations/${slug}`],
    enabled: Boolean(slug),
  });

  const { data: relatedTours, isLoading: isLoadingTours } = useQuery<Tour[]>({
    queryKey: [`/api/tours/by-destination/${slug}`],
    enabled: Boolean(slug),
  });

  if (isLoadingDestination) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="w-full h-96 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl mb-8"></div>
        <div className="w-2/3 h-10 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded mb-4"></div>
        <div className="w-full h-40 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded mb-8"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-display font-bold mb-4">
          Destination Not Found
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          We couldn't find the destination you're looking for.
        </p>
        <Link href="/destinations">
          <Button className="bg-primary hover:bg-primary-dark">
            Browse All Destinations
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${destination.name} - Destinations | Dear Sri Lanka`}</title>
        <meta name="description" content={destination.shortDescription} />
        <link rel="canonical" href={`https://dearsrilanka.com/destinations/${destination.slug}`} />
      </Helmet>

      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              {destination.name}
            </h1>
            <p className="text-xl text-white max-w-2xl">
              {destination.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Description */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="w-full border-b justify-start">
                <TabsTrigger value="overview" className="text-lg">Overview</TabsTrigger>
                <TabsTrigger value="things-to-do" className="text-lg">Things to Do</TabsTrigger>
                <TabsTrigger value="gallery" className="text-lg">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    {destination.description}
                  </p>
                  
                  <h3 className="text-xl font-display font-bold mb-3">
                    Best Time to Visit
                  </h3>
                  <p className="mb-6">{destination.bestTimeToVisit}</p>
                  
                  <h3 className="text-xl font-display font-bold mb-3">
                    Getting There
                  </h3>
                  <p>
                    Information about transportation options and how to reach {destination.name} 
                    would be displayed here from the API.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="things-to-do" className="mt-6">
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold mb-4">
                    Top Things to Do in {destination.name}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {destination.thingsToDo.map((thing, index) => (
                      <div 
                        key={index} 
                        className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6"
                      >
                        <div className="flex items-start">
                          <div className="bg-primary-light/20 dark:bg-primary-dark/20 text-primary rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                            <span className="font-bold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-lg font-medium">{thing}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="gallery" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destination.gallery.map((image, index) => (
                    <div key={index} className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${destination.name} - Gallery Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-display font-bold mb-4">
                Visit {destination.name}
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-primary mt-1 mr-3"></i>
                  <div>
                    <span className="block font-medium">Location</span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Central Province, Sri Lanka
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-calendar-alt text-primary mt-1 mr-3"></i>
                  <div>
                    <span className="block font-medium">Best Season</span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      December to April
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-language text-primary mt-1 mr-3"></i>
                  <div>
                    <span className="block font-medium">Languages</span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Sinhala, Tamil, English
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <i className="fas fa-coins text-primary mt-1 mr-3"></i>
                  <div>
                    <span className="block font-medium">Currency</span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Sri Lankan Rupee (LKR)
                    </span>
                  </div>
                </div>
              </div>
              
              <Link href="/tours">
                <Button className="w-full bg-primary hover:bg-primary-dark">
                  Find Tours to {destination.name}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Tours */}
        <div className="mt-16">
          <h2 className="text-2xl font-display font-bold mb-6">
            Tours Featuring {destination.name}
          </h2>
          
          {isLoadingTours ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl"></div>
              ))}
            </div>
          ) : relatedTours && relatedTours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                No tours currently available for this destination.
              </p>
              <Link href="/tours">
                <Button variant="outline">Browse All Tours</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

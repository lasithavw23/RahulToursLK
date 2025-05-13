import { useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Tour } from "@/lib/types";
import BookingModal from "@/components/booking/BookingModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function TourDetail() {
  const [, params] = useRoute<{ slug: string }>("/tours/:slug");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const slug = params?.slug || "";

  const {
    data: tour,
    isLoading,
    error,
  } = useQuery<Tour>({
    queryKey: [`/api/tours/${slug}`],
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="w-full h-96 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl mb-8"></div>
        <div className="w-2/3 h-10 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded mb-4"></div>
        <div className="w-full h-40 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded mb-8"></div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Tour Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          We couldn't find the tour you're looking for.
        </p>
        <Link href="/tours">
          <Button className="bg-primary hover:bg-primary-dark">
            Browse All Tours
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {tour.metaTitle || `${tour.title} - Rahul Tours Sri Lanka`}
        </title>
        <meta
          name="description"
          content={tour.metaDescription || tour.shortDescription}
        />
        <link
          rel="canonical"
          href={
            tour.canonicalUrl ||
            `https://rahultoursrilanka.com/tours/${tour.slug}`
          }
        />
        {tour.keywords && tour.keywords.length > 0 && (
          <meta name="keywords" content={tour.keywords.join(", ")} />
        )}
        {tour.dateModified && (
          <meta property="article:modified_time" content={tour.dateModified} />
        )}
        {tour.dateCreated && (
          <meta property="article:published_time" content={tour.dateCreated} />
        )}
        {tour.structuredData && (
          <script type="application/ld+json">{tour.structuredData}</script>
        )}
      </Helmet>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          <div className="lg:col-span-3 h-[500px]">
            <img
              src={tour.gallery[activeImageIndex]}
              alt={`${tour.title} - Image ${activeImageIndex + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 h-[500px] overflow-y-auto">
            {tour.gallery.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer h-60 rounded-lg overflow-hidden border-2 ${
                  activeImageIndex === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${tour.title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tour Title and Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {tour.title}
            </h1>
            <div className="flex items-center mb-6">
              <div className="flex items-center text-accent mr-6">
                <i className="fas fa-star mr-1"></i>
                <span className="font-bold">{tour.rating.toFixed(1)}</span>
              </div>
              <div className="mr-6">
                <i className="fas fa-clock text-primary mr-2"></i>
                <span>{tour.duration} Days</span>
              </div>
              {tour.isFeatured && (
                <div className="px-3 py-1 bg-accent text-white text-sm rounded-full">
                  Featured Tour
                </div>
              )}
              {tour.category && (
                <div className="px-3 py-1 bg-secondary text-white text-sm rounded-full">
                  {tour.category}
                </div>
              )}
            </div>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
              {tour.description}
            </p>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <CardTitle className="text-2xl font-display">
                  Book This Tour
                </CardTitle>
                <CardDescription className="text-white text-opacity-90">
                  Secure your spot today
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Price:</span>
                    <span className="text-2xl font-bold text-primary">
                      ${tour.price}
                    </span>
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 text-right">
                    per person
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary-dark text-lg py-6"
                  onClick={() => setShowBookingModal(true)}
                >
                  Book Now
                </Button>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                    <span>No booking fees</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                    <span>Best price guarantee</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                    <span>
                      Free cancellation up to 30 days before departure
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tour Details Tabs */}
        <Tabs defaultValue="places" className="mb-12">
          <TabsList className="w-full border-b justify-start mb-8">
            <TabsTrigger value="places" className="text-lg">
              Places to Visit
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg">
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="places" className="mt-0">
            <div className="space-y-12">
              {tour.places.map((place, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8"
                >
                  <div className="h-80 overflow-hidden rounded-lg">
                    <img
                      src={place.imagePreview}
                      alt={place.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-3">
                      {place.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 font-medium mb-4">
                      {place.shortDescription}
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-300">
                      {place.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-0">
            {tour.mapLink ? (
              <div className="h-[600px] rounded-lg overflow-hidden">
                <iframe
                  src={tour.mapLink}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map for ${tour.title}`}
                ></iframe>
              </div>
            ) : (
              <div className="text-center py-12">
                <p>Map not available for this tour.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Related Tours */}
        <div className="mt-16">
          <Separator className="mb-8" />
          <h2 className="text-2xl font-display font-bold mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* This would be filled with related tours from the API */}
            <div className="text-center py-8">
              <p>Related tours will appear here.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          onClose={() => setShowBookingModal(false)}
          preselectedTourType={tour.slug.split("-")[0]}
        />
      )}
    </>
  );
}

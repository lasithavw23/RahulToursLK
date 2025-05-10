import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Tour } from "@/lib/types";
import { Helmet } from "react-helmet";
import TourCard from "@/components/common/TourCard";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DESTINATIONS, DURATIONS } from "@/lib/constants";

export default function Tours() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    destination: "",
    duration: "",
    priceRange: "",
  });

  // Parse URL search parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1]);
    const destination = params.get("destination") || "";
    const duration = params.get("duration") || "";
    
    setFilters(prev => ({
      ...prev,
      destination,
      duration
    }));
  }, [location]);

  // Fetch tours with filters
  const { data: tours, isLoading, error } = useQuery<Tour[]>({
    queryKey: ['/api/tours', filters],
  });

  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      destination: "",
      duration: "",
      priceRange: "",
    });
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load tours. Please try again.",
      variant: "destructive",
    });
  }

  return (
    <>
      <Helmet>
        <title>Tours & Experiences - Dear Sri Lanka</title>
        <meta 
          name="description" 
          content="Discover our handcrafted Sri Lanka tours and travel experiences. From beaches to wildlife safaris, cultural heritage to tea plantations."
        />
        <link rel="canonical" href="https://dearsrilanka.com/tours" />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-primary-dark text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Unforgettable Sri Lanka Tours
          </h1>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Discover the magic of Sri Lanka with our carefully crafted tours. 
            Each experience is designed to showcase the very best of our beautiful island.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display">Filter Tours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="font-medium">Destination</label>
                  <Select
                    value={filters.destination}
                    onValueChange={(value) => handleFilterChange("destination", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Destinations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Destinations</SelectItem>
                      {DESTINATIONS.map((dest) => (
                        <SelectItem key={dest.value} value={dest.value}>
                          {dest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Duration</label>
                  <Select
                    value={filters.duration}
                    onValueChange={(value) => handleFilterChange("duration", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Duration</SelectItem>
                      {DURATIONS.map((dur) => (
                        <SelectItem key={dur.value} value={dur.value}>
                          {dur.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="font-medium">Price Range</label>
                  <Select
                    value={filters.priceRange}
                    onValueChange={(value) => handleFilterChange("priceRange", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Price</SelectItem>
                      <SelectItem value="under-500">Under $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1000</SelectItem>
                      <SelectItem value="1000-1500">$1000 - $1500</SelectItem>
                      <SelectItem value="over-1500">Over $1500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tours Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl"></div>
                ))}
              </div>
            ) : tours && tours.length > 0 ? (
              <>
                <h2 className="text-2xl font-display font-bold mb-6">
                  {tours.length} Tours Available
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-display font-bold mb-4">No Tours Found</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  We couldn't find any tours matching your selected filters.
                </p>
                <Button onClick={clearFilters} className="bg-primary hover:bg-primary-dark">
                  View All Tours
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

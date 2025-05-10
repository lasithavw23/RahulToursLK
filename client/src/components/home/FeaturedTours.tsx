import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import TourCard from "@/components/common/TourCard";
import { Tour } from "@/lib/types";

export default function FeaturedTours() {
  const { data: tours, isLoading, error } = useQuery<Tour[]>({
    queryKey: ['/api/tours/featured'],
  });

  if (isLoading) {
    return (
      <section className="pt-36 pb-16 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Featured Tours
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Handcrafted tours designed to showcase the best of Sri Lanka's culture, nature, and history.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !tours) {
    return (
      <section className="pt-36 pb-16 px-4 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Featured Tours
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Handcrafted tours designed to showcase the best of Sri Lanka's culture, nature, and history.
            </p>
          </div>
          <div className="text-center text-red-500">
            Error loading tours. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-36 pb-16 px-4 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Featured Tours
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Handcrafted tours designed to showcase the best of Sri Lanka's culture, nature, and history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tours"
            className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary dark:text-primary-light font-medium rounded-md hover:bg-primary hover:text-white transition"
          >
            View All Tours
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

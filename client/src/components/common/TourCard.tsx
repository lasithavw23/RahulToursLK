import { Link } from "wouter";
import { Tour } from "@/lib/types";

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <div className="tour-card rounded-xl overflow-hidden shadow-lg bg-white dark:bg-neutral-800 hover:shadow-xl transition duration-300">
      <div className="relative overflow-hidden h-60">
        <img
          src={tour.imageUrl}
          alt={tour.title}
          className="w-full h-full object-cover transition duration-400"
        />
        {tour.isPopular && (
          <div className="absolute top-4 right-4 bg-accent text-white text-sm font-medium px-3 py-1 rounded-full">
            Most Popular
          </div>
        )}
        {tour.isNew && (
          <div className="absolute top-4 right-4 bg-secondary text-white text-sm font-medium px-3 py-1 rounded-full">
            New Tour
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-display font-bold">{tour.title}</h3>
          <div className="flex items-center">
            <span className="text-accent mr-1">
              <i className="fas fa-star"></i>
            </span>
            <span className="font-medium">{tour.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {tour.shortDescription}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-neutral-500 dark:text-neutral-400">From</span>
            <span className="text-primary font-bold text-lg ml-1">${tour.price}</span>
          </div>
          <span className="text-neutral-500 dark:text-neutral-400 text-sm">
            {tour.duration} Days
          </span>
        </div>
      </div>
      <Link
        href={`/tours/${tour.slug}`}
        className="block bg-neutral-100 dark:bg-neutral-700 text-center py-4 text-primary dark:text-primary-light font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition"
      >
        View Details
      </Link>
    </div>
  );
}

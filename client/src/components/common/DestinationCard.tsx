import { Link } from "wouter";
import { Destination } from "@/lib/types";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${destination.slug}`} className="group relative h-72 rounded-xl overflow-hidden shadow-lg">
      <img
        src={destination.imageUrl}
        alt={`${destination.name} - ${destination.shortDescription}`}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white text-xl font-display font-bold mb-1">{destination.name}</h3>
        <p className="text-white text-opacity-80 text-sm">{destination.shortDescription}</p>
      </div>
    </Link>
  );
}

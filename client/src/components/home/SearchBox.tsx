import { useState } from "react";
import { useLocation } from "wouter";
import { DESTINATIONS, DURATIONS } from "@/lib/constants";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SearchBox() {
  const [, setLocation] = useLocation();
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let searchParams = new URLSearchParams();
    
    if (destination) {
      searchParams.append("destination", destination);
    }
    
    if (duration) {
      searchParams.append("duration", duration);
    }
    
    const queryString = searchParams.toString();
    setLocation(`/tours${queryString ? '?' + queryString : ''}`);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl p-6 max-w-4xl mx-auto transform translate-y-1/2">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-neutral-700 dark:text-neutral-200 font-medium">
                Destination
              </Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger
                  id="destination"
                  className="w-full p-3 border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100"
                >
                  <SelectValue placeholder="Select a destination" />
                </SelectTrigger>
                <SelectContent>
                  {DESTINATIONS.map((dest) => (
                    <SelectItem key={dest.value} value={dest.value}>
                      {dest.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-neutral-700 dark:text-neutral-200 font-medium">
                Duration
              </Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger
                  id="duration"
                  className="w-full p-3 border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100"
                >
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {DURATIONS.map((dur) => (
                    <SelectItem key={dur.value} value={dur.value}>
                      {dur.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:flex items-end">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium p-3 rounded-md transition"
              >
                <i className="fa-solid fa-magnifying-glass mr-2"></i>Search Tours
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

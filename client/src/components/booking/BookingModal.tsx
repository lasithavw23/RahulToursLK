import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { TOUR_TYPES, DURATIONS } from "@/lib/constants";
import { BookingRequest } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface BookingModalProps {
  onClose: () => void;
  preselectedTourType?: string;
}

export default function BookingModal({ onClose, preselectedTourType = "" }: BookingModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<BookingRequest>({
    tourType: preselectedTourType,
    startDate: "",
    duration: "",
    adults: 1,
    children: 0,
    name: "",
    email: "",
    specialRequests: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: BookingRequest) => {
      await apiRequest("POST", "/api/bookings", data);
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted",
        description: "We'll contact you within 24 hours to confirm your booking.",
        variant: "default",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[500px] lg:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold">Book Your Sri Lanka Tour</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="tourType">Tour Type</Label>
              <Select
                value={formData.tourType}
                onValueChange={(value) => handleSelectChange("tourType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tour type" />
                </SelectTrigger>
                <SelectContent>
                  {TOUR_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => handleSelectChange("duration", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATIONS.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adults">Number of Adults</Label>
                <Input
                  id="adults"
                  name="adults"
                  type="number"
                  min="1"
                  value={formData.adults}
                  onChange={handleNumberInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="children">Number of Children</Label>
                <Input
                  id="children"
                  name="children"
                  type="number"
                  min="0"
                  value={formData.children}
                  onChange={handleNumberInputChange}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                name="specialRequests"
                rows={3}
                value={formData.specialRequests}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark text-white font-medium p-3"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Submit Booking Request"}
            </Button>
            <p className="text-sm text-muted-foreground mt-2 text-center">
              We'll contact you within 24 hours to confirm your booking.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

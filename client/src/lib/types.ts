// Tour Types
export interface Place {
  title: string;
  imagePreview: string;
  shortDescription: string;
  description: string;
}

export interface Tour {
  id: number;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  rating: number;
  price: number;
  duration: number;
  isFeatured?: boolean;
  places: Place[];
  mapLink?: string;
  gallery: string[];
  
  // SEO Optimization Fields
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  structuredData?: string;
  
  // Additional helpful fields for SEO
  dateCreated?: string;
  dateModified?: string;
  author?: string;
  category?: string;
}

// Destination Types
export interface Destination {
  id: number;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  thingsToDo: string[];
  bestTimeToVisit: string;
  gallery: string[];
}

// Testimonial Types
export interface Testimonial {
  id: number;
  name: string;
  country: string;
  imageUrl: string;
  rating: number;
  text: string;
}

// Blog Types
export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  authorImageUrl: string;
  publishDate: string;
  tags: string[];
}

// Booking Types
export interface BookingRequest {
  tourType: string;
  startDate: string;
  duration: string;
  adults: number;
  children: number;
  name: string;
  email: string;
  specialRequests?: string;
}

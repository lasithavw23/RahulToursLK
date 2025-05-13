// Images
import sigiriyaRomanticMoment from "../assets/imgs/sigiriya_romantic_moment.webp";
import safariElephants from "../assets/imgs/sri_lanka_safari_elephants_watching.webp";
import beachParadise from "../assets/imgs/beach_paradise_Sri_Lanka.webp";
import ellaTrain from "../assets/imgs/ella_train_ride_sri_lanka.webp";

export const HERO_IMAGES = [
  sigiriyaRomanticMoment,
  safariElephants,
  beachParadise,
  ellaTrain,
  "https://pixabay.com/get/g2a5074338a2b6823a7d567b75986089770057a9900a1e3ef063d9be676ff3b5d0ef8406e9309796f7e5149aba4b088877e024536e4cc407874f70a16d52a9767_1280.jpg",
];

export const CTA_IMAGE =
  "https://pixabay.com/get/g16d294b5389cfbbf074e9636686dda03ecca8ae253bf30c6b487956520834c19d875cbc8dd3812c526dff9a5ed1535766b0095e1b84f3d95d2b940e05331ceca_1280.jpg";

// Navigation
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/attractions", label: "Attractions" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// Destinations for quick search
export const DESTINATIONS = [
  { value: "colombo", label: "Colombo" },
  { value: "kandy", label: "Kandy" },
  { value: "galle", label: "Galle" },
  { value: "ella", label: "Ella" },
  { value: "sigiriya", label: "Sigiriya" },
];

// Duration options for search
export const DURATIONS = [
  { value: "1-3", label: "1-3 Days" },
  { value: "4-7", label: "4-7 Days" },
  { value: "8-14", label: "8-14 Days" },
  { value: "15+", label: "15+ Days" },
];

// Experiences
export const EXPERIENCES = [
  {
    icon: "fa-mountain",
    title: "Hiking & Trekking",
    description:
      "Explore Sri Lanka's stunning landscapes from misty mountains to lush rainforests with expert guides who know the hidden trails.",
    color: "bg-primary",
  },
  {
    icon: "fa-utensils",
    title: "Culinary Journeys",
    description:
      "Sample authentic Sri Lankan cuisine with cooking classes, market tours, and meals with local families to taste the island's flavors.",
    color: "bg-secondary",
  },
  {
    icon: "fa-water",
    title: "Ocean Adventures",
    description:
      "Dive into the crystal-clear waters for snorkeling, surfing, or whale watching expeditions along Sri Lanka's picturesque coastline.",
    color: "bg-accent",
  },
  {
    icon: "fa-spa",
    title: "Wellness Retreats",
    description:
      "Rejuvenate mind and body with traditional Ayurvedic treatments, yoga sessions, and meditation in serene natural settings.",
    color: "bg-primary-light",
  },
];

// Footer quick links and social media
export const SOCIAL_MEDIA = [
  { icon: "fa-facebook-f", url: "#" },
  { icon: "fa-instagram", url: "#" },
  { icon: "fa-twitter", url: "#" },
  { icon: "fa-youtube", url: "#" },
];

export const QUICK_LINKS = [
  { href: "/tours", label: "Tours" },
  { href: "/attractions", label: "Attractions" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Travel Blog" },
  { href: "/contact", label: "Contact Us" },
];

export const POPULAR_TOURS = [
  { href: "/tours/cultural-heritage", label: "Cultural Heritage Tour" },
  { href: "/tours/beach-paradise", label: "Beach Paradise Tour" },
  { href: "/tours/wildlife-safari", label: "Wildlife Safari Adventure" },
  { href: "/tours/tea-country", label: "Tea Country Explorer" },
  { href: "/tours/family-adventure", label: "Family Adventure" },
];

export const CONTACT_INFO = [
  { icon: "fa-map-marker-alt", info: "123 Temple Road, Colombo 04, Sri Lanka" },
  { icon: "fa-phone", info: "+94 11 234 5678" },
  { icon: "fa-envelope", info: "info@rahultoursrilanka.com" },
  { icon: "fa-clock", info: "Mon-Fri: 9:00 AM - 6:00 PM" },
];

export const FOOTER_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/sitemap", label: "Sitemap" },
];

// Tour Types for booking form
export const TOUR_TYPES = [
  { value: "", label: "Select a tour type" },
  { value: "cultural", label: "Cultural Heritage Tour" },
  { value: "beach", label: "Beach Paradise Tour" },
  { value: "wildlife", label: "Wildlife Safari Adventure" },
  { value: "tea", label: "Tea Country Explorer" },
  { value: "custom", label: "Custom Tour" },
];

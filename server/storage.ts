import { drizzle } from 'drizzle-orm/pg-core';
import { db as schema, InsertUser, User, InsertDestination, Destination, InsertTour, Tour, InsertTestimonial, Testimonial, InsertBooking, Booking, InsertBlogPost, BlogPost, InsertContactMessage, ContactMessage } from "@shared/schema";
import { Json } from "drizzle-orm/pg-core";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Tours
  getTours(
    destination?: string,
    duration?: string,
    priceRange?: string
  ): Promise<Tour[]>;
  getFeaturedTours(): Promise<Tour[]>;
  getTourBySlug(slug: string): Promise<Tour | undefined>;
  getToursByDestination(destinationSlug: string): Promise<Tour[]>;

  // Destinations
  getDestinations(): Promise<Destination[]>;
  getFeaturedDestinations(): Promise<Destination[]>;
  getDestinationBySlug(slug: string): Promise<Destination | undefined>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;

  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getRelatedBlogPosts(slug: string): Promise<BlogPost[]>;

  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private destinations: Map<number, Destination>;
  private tours: Map<number, Tour>;
  private testimonials: Map<number, Testimonial>;
  private bookings: Map<number, Booking>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;

  currentUserId: number;
  currentDestinationId: number;
  currentTourId: number;
  currentTestimonialId: number;
  currentBookingId: number;
  currentBlogPostId: number;
  currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.destinations = new Map();
    this.tours = new Map();
    this.testimonials = new Map();
    this.bookings = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();

    this.currentUserId = 1;
    this.currentDestinationId = 1;
    this.currentTourId = 1;
    this.currentTestimonialId = 1;
    this.currentBookingId = 1;
    this.currentBlogPostId = 1;
    this.currentContactMessageId = 1;

    // Initialize with sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Sample destinations
    const destinations: InsertDestination[] = [
      {
        name: "Kandy",
        slug: "kandy",
        shortDescription: "Cultural Capital & Temple of the Tooth",
        description: "Kandy is a major city in Sri Lanka located in the Central Province. It was the last capital of the ancient kings' era of Sri Lanka. The city lies in the midst of hills in the Kandy plateau, which crosses an area of tropical plantations, mainly tea. Kandy is both an administrative and religious city and is also the capital of the Central Province. Kandy is the home of The Temple of the Tooth Relic (Sri Dalada Maligawa), one of the most sacred places of worship in the Buddhist world.",
        imageUrl: "https://pixabay.com/get/g8d2ddffb6d1a9dbf5838d3473b5beff99899803e987c0cc8dc59892a18fde10deee3d7e78aad13ae48bc05a3b78a17c01d70c24044457230ceac4b99f6506e66_1280.jpg",
        bestTimeToVisit: "December to April is the best time to visit Kandy when the weather is dry and pleasant.",
        thingsToDo: ["Visit the Temple of the Sacred Tooth Relic", "Explore the Royal Botanical Gardens in Peradeniya", "Experience the Kandy Cultural Show", "Walk around Kandy Lake", "Visit the Ceylon Tea Museum"],
        gallery: [
          "https://pixabay.com/get/g8d2ddffb6d1a9dbf5838d3473b5beff99899803e987c0cc8dc59892a18fde10deee3d7e78aad13ae48bc05a3b78a17c01d70c24044457230ceac4b99f6506e66_1280.jpg",
          "https://pixabay.com/get/ge873304aac92154d4e9587c9614f77b133f4d1b12233f27eecaf54d2b5620a637a65afa978023ec0816e993849fdafa4fdcd10130be56b66496118145b7fde81_1280.jpg",
          "https://pixabay.com/get/g2a5074338a2b6823a7d567b75986089770057a9900a1e3ef063d9be676ff3b5d0ef8406e9309796f7e5149aba4b088877e024536e4cc407874f70a16d52a9767_1280.jpg"
        ]
      },
      {
        name: "Sigiriya",
        slug: "sigiriya",
        shortDescription: "Ancient Rock Fortress & UNESCO World Heritage Site",
        description: "Sigiriya, also known as the Lion Rock, is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. The name refers to a site of historical and archaeological significance that is dominated by a massive column of rock nearly 200 metres (660 ft) high. According to the ancient Sri Lankan chronicle the Culavamsa, this site was selected by King Kashyapa (477–495 AD) for his new capital. He built his palace on the top of this rock and decorated its sides with colorful frescoes. On a small plateau about halfway up the side of this rock, he built a gateway in the form of an enormous lion. The name of this place is derived from this structure – Sīnhāgiri, the Lion Rock.",
        imageUrl: "https://pixabay.com/get/g3fe4cdfa53cc79c4f8b2a3ce56b7ef2e16b7a40b5433407cfbf82a8a47a94f5e38eb9b28a2c59af686acd2fd0a6ce307db32b0e693cfab11b53c9c462c456edd_1280.jpg",
        bestTimeToVisit: "January to March is the best time to visit Sigiriya when the weather is dry and ideal for climbing.",
        thingsToDo: ["Climb Sigiriya Rock", "Visit the Water Gardens", "View the Sigiriya Frescoes", "Explore Sigiriya Museum", "Hiking in Pidurangala Rock"],
        gallery: [
          "https://pixabay.com/get/g3fe4cdfa53cc79c4f8b2a3ce56b7ef2e16b7a40b5433407cfbf82a8a47a94f5e38eb9b28a2c59af686acd2fd0a6ce307db32b0e693cfab11b53c9c462c456edd_1280.jpg",
          "https://pixabay.com/get/g49bb9f4a1ee60dfa9d7f3db8d3dc7c7cbf51b7a8eea0ec91c93dbb6979af9a095cea4a9be26e02ce2bd5e51e0a5fc7c03c5df22fb0a7cd7fa11290dc3a3c2a22_1280.jpg",
          "https://pixabay.com/get/g2a5074338a2b6823a7d567b75986089770057a9900a1e3ef063d9be676ff3b5d0ef8406e9309796f7e5149aba4b088877e024536e4cc407874f70a16d52a9767_1280.jpg"
        ]
      }
    ];

    destinations.forEach(destination => {
      this.createDestination(destination);
    });

    // Sample tours
    const tours: InsertTour[] = [
      {
        title: "Sigiriya & Dambulla UNESCO Heritage Day Tour",
        slug: "sigiriya-dambulla-tour",
        shortDescription: "Experience Sri Lanka's ancient wonders on a day tour to Sigiriya Rock Fortress and Dambulla Cave Temple-two must-see UNESCO World Heritage Sites.",
        description: `Embark on the ultimate cultural adventure with our Sigiriya & Dambulla UNESCO Heritage Day Tour. Ascend the legendary Sigiriya Rock Fortress-often called the 'Eighth Wonder of the World'-and marvel at its ancient frescoes, water gardens, and breathtaking panoramic views. Explore the Dambulla Golden Cave Temple, Sri Lanka's largest and best-preserved cave temple complex, adorned with over 150 Buddha statues and vibrant murals dating back more than 2,000 years.
    
    This expertly guided tour includes comfortable transfers, skip-the-line entry, and in-depth commentary on the rich history and significance of these iconic landmarks. Ideal for history enthusiasts, culture seekers, and adventure travelers, this day trip offers an immersive journey into Sri Lanka's royal past and spiritual heritage. Discover why Sigiriya and Dambulla are top-rated attractions and a must for every Sri Lanka itinerary.`,
        imageUrl: "https://pixabay.com/get/g2a5074338a2b6823a7d567b75986089770057a9900a1e3ef063d9be676ff3b5d0ef8406e9309796f7e5149aba4b088877e024536e4cc407874f70a16d52a9767_1280.jpg",
        rating: 4.8,
        price: 120,
        duration: 1,
        isFeatured: true,
        places: [
          {
            title: "Sigiriya Rock Fortress",
            imagePreview: "https://pixabay.com/get/g3fe4cdfa53cc79c4f8b2a3ce56b7ef2e16b7a40b5433407cfbf82a8a47a94f5e38eb9b28a2c59af686acd2fd0a6ce307db32b0e693cfab11b53c9c462c456edd_1280.jpg",
            shortDescription: "Climb the iconic Lion Rock and explore the ancient royal citadel of Sigiriya.",
            description: "Sigiriya Rock Fortress, a UNESCO World Heritage Site, is renowned for its dramatic 200-meter-high granite peak, ancient royal palace ruins, and exquisite frescoes. Ascend approximately 1,200 steps to reach the summit, passing the famous Mirror Wall and Lion's Paw Terrace. At the top, enjoy panoramic views of lush landscapes and discover the remains of King Kashyapa's 5th-century palace. Sigiriya is celebrated as one of Asia's most impressive archaeological sites."
          },
          {
            title: "Dambulla Cave Temple",
            imagePreview: "https://pixabay.com/get/g49bb9f4a1ee60dfa9d7f3db8d3dc7c7cbf51b7a8eea0ec91c93dbb6979af9a095cea4a9be26e02ce2bd5e51e0a5fc7c03c5df22fb0a7cd7fa11290dc3a3c2a22_1280.jpg",
            shortDescription: "Discover Sri Lanka's largest cave temple complex, famed for ancient Buddhist art.",
            description: "The Dambulla Golden Cave Temple, another UNESCO World Heritage Site, features five spectacular caves filled with over 150 Buddha statues and vibrant wall paintings. Dating back more than two millennia, this sacred pilgrimage site offers a unique glimpse into Sri Lanka's Buddhist heritage. Admire intricate murals, impressive statues, and the serene atmosphere that has drawn travelers and devotees for centuries."
          }
        ],
        mapLink: "https://www.google.com/maps/d/embed?mid=1kUeMB-sigiriya-dambulla-tour-map&hl=en",
        gallery: [
          "https://pixabay.com/get/ge873304aac92154d4e9587c9614f77b133f4d1b12233f27eecaf54d2b5620a637a65afa978023ec0816e993849fdafa4fdcd10130be56b66496118145b7fde81_1280.jpg",
          "https://pixabay.com/get/g3fe4cdfa53cc79c4f8b2a3ce56b7ef2e16b7a40b5433407cfbf82a8a47a94f5e38eb9b28a2c59af686acd2fd0a6ce307db32b0e693cfab11b53c9c462c456edd_1280.jpg",
          "https://pixabay.com/get/g49bb9f4a1ee60dfa9d7f3db8d3dc7c7cbf51b7a8eea0ec91c93dbb6979af9a095cea4a9be26e02ce2bd5e51e0a5fc7c03c5df22fb0a7cd7fa11290dc3a3c2a22_1280.jpg"
        ],
        metaTitle: "Sigiriya & Dambulla Day Tour | UNESCO World Heritage Sites Sri Lanka",
        metaDescription: "Book your Sigiriya & Dambulla Day Tour to explore Sri Lanka's top UNESCO World Heritage Sites. Climb Sigiriya Rock Fortress, visit Dambulla Cave Temple, and enjoy expert local guidance on this unforgettable cultural adventure.",
        keywords: [
          "Sigiriya tour",
          "Dambulla tour",
          "Sri Lanka UNESCO tours",
          "Sigiriya Rock Fortress",
          "Dambulla Cave Temple",
          "Cultural tours Sri Lanka",
          "Day trips from Colombo",
          "Ancient sites Sri Lanka"
        ],
        canonicalUrl: "https://travel-sri-lanka.com/tours/sigiriya-dambulla-tour",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          "name": "Sigiriya & Dambulla UNESCO Heritage Day Tour",
          "description": "Discover Sri Lanka's UNESCO World Heritage Sites on a guided day tour to Sigiriya Rock Fortress and Dambulla Cave Temple. Includes expert guide, transfers, and skip-the-line entry.",
          "image": [
            "https://pixabay.com/get/ge873304aac92154d4e9587c9614f77b133f4d1b12233f27eecaf54d2b5620a637a65afa978023ec0816e993849fdafa4fdcd10130be56b66496118145b7fde81_1280.jpg",
            "https://pixabay.com/get/g3fe4cdfa53cc79c4f8b2a3ce56b7ef2e16b7a40b5433407cfbf82a8a47a94f5e38eb9b28a2c59af686acd2fd0a6ce307db32b0e693cfab11b53c9c462c456edd_1280.jpg"
          ],
          "offers": {
            "@type": "Offer",
            "price": "120",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "touristType": "Cultural",
          "provider": {
            "@type": "TravelAgency",
            "name": "Travel Sri Lanka",
            "url": "https://travel-sri-lanka.com"
          }
        }),
        dateCreated: "2025-05-13",
        dateModified: "2025-05-13",
        author: "Travel Sri Lanka",
        category: "Cultural Tours"
      },
      {
        title: "Galle Heritage Explorer Tour",
        slug: "galle-heritage-explorer-tour",
        shortDescription: "Journey through Sri Lanka's colonial past, vibrant culture, and coastal wonders with our immersive Galle Heritage Explorer Tour.",
        description: `Discover the best of Sri Lanka's southern coast on our Galle Heritage Explorer Tour-a curated day trip that blends history, culture, and natural beauty. Step back in time at the UNESCO-listed Galle Fort, Asia's best-preserved colonial fortress, where cobblestone streets, Dutch and British architecture, and panoramic ocean views await. Witness the iconic stilt fishermen balancing above the waves, a living tradition unique to the region.

    Visit the scenic Handugala Tea Plantation and Factory in Ahangama to learn about Sri Lanka's world-famous Ceylon tea, from leaf to cup. At the Habaraduwa Turtle Hatchery, engage with vital marine conservation efforts and, if lucky, help release baby turtles into the sea. Reflect on resilience and remembrance at the Tsunami Museum (optional), honoring the lives and stories shaped by the 2004 disaster. Conclude your journey atop the lush Roomassala headland, offering breathtaking views.

    This expertly guided tour is perfect for history enthusiasts, nature lovers, and anyone seeking an authentic Sri Lankan experience. Enjoy comfortable transfers, insightful commentary, and unforgettable moments at every stop.`,
        imageUrl: "https://yourcdn.com/images/galle-tour-cover.jpg",
        rating: 4.9,
        price: 110,
        duration: 1,
        isFeatured: true,
        places: [
          {
            title: "Galle Fort",
            imagePreview: "https://yourcdn.com/images/galle-fort.jpg",
            shortDescription: "Explore Sri Lanka's UNESCO World Heritage fortress with centuries of colonial history.",
            description: "Galle Fort, a UNESCO World Heritage Site, is a remarkable fortified city on Sri Lanka's southwest coast. Built by the Portuguese in 1588 and extensively fortified by the Dutch in the 17th century, it showcases a unique blend of European architecture and South Asian traditions. Wander its well-preserved ramparts, bastions, and grid-patterned streets lined with colonial-era churches, mosques, and boutique shops. The fort's rich history, vibrant present-day culture, and spectacular Indian Ocean views make it a must-visit destination."
          },
          {
            title: "Stilt Fishermen",
            imagePreview: "https://yourcdn.com/images/stilt-fishermen.jpg",
            shortDescription: "Witness the iconic stilt fishermen practicing a unique and photogenic coastal tradition.",
            description: "Experience one of Sri Lanka's most iconic sights as local fishermen balance on slender poles above the Indian Ocean's waves. This traditional fishing method, passed down through generations, offers a glimpse into the ingenuity and resilience of coastal communities. Capture unforgettable photos and learn about the challenges and history behind this living heritage."
          },
          {
            title: "Handugala Tea Plantation & Factory (Ahangama)",
            imagePreview: "https://yourcdn.com/images/handugala-tea.jpg",
            shortDescription: "Tour a working tea plantation and discover the secrets of Ceylon tea.",
            description: "Immerse yourself in Sri Lanka's tea culture at the Handugala Tea Plantation in Ahangama. Walk through lush tea fields, observe the plucking and processing of tea leaves, and enjoy a tasting session of freshly brewed Ceylon tea. Learn about the plantation's history and the vital role of tea in Sri Lanka's economy and heritage."
          },
          {
            title: "Habaraduwa Turtle Hatchery",
            imagePreview: "https://yourcdn.com/images/habaraduwa-turtle.jpg",
            shortDescription: "Support marine conservation and meet rescued sea turtles at this renowned hatchery.",
            description: "The Habaraduwa Turtle Hatchery is dedicated to the rescue, rehabilitation, and release of endangered sea turtles along Sri Lanka's southern coast. Visitors can observe various turtle species, learn about conservation efforts, and, during hatching season, participate in releasing baby turtles into the ocean. The hatchery plays a crucial role in protecting marine biodiversity and educating the public about environmental stewardship."
          },
          {
            title: "Tsunami Museum (Optional)",
            imagePreview: "https://yourcdn.com/images/tsunami-museum.jpg",
            shortDescription: "Reflect on the 2004 tsunami's impact and Sri Lanka's remarkable recovery.",
            description: "The Tsunami Museum offers a poignant and educational experience, documenting the devastation of the 2004 Indian Ocean tsunami and the resilience of local communities. Exhibits include photographs, survivor stories, and artifacts, providing insight into both the tragedy and the ongoing efforts to rebuild and support those affected."
          },
          {
            title: "Roomassala",
            imagePreview: "https://yourcdn.com/images/roomassala.jpg",
            shortDescription: "Enjoy panoramic views and tranquil nature atop this legendary headland.",
            description: "Roomassala is a scenic hill offering sweeping vistas of the Galle coastline and the Indian Ocean. Steeped in local legend and biodiversity, it's a peaceful spot for reflection, nature walks, and photography. The area is also home to the Japanese Peace Pagoda, a symbol of harmony and a popular viewpoint."
          }
        ],
        mapLink: "https://www.google.com/maps/d/embed?mid=1kUeMB-galle-tour-map&hl=en",
        gallery: [
          "https://yourcdn.com/images/galle-fort-sunset.jpg",
          "https://yourcdn.com/images/stilt-fishermen-action.jpg",
          "https://yourcdn.com/images/tea-plantation-tour.jpg",
          "https://yourcdn.com/images/turtle-hatchery-release.jpg",
          "https://yourcdn.com/images/roomassala-view.jpg"
        ],
        metaTitle: "Galle Heritage Explorer Tour | UNESCO Galle Fort, Stilt Fishermen, Turtle Hatchery & More",
        metaDescription: "Book the Galle Heritage Explorer Tour to experience the UNESCO-listed Galle Fort, iconic stilt fishermen, tea plantations, sea turtle conservation, and more. Discover the best of Sri Lanka's southern coast in one unforgettable day.",
        keywords: [
          "Galle Fort tour",
          "UNESCO Galle Fort",
          "Galle day trips",
          "Stilt fishermen Sri Lanka",
          "Tea plantation tours Sri Lanka",
          "Habaraduwa turtle hatchery",
          "Galle sightseeing",
          "Sri Lanka cultural tours"
        ],
        canonicalUrl: "https://yourdomain.com/tours/galle-heritage-explorer-tour",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          "name": "Galle Heritage Explorer Tour",
          "description": "Explore the UNESCO-listed Galle Fort, witness stilt fishermen, visit tea plantations, support turtle conservation at Habaraduwa, and more on this guided day tour of Sri Lanka's southern coast.",
          "image": [
            "https://yourcdn.com/images/galle-fort-sunset.jpg",
            "https://yourcdn.com/images/stilt-fishermen-action.jpg",
            "https://yourcdn.com/images/tea-plantation-tour.jpg"
          ],
          "offers": {
            "@type": "Offer",
            "price": "110",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "touristType": "Cultural",
          "provider": {
            "@type": "TravelAgency",
            "name": "Your Brand Name",
            "url": "https://yourdomain.com"
          }
        }),
        dateCreated: "2025-05-13",
        dateModified: "2025-05-13",
        author: "Your Brand Name",
        category: "Cultural Tours"
      },
      {
        title: "Colombo City Highlights Tour",
        slug: "colombo-city-tour",
        shortDescription: "Experience Colombo's rich heritage, vibrant culture, and modern marvels on a guided city tour featuring temples, colonial landmarks, shopping, and more.",
        description: `
    Discover the dynamic spirit of Sri Lanka's capital with our Colombo City Highlights Tour. This expertly guided day trip blends the city's ancient Buddhist traditions, colonial-era architecture, bustling markets, and contemporary attractions. Visit the iconic Gangaramaya Buddhist Temple, a masterpiece of multicultural design set beside tranquil Beira Lake, and admire the striking Red Mosque in the heart of Pettah.

    Stroll through Independence Arcade and Square, a symbol of Sri Lanka's freedom and a hub for modern shopping and dining. Explore the historic Old Dutch Hospital, now a vibrant shopping and dining precinct, and ascend the Lotus Tower (optional), South Asia's tallest structure, for panoramic city views. Relax at Galle Face Green, Colombo's beloved oceanfront promenade, and browse luxury brands at One Galle Face Mall. Complete your journey at the Gem Museum in Kollupitiya.

    This immersive tour is perfect for first-time visitors and seasoned travelers alike, offering a seamless blend of history, culture, and urban excitement. Enjoy comfortable transfers, insightful commentary, and unforgettable experiences in the heart of Colombo.
  `,
        imageUrl: "https://yourcdn.com/images/colombo-tour-cover.jpg",
        rating: 4.7,
        price: 95,
        duration: 1,
        isFeatured: true,
        places: [
          {
            title: "Gangaramaya Buddhist Temple",
            imagePreview: "https://yourcdn.com/images/gangaramaya-temple.jpg",
            shortDescription: "Explore Colombo's most iconic Buddhist temple, renowned for its eclectic architecture and lakeside setting.",
            description: "Gangaramaya Temple is a must-visit landmark in Colombo, celebrated for its blend of Sri Lankan, Thai, Indian, and Chinese architectural styles. Founded in the late 19th century beside Beira Lake, the temple houses an impressive array of Buddha statues, intricate carvings, and a museum filled with rare artifacts. The temple is a vibrant center for spirituality, culture, and learning, and hosts colorful festivals that attract visitors from around the world."
          },
          {
            title: "Independence Arcade & Square",
            imagePreview: "https://yourcdn.com/images/independence-arcade.jpg",
            shortDescription: "Visit Colombo's grand Independence Square and its colonial-era shopping arcade.",
            description: "Independence Square is a national monument commemorating Sri Lanka's independence from British rule. The adjacent Independence Arcade, housed in a beautifully restored colonial building, features boutique shops, cafes, and art galleries. The area is perfect for leisurely strolls, photos, and soaking in Colombo's blend of history and modern lifestyle."
          },
          {
            title: "Old Dutch Hospital (Shopping & Dining)",
            imagePreview: "https://yourcdn.com/images/old-dutch-hospital.jpg",
            shortDescription: "Shop and dine in Colombo's oldest colonial building, now a trendy urban precinct.",
            description: "The Old Dutch Hospital, dating back to the 17th century, is one of Colombo's oldest and best-preserved colonial structures. Today, it's a bustling hub filled with upscale boutiques, restaurants, and bars. Enjoy the unique blend of history and modernity as you explore this architectural gem in the heart of the city."
          },
          {
            title: "Lotus Tower (Optional)",
            imagePreview: "https://yourcdn.com/images/lotus-tower.jpg",
            shortDescription: "Ascend South Asia's tallest tower for breathtaking 360-degree views of Colombo.",
            description: "The Lotus Tower, a striking symbol of modern Colombo, stands at 350 meters and offers panoramic views of the city and coastline. The tower features observation decks, restaurants, and entertainment venues, making it a must-visit for those seeking a unique perspective on Sri Lanka's capital."
          },
          {
            title: "Red Mosque (Jami Ul-Alfar Mosque)",
            imagePreview: "https://yourcdn.com/images/red-mosque.jpg",
            shortDescription: "Marvel at the iconic red-and-white striped mosque in bustling Pettah.",
            description: "The Jami Ul-Alfar Mosque, popularly known as the Red Mosque, is one of Colombo's most photographed landmarks. Its unique candy-striped façade and Indo-Saracenic architecture make it a standout attraction. Located in the heart of the Pettah market district, the mosque is a vibrant symbol of Colombo's multicultural heritage."
          },
          {
            title: "Galle Face Green",
            imagePreview: "https://yourcdn.com/images/galle-face.jpg",
            shortDescription: "Relax at Colombo's famous oceanfront promenade and mingle with locals.",
            description: "Galle Face Green is a sprawling seaside park popular for evening strolls, kite flying, and sampling local street food. Overlooking the Indian Ocean, it's the perfect spot to unwind, watch the sunset, and experience the lively atmosphere of Colombo's waterfront."
          },
          {
            title: "One Galle Face Shopping Mall",
            imagePreview: "https://yourcdn.com/images/one-galle-face.jpg",
            shortDescription: "Indulge in luxury shopping and dining at Colombo's premier lifestyle mall.",
            description: "One Galle Face Mall is Colombo's largest and most modern shopping destination, featuring international brands, gourmet restaurants, and entertainment options. Its prime location near Galle Face Green makes it a favorite for both locals and visitors seeking a world-class retail experience."
          },
          {
            title: "Gem Museum - Kollupitiya",
            imagePreview: "https://yourcdn.com/images/gem-museum.jpg",
            shortDescription: "Discover Sri Lanka's legendary gems and jewelry heritage.",
            description: "The Gem Museum in Kollupitiya showcases Sri Lanka's rich legacy as the 'Island of Gems.' Explore dazzling displays of sapphires, rubies, and other precious stones, and learn about the country's centuries-old gem mining and craftsmanship traditions. The museum is an essential stop for gem enthusiasts and those seeking unique souvenirs."
          }
        ],
        mapLink: "https://www.google.com/maps/d/embed?mid=1kUeMB-colombo-tour-map&hl=en",
        gallery: [
          "https://yourcdn.com/images/colombo-gangaramaya.jpg",
          "https://yourcdn.com/images/colombo-independence.jpg",
          "https://yourcdn.com/images/colombo-dutch-hospital.jpg",
          "https://yourcdn.com/images/colombo-lotus-tower.jpg",
          "https://yourcdn.com/images/colombo-red-mosque.jpg",
          "https://yourcdn.com/images/colombo-galle-face.jpg"
        ],
        metaTitle: "Colombo City Highlights Tour | Gangaramaya Temple, Red Mosque, Lotus Tower & More",
        metaDescription: "Book the Colombo City Highlights Tour to explore Gangaramaya Temple, Independence Square, Red Mosque, Galle Face, top shopping malls, and the Gem Museum. Discover the best of Colombo in one unforgettable day.",
        keywords: [
          "Colombo city tour",
          "Gangaramaya Temple Colombo",
          "Colombo sightseeing",
          "Colombo shopping tour",
          "Red Mosque Colombo",
          "Lotus Tower Colombo",
          "Galle Face Green",
          "Colombo attractions"
        ],
        canonicalUrl: "https://yourdomain.com/tours/colombo-city-tour",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          "name": "Colombo City Highlights Tour",
          "description": "Experience Colombo's top attractions, from the Gangaramaya Buddhist Temple and Red Mosque to Independence Square, Lotus Tower, Galle Face Green, and luxury shopping malls, on a guided city tour.",
          "image": [
            "https://yourcdn.com/images/colombo-gangaramaya.jpg",
            "https://yourcdn.com/images/colombo-independence.jpg",
            "https://yourcdn.com/images/colombo-dutch-hospital.jpg"
          ],
          "offers": {
            "@type": "Offer",
            "price": "95",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "touristType": "Cultural",
          "provider": {
            "@type": "TravelAgency",
            "name": "Your Brand Name",
            "url": "https://yourdomain.com"
          }
        }),
        dateCreated: "2025-05-13",
        dateModified: "2025-05-13",
        author: "Your Brand Name",
        category: "City Tours"
      }
    ];

    tours.forEach(tour => {
      this.createTour(tour);
    });

    // Sample testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        country: "United States",
        imageUrl: "https://pixabay.com/get/g61c4cb6b9d65ff28b2bff72e8d4d0ac67d92a0efdda5eee1d14f5ef51f724b2b40c31cfce9bb9cb8c41bc16e87a2cae7b3d7cc71e32f0e0a3a80af49b673bc38_1280.jpg",
        rating: 5,
        text: "Our Sigiriya and Dambulla tour was the highlight of our Sri Lanka trip! The guide was incredibly knowledgeable and helped us understand the historical significance of these amazing sites. Climbing Sigiriya Rock was challenging but absolutely worth it for the spectacular views. Would highly recommend this tour to anyone visiting Sri Lanka."
      },
      {
        name: "Thomas Schmidt",
        country: "Germany",
        imageUrl: "https://pixabay.com/get/g4dbaa67ab87ab3d05a07a0aadbbf1c5d9be4de98b2a18376cf8cfd1f50a36c9a879d9fa48f56ae02a0fe7d88a2abaccdaa71ef0ec7e74f44e2a8c92824a5b9ed_1280.jpg",
        rating: 4.5,
        text: "Very professional tour company with excellent guides. Our driver was punctual and the vehicle was comfortable with good air conditioning. We learned so much about Sri Lankan culture and history, and the provided lunch was delicious local cuisine. Just be prepared for some serious climbing at Sigiriya!"
      },
      {
        name: "Aiko Tanaka",
        country: "Japan",
        imageUrl: "https://pixabay.com/get/gb68c6c97b401c0a4fcc2e0a0ab55b0c2d4b3b40c4b7a45fcaa2b8e097bbeeb14f0c8b09d02b0cc8a0fc4a1347a4e69b6af36cc5e25d9b5c8fbe93c3c4c3d3dcc_1280.jpg",
        rating: 5,
        text: "The tour was perfectly organized from start to finish. Our guide Sampath shared fascinating stories about the ancient sites and was very attentive to our needs. The cave temples at Dambulla were breathtaking with all the Buddha statues and paintings. This day trip is a must-do experience in Sri Lanka!"
      }
    ];

    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });

    // Sample blog posts
    const blogPosts: InsertBlogPost[] = [
      {
        title: "The Ancient Wonders of Sigiriya: A Traveler's Guide",
        slug: "ancient-wonders-of-sigiriya-guide",
        excerpt: "Discover everything you need to know about visiting the 8th wonder of the world - from historical context to practical tips for climbing Lion Rock.",
        content: `# The Ancient Wonders of Sigiriya: A Traveler's Guide

Sigiriya Rock Fortress is one of Sri Lanka's most iconic and awe-inspiring attractions, drawing visitors from around the world to marvel at its engineering feats and artistic treasures. Rising dramatically from the central plains, this ancient palace complex built atop a massive 200-meter granite rock has fascinated travelers and historians alike.

## Historical Background

Built in the 5th century AD by King Kasyapa (477-495 AD), Sigiriya was designed as a fortress-palace, a masterpiece that combined defensive structures with pleasure gardens, sophisticated hydraulic systems, and stunning frescos. The king chose this impregnable location following his seizure of the throne from his father, King Dhatusena, whom he had murdered.

The complex was abandoned after the king's death and later used as a Buddhist monastery until the 14th century. Today, it stands as one of the best-preserved examples of ancient urban planning, recognized by UNESCO as a World Heritage Site in 1982.

## What to See at Sigiriya

### Water Gardens
The symmetrical water gardens at the base of the rock feature fountains that still work during the rainy season—a remarkable feat of ancient hydraulic engineering.

### Frescoes
Halfway up the rock, a sheltered gallery contains colorful frescoes of feminine figures, believed to represent celestial nymphs or the king's concubines. Only 21 of the original hundreds remain today.

### Mirror Wall
Adjacent to the frescoes is the highly polished "Mirror Wall," once so reflective that the king could see his reflection. It contains over 1,800 pieces of graffiti dating from the 6th to 14th centuries—some of the earliest examples of written Sinhalese.

### Lion's Paw Terrace
Before reaching the summit, visitors encounter massive lion's paws carved from rock—all that remains of a giant lion statue through whose mouth visitors once entered the final ascent.

### Summit Ruins
The palace ruins at the top include foundations of buildings, gardens, and bathing pools. The panoramic views of the surrounding jungle and distant mountains are simply breathtaking.

## Tips for Visitors

1. **Timing**: Start early (opening time is 7 AM) to avoid midday heat and crowds.
2. **Wear**: Comfortable shoes, light clothing, and sun protection.
3. **Bring**: Water, snacks, and a camera with extra batteries.
4. **Climbing**: The climb involves about 1,200 steps and takes 1-2 hours round trip, depending on your pace and how long you spend at the top.
5. **Guides**: Consider hiring a local guide (available at the entrance) for rich historical context.
6. **Combined Tickets**: Consider purchasing a combined ticket if you're also visiting nearby Dambulla Cave Temple.

Visiting Sigiriya is a journey back in time, offering a glimpse into Sri Lanka's ancient civilization and its remarkable achievements in art, architecture, and engineering. As you stand atop this mighty rock fortress, overlooking the vast green landscape below, you'll understand why Sigiriya remains one of South Asia's most extraordinary archaeological sites.`,
        imageUrl: "https://pixabay.com/get/g3fe4cdfa53cc79c4f8b2a3ce56b7ef2e16b7a40b5433407cfbf82a8a47a94f5e38eb9b28a2c59af686acd2fd0a6ce307db32b0e693cfab11b53c9c462c456edd_1280.jpg",
        author: "Samantha Perera",
        authorImageUrl: "https://pixabay.com/get/ga25a35baae2d5a2d9be0a639b3cf01efd7902fba9dd7173a9deb44d8981e057ca54953cf9da4b0682ab72e0b42c7b2ec47e9f5a4cddb2c3d9fc21e1a2af8c85c_1280.jpg",
        publishDate: "2025-04-15",
        tags: ["Sigiriya", "UNESCO Sites", "Travel Tips", "Ancient History", "Sri Lanka"]
      },
      {
        title: "Hidden Gems: Exploring the Caves of Dambulla",
        slug: "hidden-gems-exploring-caves-dambulla",
        excerpt: "Journey into the remarkable Golden Temple of Dambulla, home to five caves filled with 153 Buddha statues and stunning ceiling murals spanning 2,000 years of history.",
        content: `# Hidden Gems: Exploring the Caves of Dambulla

Nestled in the cultural triangle of Sri Lanka, the remarkable cave temple complex of Dambulla stands as a testament to the island's rich Buddhist heritage and artistic tradition. These ancient caves, adorned with an extensive collection of Buddha statues and breathtaking murals, offer visitors a spiritual and visual journey spanning over two millennia of cultural evolution.

## Historical Significance

The Dambulla cave temple, also known as the Golden Temple of Dambulla, dates back to the 1st century BC. King Valagamba (Vattagamini Abhaya), driven from his capital of Anuradhapura by invaders, found refuge in these caves. Upon reclaiming his throne, he transformed the caves into a magnificent temple complex as a gesture of gratitude.

Over subsequent centuries, many Sri Lankan kings contributed to the expansion and embellishment of the cave temples, with major renovations during the Kandyan period (17th and 18th centuries) giving us much of what we see today.

## The Five Cave Temples

### Cave 1: Devaraja Viharaya (Temple of the King of Gods)
The first cave features a 14-meter reclining Buddha statue believed to depict the Buddha's parinirvana (death). The statue of Hindu deity Vishnu is also found here, highlighting the complex religious syncretism in ancient Sri Lanka.

### Cave 2: Maharaja Viharaya (Temple of the Great Kings)
The largest and most impressive cave contains 16 standing and 40 seated Buddha statues. Its painted ceiling narrates important events from Buddha's life and Sri Lankan Buddhist history. The unique water drip system from the ceiling has preserved these paintings for centuries.

### Cave 3: Maha Alut Viharaya (Great New Temple)
Dating from the 18th century during King Kirti Sri Rajasinha's reign, this cave houses 50 Buddha statues, including a significant seated Buddha under a dragon arch.

### Cave 4: Pachima Viharaya (Western Temple)
A smaller cave with 10 Buddha statues, including a beautiful seated Buddha figure in meditation pose.

### Cave 5: Devana Alut Viharaya (Second New Temple)
The newest cave with a reclining Buddha statue and depictions of Hindu deities, showing the continued evolution of the site.

## Artistic Significance

The Dambulla cave murals represent one of the largest and best-preserved collections of temple paintings in South Asia. Covering an area of over 2,100 square meters, these vibrant images depict Buddha's life, important events in Sri Lankan history, and various Jataka tales (stories of Buddha's previous lives).

The artistic styles span different periods, allowing visitors to see the evolution of Sri Lankan Buddhist art from the Anuradhapura period through the Kandyan era.

## Visitor Information

1. **Location**: The caves are situated 160km northeast of Colombo and 72km north of Kandy.
2. **Opening Hours**: 7 AM to 7 PM daily.
3. **Dress Code**: Modest dress is required; shoulders and knees should be covered.
4. **Photography**: Allowed without flash to protect the ancient paintings.
5. **Combined Visit**: Many travelers pair Dambulla with nearby Sigiriya for a full day of exploring the Cultural Triangle's highlights.

The Golden Temple of Dambulla offers a serene and contemplative atmosphere that contrasts with the exhilarating climb of Sigiriya. Together, these two UNESCO World Heritage Sites provide a balanced experience of Sri Lanka's ancient spiritual and royal heritage.`,
        imageUrl: "https://pixabay.com/get/g49bb9f4a1ee60dfa9d7f3db8d3dc7c7cbf51b7a8eea0ec91c93dbb6979af9a095cea4a9be26e02ce2bd5e51e0a5fc7c03c5df22fb0a7cd7fa11290dc3a3c2a22_1280.jpg",
        author: "Raj Mehta",
        authorImageUrl: "https://pixabay.com/get/g6e9d4f95a3e51ce6d3b9daf15e21e9a73642f2851f54889a0bdff83a0be4b5e2a5a68e43d9ad6f8ae52e9eaeb87b5c60af10df6db97c25cf27bc5fbe7eaea52a_1280.jpg",
        publishDate: "2025-04-28",
        tags: ["Dambulla", "Cave Temples", "Buddhism", "Cultural Heritage", "Sri Lanka"]
      }
    ];

    blogPosts.forEach(blogPost => {
      this.createBlogPost(blogPost);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const timestamp = new Date();
    const user: User = { ...insertUser, id, createdAt: timestamp, firstName: insertUser.firstName || null, lastName: insertUser.lastName || null, role: insertUser.role || "user" };
    this.users.set(id, user);
    return user;
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const timestamp = new Date();
    const destination: Destination = { ...insertDestination, id, createdAt: timestamp };
    this.destinations.set(id, destination);
    return destination;
  }

  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    // Return all for now, could add a featured flag to destinations if needed
    return this.getDestinations();
  }

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    return Array.from(this.destinations.values()).find(destination => destination.slug === slug);
  }

  async getTours(
    destination?: string,
    duration?: string,
    priceRange?: string
  ): Promise<Tour[]> {
    let tours = Array.from(this.tours.values());

    // Filter by destination if specified
    if (destination) {
      const dest = await this.getDestinationBySlug(destination);
      if (dest) {
        // This filter is now removed as we don't have destinationId in the tour schema anymore
        // tours = tours.filter((tour) => tour.destinationId === dest.id);
      }
    }

    // Filter by duration if specified
    if (duration) {
      if (duration === "1-3") {
        tours = tours.filter((tour) => tour.duration >= 1 && tour.duration <= 3);
      } else if (duration === "4-7") {
        tours = tours.filter((tour) => tour.duration >= 4 && tour.duration <= 7);
      } else if (duration === "8+") {
        tours = tours.filter((tour) => tour.duration >= 8);
      }
    }

    // Filter by price range if specified
    if (priceRange) {
      if (priceRange === "budget") {
        tours = tours.filter((tour) => tour.price < 200);
      } else if (priceRange === "mid-range") {
        tours = tours.filter((tour) => tour.price >= 200 && tour.price <= 500);
      } else if (priceRange === "luxury") {
        tours = tours.filter((tour) => tour.price > 500);
      }
    }

    return tours;
  }

  async getFeaturedTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.isFeatured);
  }

  async getTourBySlug(slug: string): Promise<Tour | undefined> {
    return Array.from(this.tours.values()).find(tour => tour.slug === slug);
  }

  async getToursByDestination(destinationSlug: string): Promise<Tour[]> {
    const destination = await this.getDestinationBySlug(destinationSlug);
    if (!destination) {
      return [];
    }
    
    // This filter is now removed as we don't have destinationId in the tour schema anymore
    // return Array.from(this.tours.values()).filter(tour => tour.destinationId === destination.id);
    
    // For now, return all tours as we've removed the destination relationship
    return Array.from(this.tours.values());
  }

  async createTour(insertTour: InsertTour): Promise<Tour> {
    const id = this.currentTourId++;
    const timestamp = new Date();
    const tour: Tour = { ...insertTour, id, createdAt: timestamp, isFeatured: insertTour.isFeatured || false };
    this.tours.set(id, tour);
    return tour;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const timestamp = new Date();
    const testimonial: Testimonial = { ...insertTestimonial, id, createdAt: timestamp };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const timestamp = new Date();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      createdAt: timestamp, 
      status: insertBooking.status || "pending",
      tourId: insertBooking.tourId || null,
      userId: insertBooking.userId || null,
      children: insertBooking.children || null,
      specialRequests: insertBooking.specialRequests || null,
      totalPrice: insertBooking.totalPrice || null
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getRelatedBlogPosts(slug: string): Promise<BlogPost[]> {
    const post = await this.getBlogPostBySlug(slug);
    if (!post) {
      return [];
    }

    // Get posts with similar tags
    const allPosts = Array.from(this.blogPosts.values()).filter(p => p.slug !== slug);
    
    // Simple algorithm to find posts with at least one matching tag
    return allPosts
      .filter(p => p.tags.some(tag => post.tags.includes(tag)))
      .slice(0, 3); // Return up to 3 related posts
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const timestamp = new Date();
    const blogPost: BlogPost = { ...insertBlogPost, id, createdAt: timestamp };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const timestamp = new Date();
    const contactMessage: ContactMessage = { ...insertContactMessage, id, createdAt: timestamp };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
}

export const storage = new MemStorage();

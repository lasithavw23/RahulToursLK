import {
  users, destinations, tours, testimonials, bookings, blogPosts, contactMessages,
  type User, type InsertUser, type Destination, type InsertDestination,
  type Tour, type InsertTour, type Testimonial, type InsertTestimonial,
  type Booking, type InsertBooking, type BlogPost, type InsertBlogPost,
  type ContactMessage, type InsertContactMessage
} from "@shared/schema";

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
        thingsToDo: [
          "Visit the Temple of the Tooth Relic",
          "Explore the Royal Botanical Gardens",
          "Take a stroll around Kandy Lake",
          "Watch a traditional Kandyan dance performance",
          "Visit the Ceylon Tea Museum"
        ],
        gallery: [
          "https://pixabay.com/get/g8d2ddffb6d1a9dbf5838d3473b5beff99899803e987c0cc8dc59892a18fde10deee3d7e78aad13ae48bc05a3b78a17c01d70c24044457230ceac4b99f6506e66_1280.jpg",
          "https://pixabay.com/get/g2a5074338a2b6823a7d567b75986089770057a9900a1e3ef063d9be676ff3b5d0ef8406e9309796f7e5149aba4b088877e024536e4cc407874f70a16d52a9767_1280.jpg",
          "https://pixabay.com/get/gd1ec97f470381dddb4bdf5755bf7543efd50cb84613b8787fd2f124749ef6409cc4b473d5f6a52354076ffbf59e5969ea9987f8f42b870494619aaf87bd1a3fe_1280.jpg"
        ]
      },
      {
        name: "Sigiriya",
        slug: "sigiriya",
        shortDescription: "Ancient Rock Fortress & UNESCO Site",
        description: "Sigiriya or Sinhagiri is an ancient rock fortress located in the northern Matale District near the town of Dambulla in the Central Province, Sri Lanka. The name refers to a site of historical and archaeological significance that is dominated by a massive column of rock approximately 180 metres (590 ft) high. According to the ancient Sri Lankan chronicle the Culavamsa, this site was selected by King Kashyapa (477–495 AD) for his new capital.",
        imageUrl: "https://pixabay.com/get/gce14b87940bfe1269086737799e2bd94387e0e59180d7e47180597c501371c28d694412577c62e17bf88161850e16c297eaae540da011dd2d72581bff23c419c_1280.jpg",
        bestTimeToVisit: "The best time to visit Sigiriya is from January to March when the weather is dry and not too hot.",
        thingsToDo: [
          "Climb the Sigiriya Rock Fortress",
          "Explore the ancient frescoes and mirror wall",
          "Visit the nearby Pidurangala Rock",
          "Take a safari at Minneriya National Park",
          "Visit the Dambulla Cave Temple"
        ],
        gallery: [
          "https://pixabay.com/get/gce14b87940bfe1269086737799e2bd94387e0e59180d7e47180597c501371c28d694412577c62e17bf88161850e16c297eaae540da011dd2d72581bff23c419c_1280.jpg",
          "https://pixabay.com/get/g16d294b5389cfbbf074e9636686dda03ecca8ae253bf30c6b487956520834c19d875cbc8dd3812c526dff9a5ed1535766b0095e1b84f3d95d2b940e05331ceca_1280.jpg",
          "https://pixabay.com/get/g60edd6b4aa2f897d4ee77b73fc51a9c7becd912004e0577c2dd1d81dac571d46ac6195da4b1f52e2e8eceb9617c052011c5124611565b4a0b140bca73f387311_1280.jpg"
        ]
      },
      {
        name: "Galle",
        slug: "galle",
        shortDescription: "Dutch Fort & Colonial Architecture",
        description: "Galle is a major city in Sri Lanka, situated on the southwestern tip of the country. It is the capital city of Southern Province and the district of Galle. The city has a rich colonial history, with the Portuguese and Dutch having ruled there from the 16th to the 18th century. The Galle Fort, built first by the Portuguese and then extensively by the Dutch, is a world heritage site and a beautiful blend of European and South Asian architecture.",
        imageUrl: "https://pixabay.com/get/g000f3245a0d1df2b95b01cf5806957c37b1a5e3ef4f81d053aa46c8df844b33c1ceb76eda017429f36c2afa3206cb249d893b27a365808620ec51ae7c4402037_1280.jpg",
        bestTimeToVisit: "The best time to visit Galle is from December to March when the weather is dry and sunny.",
        thingsToDo: [
          "Walk around the historic Galle Fort",
          "Visit the Galle Lighthouse",
          "Explore the Maritime Museum",
          "Shop for local handicrafts",
          "Relax at Unawatuna Beach",
          "Take a day trip to Mirissa for whale watching"
        ],
        gallery: [
          "https://pixabay.com/get/g000f3245a0d1df2b95b01cf5806957c37b1a5e3ef4f81d053aa46c8df844b33c1ceb76eda017429f36c2afa3206cb249d893b27a365808620ec51ae7c4402037_1280.jpg",
          "https://pixabay.com/get/gadeeb6d563a2449a0acafb9d10402756211cc105c4c62d31d7348b4bded21540892ebaaae6f66da6bfbb5dd85a180032fa86c5634cbdd145b3d8efe355e0b38e_1280.jpg",
          "https://pixabay.com/get/ge873304aac92154d4e9587c9614f77b133f4d1b12233f27eecaf54d2b5620a637a65afa978023ec0816e993849fdafa4fdcd10130be56b66496118145b7fde81_1280.jpg"
        ]
      }
    ];

    destinations.forEach(destination => {
      this.createDestination(destination);
    });

    // Sample tours
    const tours: InsertTour[] = [
      {
        title: "Beach Paradise Tour",
        slug: "beach-paradise",
        description: "Experience Sri Lanka's stunning coastline with this 7-day tour that takes you to the most beautiful beaches in the country. From the golden sands of Bentota to the picturesque shores of Mirissa, you'll enjoy swimming, snorkeling, and sunbathing in tropical paradise. The tour includes opportunities for whale watching, water sports, and relaxation at luxury beachfront resorts.",
        shortDescription: "Experience Sri Lanka's stunning coastline with visits to Mirissa, Unawatuna, and Bentota beaches.",
        imageUrl: "https://pixabay.com/get/ge873304aac92154d4e9587c9614f77b133f4d1b12233f27eecaf54d2b5620a637a65afa978023ec0816e993849fdafa4fdcd10130be56b66496118145b7fde81_1280.jpg",
        price: 899,
        duration: 7,
        rating: 4.9,
        isFeatured: true,
        places: [
          {
            title: "Negombo",
            imagePreview: "https://pixabay.com/get/ge873304aac92154d4e9587c9614f77b133f4d1b12233f27eecaf54d2b5620a637a65afa978023ec0816e993849fdafa4fdcd10130be56b66496118145b7fde81_1280.jpg",
            shortDescription: "A coastal town with beautiful beaches and a historic Dutch canal",
            description: "Negombo is a major city situated on the west coast of Sri Lanka, north of the capital Colombo. Its economy is mainly based on tourism and its centuries-old fishing industry. Negombo is known for its long sandy beaches and its busy fish markets. The town has a majority of Roman Catholics and is sometimes called 'Little Rome' due to the many churches in the area."
          },
          {
            title: "Bentota",
            imagePreview: "https://pixabay.com/get/gadeeb6d563a2449a0acafb9d10402756211cc105c4c62d31d7348b4bded21540892ebaaae6f66da6bfbb5dd85a180032fa86c5634cbdd145b3d8efe355e0b38e_1280.jpg",
            shortDescription: "A coastal paradise known for golden beaches and water sports",
            description: "Bentota is a coastal town famous for its stunning golden beaches and array of water sports. Located where the Bentota River meets the Indian Ocean, it offers a perfect blend of seaside relaxation and river adventures. Visitors can enjoy jet skiing, windsurfing, and boat rides along the Bentota River. The area is also home to turtle hatcheries where conservation efforts are helping to protect endangered sea turtles."
          },
          {
            title: "Mirissa",
            imagePreview: "https://pixabay.com/get/g7dcfa9df2f9eb0d37cd90f0aab8bb3917d17e4b6a8794d20cf51da0be101db9f79d0a6ba8deeaa71164482c25f0e0c241f7d1bb051dae58707ee2cefb28fa48d_1280.jpg",
            shortDescription: "A picturesque beach destination known for whale watching",
            description: "Mirissa is a small town on the south coast of Sri Lanka, famous for its stunning crescent-shaped beach and as one of the best spots in the world for whale watching. Between November and April, blue whales and sperm whales can be spotted just a few kilometers offshore. The laid-back atmosphere, palm-fringed beaches, and spectacular sunsets make Mirissa a perfect destination for relaxation."
          }
        ],
        mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4047271.2199384123!2d78.4135179243458!3d7.851732110528847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus",
        gallery: [
          "https://pixabay.com/get/ge873304aac92154d4e9587c9614f77b133f4d1b12233f27eecaf54d2b5620a637a65afa978023ec0816e993849fdafa4fdcd10130be56b66496118145b7fde81_1280.jpg",
          "https://pixabay.com/get/gadeeb6d563a2449a0acafb9d10402756211cc105c4c62d31d7348b4bded21540892ebaaae6f66da6bfbb5dd85a180032fa86c5634cbdd145b3d8efe355e0b38e_1280.jpg",
          "https://pixabay.com/get/g7dcfa9df2f9eb0d37cd90f0aab8bb3917d17e4b6a8794d20cf51da0be101db9f79d0a6ba8deeaa71164482c25f0e0c241f7d1bb051dae58707ee2cefb28fa48d_1280.jpg"
        ],
        metaTitle: "Beach Paradise Tour: 7-Day Sri Lanka Coastal Experience | Travel Sri Lanka",
        metaDescription: "Explore Sri Lanka's stunning beaches on our 7-day Beach Paradise Tour. Visit Negombo, Bentota & Mirissa. Enjoy whale watching, water sports & beachfront resorts.",
        keywords: ["Sri Lanka beaches", "Bentota beach", "Mirissa whale watching", "Sri Lanka coastal tour", "beach holiday Sri Lanka", "Negombo beach", "Sri Lanka water sports"],
        canonicalUrl: "https://travel-sri-lanka.com/tours/beach-paradise",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          "name": "Beach Paradise Tour",
          "description": "Experience Sri Lanka's stunning coastline with this 7-day tour.",
          "touristType": ["Couples", "Beach lovers", "Water sports enthusiasts"],
          "offers": {
            "@type": "Offer",
            "price": 899,
            "priceCurrency": "USD"
          },
          "itinerary": {
            "@type": "ItemList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "Negombo"},
              {"@type": "ListItem", "position": 2, "name": "Bentota"},
              {"@type": "ListItem", "position": 3, "name": "Mirissa"}
            ]
          }
        }),
        category: "Beach Tours"
      },
      {
        title: "Cultural Heritage Tour",
        slug: "cultural-heritage",
        description: "Immerse yourself in Sri Lanka's rich cultural heritage with this comprehensive 10-day tour. Visit ancient cities, sacred temples, and historical monuments as you journey through the island's Cultural Triangle. Explore UNESCO World Heritage sites, witness traditional ceremonies, and connect with local communities to gain insight into Sri Lanka's fascinating history and vibrant culture.",
        shortDescription: "Explore ancient cities, temples, and the rich cultural tapestry of Sri Lanka's heritage sites.",
        imageUrl: "https://pixabay.com/get/g2a5074338a2b6823a7d567b75986089770057a9900a1e3ef063d9be676ff3b5d0ef8406e9309796f7e5149aba4b088877e024536e4cc407874f70a16d52a9767_1280.jpg",
        price: 1199,
        duration: 10,
        rating: 4.8,
        isPopular: false,
        isNew: false,
        itinerary: [
          {
            day: 1,
            title: "Arrival & Transfer to Colombo",
            description: "Welcome to Sri Lanka! Upon arrival at Bandaranaike International Airport, you'll be greeted by your guide and transferred to your hotel in Colombo. Depending on your arrival time, enjoy a brief orientation tour of the city.",
            meals: ["Dinner"],
            accommodation: "Cinnamon Grand or similar"
          },
          {
            day: 2,
            title: "Colombo to Anuradhapura",
            description: "After breakfast, drive to Anuradhapura, Sri Lanka's ancient first capital. Visit the sacred Bodhi Tree, the world's oldest historically documented tree, and explore the ancient ruins including massive dagobas and monuments.",
            meals: ["Breakfast", "Dinner"],
            accommodation: "Palm Garden Village or similar"
          },
          {
            day: 3,
            title: "Anuradhapura & Mihintale",
            description: "Full day exploring Anuradhapura's UNESCO World Heritage sites. In the afternoon, visit Mihintale, the cradle of Buddhism in Sri Lanka, where you'll climb 1,840 steps to reach the summit with panoramic views.",
            meals: ["Breakfast", "Dinner"],
            accommodation: "Palm Garden Village or similar"
          }
        ],
        included: [
          "Accommodation in 4-5 star hotels",
          "Daily breakfast and dinner",
          "Private air-conditioned transportation",
          "Professional English-speaking guide",
          "Entrance fees to all mentioned sites",
          "Traditional cultural performances",
          "Airport transfers"
        ],
        excluded: [
          "International flights",
          "Visa fees",
          "Lunches and beverages",
          "Personal expenses",
          "Tips and gratuities",
          "Travel insurance",
          "Camera and video permits at certain sites"
        ],
        mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4047271.2199384123!2d78.4135179243458!3d7.851732110528847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus",
        gallery: [
          "https://pixabay.com/get/g2a5074338a2b6823a7d567b75986089770057a9900a1e3ef063d9be676ff3b5d0ef8406e9309796f7e5149aba4b088877e024536e4cc407874f70a16d52a9767_1280.jpg",
          "https://pixabay.com/get/g8d2ddffb6d1a9dbf5838d3473b5beff99899803e987c0cc8dc59892a18fde10deee3d7e78aad13ae48bc05a3b78a17c01d70c24044457230ceac4b99f6506e66_1280.jpg",
          "https://pixabay.com/get/gce14b87940bfe1269086737799e2bd94387e0e59180d7e47180597c501371c28d694412577c62e17bf88161850e16c297eaae540da011dd2d72581bff23c419c_1280.jpg"
        ],
        destinationId: 1
      },
      {
        title: "Wildlife Safari Adventure",
        slug: "wildlife-safari",
        description: "Embark on an unforgettable wildlife adventure through Sri Lanka's most magnificent national parks. This 8-day safari tour takes you through diverse ecosystems where you'll have the opportunity to spot majestic elephants, elusive leopards, colorful birds, and other fascinating wildlife in their natural habitats. Expert naturalist guides enhance your experience with their knowledge and tracking skills.",
        shortDescription: "Encounter elephants, leopards, and exotic birds in Sri Lanka's stunning national parks.",
        imageUrl: "https://pixabay.com/get/gd1ec97f470381dddb4bdf5755bf7543efd50cb84613b8787fd2f124749ef6409cc4b473d5f6a52354076ffbf59e5969ea9987f8f42b870494619aaf87bd1a3fe_1280.jpg",
        price: 1349,
        duration: 8,
        rating: 4.7,
        isPopular: false,
        isNew: true,
        itinerary: [
          {
            day: 1,
            title: "Arrival & Transfer to Habarana",
            description: "Welcome to Sri Lanka! Upon arrival at Bandaranaike International Airport, you'll be greeted by your guide and transferred to your hotel in Habarana, a strategic location for exploring the wildlife areas of the Cultural Triangle.",
            meals: ["Dinner"],
            accommodation: "Cinnamon Lodge or similar"
          },
          {
            day: 2,
            title: "Minneriya National Park Safari",
            description: "Morning at leisure. In the afternoon, embark on a jeep safari in Minneriya National Park, famous for its large elephant gatherings, especially during the dry season (August-September) when hundreds of elephants come to the shores of Minneriya Tank.",
            meals: ["Breakfast", "Dinner"],
            accommodation: "Cinnamon Lodge or similar"
          },
          {
            day: 3,
            title: "Habarana to Yala",
            description: "After breakfast, drive to Yala National Park, home to one of the highest leopard densities in the world. En route, visit the Dambulla Cave Temple, a UNESCO World Heritage site. Arrive at your safari lodge in time for an evening safari.",
            meals: ["Breakfast", "Dinner"],
            accommodation: "Jetwing Yala or similar"
          }
        ],
        included: [
          "Accommodation in wildlife lodges and hotels",
          "Daily breakfast and dinner",
          "Private air-conditioned transportation",
          "Professional English-speaking naturalist guide",
          "Jeep safaris in national parks with tracker",
          "Entrance fees to all national parks",
          "Airport transfers"
        ],
        excluded: [
          "International flights",
          "Visa fees",
          "Lunches and beverages",
          "Personal expenses",
          "Tips and gratuities",
          "Travel insurance",
          "Camera fees in national parks"
        ],
        mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4047271.2199384123!2d78.4135179243458!3d7.851732110528847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593cf65a1e9d%3A0xe13da4b400e2d38c!2sSri%20Lanka!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus",
        gallery: [
          "https://pixabay.com/get/gd1ec97f470381dddb4bdf5755bf7543efd50cb84613b8787fd2f124749ef6409cc4b473d5f6a52354076ffbf59e5969ea9987f8f42b870494619aaf87bd1a3fe_1280.jpg",
          "https://pixabay.com/get/g000f3245a0d1df2b95b01cf5806957c37b1a5e3ef4f81d053aa46c8df844b33c1ceb76eda017429f36c2afa3206cb249d893b27a365808620ec51ae7c4402037_1280.jpg",
          "https://pixabay.com/get/g60edd6b4aa2f897d4ee77b73fc51a9c7becd912004e0577c2dd1d81dac571d46ac6195da4b1f52e2e8eceb9617c052011c5124611565b4a0b140bca73f387311_1280.jpg"
        ],
        destinationId: 2
      }
    ];

    tours.forEach(tour => {
      this.createTour(tour);
    });

    // Sample testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        country: "United Kingdom",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100",
        rating: 5.0,
        text: "Our family trip to Sri Lanka was absolutely magical! Our guide Nalinda was knowledgeable and friendly, and the itinerary was perfectly balanced. The wildlife safari was the highlight - we saw elephants up close!"
      },
      {
        name: "Michael Chen",
        country: "Canada",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100",
        rating: 5.0,
        text: "The Cultural Heritage Tour exceeded all my expectations. The ancient cities were breathtaking, and our accommodations were perfect. Dear Sri Lanka took care of every detail, making our trip stress-free and memorable."
      },
      {
        name: "Jessica Müller",
        country: "Germany",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100",
        rating: 4.5,
        text: "As a solo traveler, I felt completely safe and welcomed throughout my Beach Paradise Tour. The guides were professional, the hotels were beautiful, and I made friends with both locals and other travelers."
      }
    ];

    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });

    // Sample blog posts
    const blogPosts: InsertBlogPost[] = [
      {
        title: "Top 10 Beaches in Sri Lanka You Must Visit",
        slug: "top-10-beaches-sri-lanka",
        excerpt: "Discover the most beautiful beaches in Sri Lanka, from the popular stretches of golden sand to hidden coves only locals know about.",
        content: `<p>Sri Lanka, the teardrop-shaped island in the Indian Ocean, is blessed with some of the most beautiful beaches in the world. With nearly 1,600 kilometers of palm-fringed coastline, pristine sands, and azure waters, beach lovers are spoiled for choice.</p>
        <h2>1. Mirissa Beach</h2>
        <p>Located on the southern coast, Mirissa is known for its crescent-shaped beach, calm waters, and spectacular sunsets. It's also a popular spot for whale watching between November and April when blue whales and sperm whales can be spotted offshore.</p>
        <h2>2. Unawatuna Beach</h2>
        <p>Just a short distance from Galle, Unawatuna offers a picturesque bay with golden sands and calm, clear waters perfect for swimming and snorkeling. The beach is lined with restaurants and accommodations to suit all budgets.</p>
        <h2>3. Bentota Beach</h2>
        <p>One of Sri Lanka's most developed beach resorts, Bentota offers water sports, luxury hotels, and a long stretch of golden sand. The Bentota River estuary is perfect for water sports like jet skiing, windsurfing, and banana boat rides.</p>
        <p>These are just a few of the incredible beaches Sri Lanka has to offer. Whether you're looking for water sports, relaxation, wildlife, or nightlife, there's a perfect beach waiting for you in this tropical paradise.</p>`,
        imageUrl: "https://pixabay.com/get/ge873304aac92154d4e9587c9614f77b133f4d1b12233f27eecaf54d2b5620a637a65afa978023ec0816e993849fdafa4fdcd10130be56b66496118145b7fde81_1280.jpg",
        author: "Maya Perera",
        authorImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100",
        publishDate: "May 15, 2023",
        tags: ["Beaches", "Travel Tips", "Photography"]
      },
      {
        title: "A Guide to Sri Lankan Cuisine: Must-Try Dishes",
        slug: "guide-sri-lankan-cuisine",
        excerpt: "Explore the vibrant flavors of Sri Lankan cuisine, from spicy curries to sweet desserts, and learn about the cultural influences that shape this unique food tradition.",
        content: `<p>Sri Lankan cuisine is a vibrant tapestry of flavors influenced by the island's history, colonial past, and geographic location. Known for its complex flavors, liberal use of spices, herbs, and coconut, Sri Lankan food offers a unique culinary experience that shouldn't be missed during your visit.</p>
        <h2>Rice and Curry</h2>
        <p>The staple dish of Sri Lanka is rice and curry, but don't expect just one curry. A typical Sri Lankan rice and curry meal consists of rice served with multiple curries, sambols (spicy condiments), and pickles. Each region has its own variations, but the use of coconut milk, chili, and an array of spices is common throughout.</p>
        <h2>Hoppers (Appa)</h2>
        <p>Hoppers are bowl-shaped pancakes made from fermented rice flour and coconut milk. They can be served plain or with an egg in the center (egg hoppers). Hoppers are typically eaten for breakfast or dinner with various accompaniments like sambols or curries.</p>
        <h2>Kottu Roti</h2>
        <p>A popular street food, Kottu is made by stir-frying chopped flatbread (godamba roti) with spices, vegetables, meat, and eggs. The rhythmic chopping sound of the metal cleaver against the griddle is as much a part of the experience as the dish itself.</p>
        <p>These dishes represent just a small sample of Sri Lanka's rich culinary heritage. When visiting, be sure to try as many local specialties as possible to fully appreciate the island's food culture.</p>`,
        imageUrl: "https://pixabay.com/get/g2a5074338a2b6823a7d567b75986089770057a9900a1e3ef063d9be676ff3b5d0ef8406e9309796f7e5149aba4b088877e024536e4cc407874f70a16d52a9767_1280.jpg",
        author: "Ravi Fernando",
        authorImageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=100",
        publishDate: "June 2, 2023",
        tags: ["Food", "Culture", "Travel Tips"]
      },
      {
        title: "Wildlife Encounters: Safari Guide to Sri Lanka",
        slug: "wildlife-safari-guide-sri-lanka",
        excerpt: "Plan your wildlife safari in Sri Lanka with our comprehensive guide to national parks, best seasons for animal sightings, and essential tips for an unforgettable experience.",
        content: `<p>Sri Lanka may be small in size, but it packs an incredible punch when it comes to wildlife diversity. The island is one of the best places in Asia for wildlife encounters, with elephants, leopards, sloth bears, and hundreds of bird species inhabiting its numerous national parks and reserves.</p>
        <h2>Yala National Park</h2>
        <p>Yala is Sri Lanka's most famous national park and boasts one of the highest leopard densities in the world. Besides the elusive big cat, visitors can spot elephants, sloth bears, crocodiles, and numerous bird species. The park is divided into five blocks, with Block 1 being the most visited due to its high concentration of wildlife.</p>
        <h2>Udawalawe National Park</h2>
        <p>Known for its large elephant population, Udawalawe offers almost guaranteed elephant sightings. The park's open terrain of grasslands and scrub forest makes wildlife viewing relatively easy. The Udawalawe Elephant Transit Home, where orphaned elephant calves are rehabilitated before being released back into the wild, is also worth a visit.</p>
        <h2>Minneriya National Park</h2>
        <p>Famous for "The Gathering," one of the largest wild elephant assemblages in the world, Minneriya is a must-visit during the dry season (July to October). During this time, hundreds of elephants come to the shores of the Minneriya Tank to graze on fresh grass, bathe, and socialize.</p>
        <p>When planning your wildlife safari in Sri Lanka, consider the season, as wildlife viewing opportunities can vary throughout the year. The dry season generally offers better visibility as animals congregate around water sources, and thinner vegetation makes spotting wildlife easier.</p>`,
        imageUrl: "https://pixabay.com/get/gd1ec97f470381dddb4bdf5755bf7543efd50cb84613b8787fd2f124749ef6409cc4b473d5f6a52354076ffbf59e5969ea9987f8f42b870494619aaf87bd1a3fe_1280.jpg",
        author: "David Wilson",
        authorImageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=300",
        publishDate: "July 10, 2023",
        tags: ["Wildlife", "Safari", "Photography", "Adventure"]
      }
    ];

    blogPosts.forEach(blogPost => {
      this.createBlogPost(blogPost);
    });

    // Sample users
    this.createUser({
      username: "admin",
      password: "password123",
      email: "admin@dearsrilanka.com",
      firstName: "Admin",
      lastName: "User",
      role: "admin"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const timestamp = new Date();
    const user: User = { ...insertUser, id, createdAt: timestamp };
    this.users.set(id, user);
    return user;
  }

  // Destination methods
  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).slice(0, 6);
  }

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    return Array.from(this.destinations.values()).find(
      (destination) => destination.slug === slug,
    );
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    const id = this.currentDestinationId++;
    const timestamp = new Date();
    const destination: Destination = { ...insertDestination, id, createdAt: timestamp };
    this.destinations.set(id, destination);
    return destination;
  }

  // Tour methods
  async getTours(
    destination?: string,
    duration?: string,
    priceRange?: string
  ): Promise<Tour[]> {
    let tours = Array.from(this.tours.values());

    // Filter by destination/category
    if (destination) {
      tours = tours.filter(tour => 
        tour.category?.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Filter by duration
    if (duration) {
      if (duration === "1-3") {
        tours = tours.filter(tour => tour.duration >= 1 && tour.duration <= 3);
      } else if (duration === "4-7") {
        tours = tours.filter(tour => tour.duration >= 4 && tour.duration <= 7);
      } else if (duration === "8-14") {
        tours = tours.filter(tour => tour.duration >= 8 && tour.duration <= 14);
      } else if (duration === "15+") {
        tours = tours.filter(tour => tour.duration >= 15);
      }
    }

    // Filter by price range
    if (priceRange) {
      if (priceRange === "under-500") {
        tours = tours.filter(tour => tour.price < 500);
      } else if (priceRange === "500-1000") {
        tours = tours.filter(tour => tour.price >= 500 && tour.price <= 1000);
      } else if (priceRange === "1000-1500") {
        tours = tours.filter(tour => tour.price > 1000 && tour.price <= 1500);
      } else if (priceRange === "over-1500") {
        tours = tours.filter(tour => tour.price > 1500);
      }
    }

    return tours;
  }

  async getFeaturedTours(): Promise<Tour[]> {
    return Array.from(this.tours.values()).filter(tour => tour.isFeatured).slice(0, 3);
  }

  async getTourBySlug(slug: string): Promise<Tour | undefined> {
    return Array.from(this.tours.values()).find(
      (tour) => tour.slug === slug,
    );
  }

  async getToursByDestination(destinationSlug: string): Promise<Tour[]> {
    // Since we've removed destinationId from tours, we'll just return all tours
    // In a real implementation, you might want to use tags or a category system instead
    return Array.from(this.tours.values()).filter(
      (tour) => tour.category?.toLowerCase().includes(destinationSlug.toLowerCase()),
    );
  }

  async createTour(insertTour: InsertTour): Promise<Tour> {
    const id = this.currentTourId++;
    const timestamp = new Date();
    const tour: Tour = { ...insertTour, id, createdAt: timestamp };
    this.tours.set(id, tour);
    return tour;
  }

  // Testimonial methods
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

  // Booking methods
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const timestamp = new Date();
    const booking: Booking = { ...insertBooking, id, createdAt: timestamp };
    this.bookings.set(id, booking);
    return booking;
  }

  // Blog Post methods
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }

  async getRelatedBlogPosts(slug: string): Promise<BlogPost[]> {
    const post = await this.getBlogPostBySlug(slug);
    if (!post) {
      return [];
    }
    
    // Get posts with at least one matching tag, excluding the current post
    return Array.from(this.blogPosts.values())
      .filter(p => 
        p.slug !== slug && 
        p.tags.some(tag => post.tags.includes(tag))
      )
      .slice(0, 3);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const timestamp = new Date();
    const blogPost: BlogPost = { ...insertBlogPost, id, createdAt: timestamp };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Contact Message methods
  async createContactMessage(insertContactMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const timestamp = new Date();
    const contactMessage: ContactMessage = { ...insertContactMessage, id, createdAt: timestamp };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
}

export const storage = new MemStorage();

import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertBookingSchema, insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const apiPrefix = "/api";
  
  // Tours routes
  app.get(`${apiPrefix}/tours`, async (req, res) => {
    try {
      const destination = req.query.destination as string | undefined;
      const duration = req.query.duration as string | undefined;
      const priceRange = req.query.priceRange as string | undefined;
      
      const tours = await storage.getTours(destination, duration, priceRange);
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to get tours", error: `${error}` });
    }
  });

  app.get(`${apiPrefix}/tours/featured`, async (req, res) => {
    try {
      const featuredTours = await storage.getFeaturedTours();
      res.json(featuredTours);
    } catch (error) {
      res.status(500).json({ message: "Failed to get featured tours", error: `${error}` });
    }
  });

  app.get(`${apiPrefix}/tours/:slug`, async (req, res) => {
    try {
      const tour = await storage.getTourBySlug(req.params.slug);
      if (!tour) {
        return res.status(404).json({ message: "Tour not found" });
      }
      res.json(tour);
    } catch (error) {
      res.status(500).json({ message: "Failed to get tour", error: `${error}` });
    }
  });

  app.get(`${apiPrefix}/tours/by-destination/:slug`, async (req, res) => {
    try {
      const tours = await storage.getToursByDestination(req.params.slug);
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to get tours by destination", error: `${error}` });
    }
  });

  // Destinations routes
  app.get(`${apiPrefix}/destinations`, async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get destinations", error: `${error}` });
    }
  });

  app.get(`${apiPrefix}/destinations/featured`, async (req, res) => {
    try {
      const featuredDestinations = await storage.getFeaturedDestinations();
      res.json(featuredDestinations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get featured destinations", error: `${error}` });
    }
  });

  app.get(`${apiPrefix}/destinations/:slug`, async (req, res) => {
    try {
      const destination = await storage.getDestinationBySlug(req.params.slug);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: "Failed to get destination", error: `${error}` });
    }
  });

  // Testimonials routes
  app.get(`${apiPrefix}/testimonials`, async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to get testimonials", error: `${error}` });
    }
  });

  // Blog routes
  app.get(`${apiPrefix}/blog-posts`, async (req, res) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get blog posts", error: `${error}` });
    }
  });

  app.get(`${apiPrefix}/blog-posts/:slug`, async (req, res) => {
    try {
      const blogPost = await storage.getBlogPostBySlug(req.params.slug);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to get blog post", error: `${error}` });
    }
  });

  app.get(`${apiPrefix}/blog-posts/related/:slug`, async (req, res) => {
    try {
      const relatedPosts = await storage.getRelatedBlogPosts(req.params.slug);
      res.json(relatedPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get related blog posts", error: `${error}` });
    }
  });

  // Booking routes
  app.post(`${apiPrefix}/bookings`, async (req, res) => {
    try {
      // Create a schema that extends the insert schema with client-side fields
      const bookingRequestSchema = z.object({
        tourType: z.string(),
        startDate: z.string(),
        duration: z.string(),
        adults: z.number().min(1),
        children: z.number().min(0),
        name: z.string(),
        email: z.string().email(),
        specialRequests: z.string().optional(),
      });

      // Validate request body
      const validatedData = bookingRequestSchema.parse(req.body);
      
      // Create booking with available data (would typically look up tour and user)
      const booking = await storage.createBooking({
        tourId: 1, // Would lookup by tourType in a real implementation
        userId: 1, // Would lookup by email or create user if needed
        startDate: validatedData.startDate,
        duration: validatedData.duration,
        adults: validatedData.adults,
        children: validatedData.children || 0,
        specialRequests: validatedData.specialRequests,
        status: "pending",
        totalPrice: 0, // Would calculate based on tour price in a real implementation
      });
      
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking", error: `${error}` });
    }
  });

  // Contact form submission
  app.post(`${apiPrefix}/contact`, async (req, res) => {
    try {
      const contactSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email is required"),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(1, "Message is required"),
      });

      const validatedData = contactSchema.parse(req.body);
      
      const contactMessage = await storage.createContactMessage(validatedData);
      
      res.status(201).json({ 
        message: "Message sent successfully", 
        id: contactMessage.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to send message", error: `${error}` });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

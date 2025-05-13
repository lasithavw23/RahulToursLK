import { pgTable, text, serial, integer, boolean, timestamp, foreignKey, doublePrecision, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  role: true,
});

// Destinations table
export const destinations = pgTable("destinations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  bestTimeToVisit: text("best_time_to_visit").notNull(),
  thingsToDo: text("things_to_do").array().notNull(),
  gallery: text("gallery").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const destinationsRelations = relations(destinations, ({ many }) => ({
  tours: many(tours),
}));

export const insertDestinationSchema = createInsertSchema(destinations).pick({
  name: true,
  slug: true,
  shortDescription: true,
  description: true,
  imageUrl: true,
  bestTimeToVisit: true,
  thingsToDo: true,
  gallery: true,
});

// Tours table
export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  imageUrl: text("image_url").notNull(),
  price: doublePrecision("price").notNull(),
  duration: integer("duration").notNull(),
  rating: doublePrecision("rating").notNull(),
  isFeatured: boolean("is_featured").default(false),
  places: jsonb("places").notNull(),
  mapLink: text("map_link"),
  gallery: text("gallery").array().notNull(),
  
  // SEO Fields
  metaTitle: text("meta_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  keywords: text("keywords").array().notNull(),
  canonicalUrl: text("canonical_url").notNull(),
  structuredData: text("structured_data"),
  
  // Additional SEO Fields
  dateCreated: timestamp("date_created").defaultNow().notNull(),
  dateModified: timestamp("date_modified").defaultNow().notNull(),
  author: text("author"),
  category: text("category"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const toursRelations = relations(tours, ({ many }) => ({
  bookings: many(bookings),
}));

export const insertTourSchema = createInsertSchema(tours).pick({
  title: true,
  slug: true,
  description: true,
  shortDescription: true,
  imageUrl: true,
  price: true,
  duration: true,
  rating: true,
  isFeatured: true,
  places: true,
  mapLink: true,
  gallery: true,
  metaTitle: true,
  metaDescription: true,
  keywords: true,
  canonicalUrl: true,
  structuredData: true,
  author: true,
  category: true,
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  imageUrl: text("image_url").notNull(),
  rating: doublePrecision("rating").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  country: true,
  imageUrl: true,
  rating: true,
  text: true,
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id").references(() => tours.id),
  userId: integer("user_id").references(() => users.id),
  startDate: text("start_date").notNull(),
  duration: text("duration").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").default(0),
  specialRequests: text("special_requests"),
  status: text("status").default("pending").notNull(),
  totalPrice: doublePrecision("total_price"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
  tour: one(tours, {
    fields: [bookings.tourId],
    references: [tours.id],
  }),
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
}));

export const insertBookingSchema = createInsertSchema(bookings).pick({
  tourId: true,
  userId: true,
  startDate: true,
  duration: true,
  adults: true,
  children: true,
  specialRequests: true,
  status: true,
  totalPrice: true,
});

// Blog Posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  author: text("author").notNull(),
  authorImageUrl: text("author_image_url").notNull(),
  publishDate: text("publish_date").notNull(),
  tags: text("tags").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  imageUrl: true,
  author: true,
  authorImageUrl: true,
  publishDate: true,
  tags: true,
});

// Contact Messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Define types 
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

export type InsertTour = z.infer<typeof insertTourSchema>;
export type Tour = typeof tours.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

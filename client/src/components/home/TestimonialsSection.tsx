import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "@/components/common/TestimonialCard";
import { Testimonial } from "@/lib/types";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What Our Guests Say</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Read about the experiences of travelers who have explored Sri Lanka with us.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded-xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !testimonials) {
    return (
      <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What Our Guests Say</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Read about the experiences of travelers who have explored Sri Lanka with us.
            </p>
          </div>
          <div className="text-center text-red-500">
            Error loading testimonials. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-800">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">What Our Guests Say</h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Read about the experiences of travelers who have explored Sri Lanka with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="text-primary dark:text-primary-light font-medium hover:underline inline-flex items-center"
          >
            Read More Reviews
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

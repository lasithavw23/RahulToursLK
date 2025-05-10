import { Testimonial } from "@/lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt"></i>);
    }

    return stars;
  };

  return (
    <div className="testimonial-card bg-white dark:bg-neutral-700 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.imageUrl}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold">{testimonial.name}</h4>
          <p className="text-sm text-neutral-500 dark:text-neutral-300">{testimonial.country}</p>
        </div>
      </div>
      <div className="mb-4">
        <span className="text-accent">
          {renderStars(testimonial.rating)}
        </span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-200">{testimonial.text}</p>
    </div>
  );
}

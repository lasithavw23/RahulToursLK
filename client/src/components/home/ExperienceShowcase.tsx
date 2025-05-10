import { Link } from "wouter";
import { EXPERIENCES } from "@/lib/constants";

export default function ExperienceShowcase() {
  return (
    <section className="py-16 px-4 bg-neutral-900 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Unforgettable Experiences</h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Create memories that will last a lifetime with our handcrafted experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {EXPERIENCES.map((experience, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-6">
              <div className={`w-16 h-16 ${experience.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                <i className={`fas ${experience.icon} text-2xl`}></i>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold mb-2">{experience.title}</h3>
                <p className="text-neutral-300">{experience.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* "Discover All Experiences" button removed as requested */}
      </div>
    </section>
  );
}

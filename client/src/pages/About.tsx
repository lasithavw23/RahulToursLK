import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Rahul Tours Sri Lanka</title>
        <meta
          name="description"
          content="Learn about Rahul Tours Sri Lanka - your trusted partner for authentic Sri Lankan travel experiences. Meet our team and discover our story."
        />
        <link rel="canonical" href="https://rahultoursrilanka.com/about" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src="https://pixabay.com/get/g16d294b5389cfbbf074e9636686dda03ecca8ae253bf30c6b487956520834c19d875cbc8dd3812c526dff9a5ed1535766b0095e1b84f3d95d2b940e05331ceca_1280.jpg"
          alt="Sri Lankan landscape with team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              About Rahul Tours Sri Lanka
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Your trusted partner for authentic Sri Lankan travel experiences
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Founded in 2015, Rahul Tours Sri Lanka was born from a passion
                to share the authentic beauty and culture of Sri Lanka with
                travelers from around the world. What began as a small team of
                local guides with intimate knowledge of the island has grown
                into a leading tour operator specializing in personalized Sri
                Lankan experiences.
              </p>
              <p>
                Our founders, having traveled extensively themselves, recognized
                that the most memorable travel experiences come from genuine
                connections with local people, culture, and nature. This belief
                forms the foundation of every tour we create, ensuring that our
                guests don't just visit Sri Lanka, but truly experience it.
              </p>
              <p>
                Over the years, we've had the privilege of introducing thousands
                of travelers to the wonders of Sri Lanka – from its ancient
                cultural treasures and diverse wildlife to its stunning
                landscapes and culinary delights. We take pride in our
                commitment to responsible tourism, working closely with local
                communities and conservation efforts to ensure that our
                operations benefit the people and places we visit.
              </p>
              <p>
                Today, Rahul Tour Sri Lanka continues to be guided by our
                original mission: to create meaningful, authentic travel
                experiences that showcase the very best of Sri Lanka while
                respecting its natural environment and cultural heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-neutral-50 dark:bg-neutral-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-neutral-700 p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-handshake text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-display font-bold mb-4">
                Authenticity
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                We create genuine experiences that go beyond typical tourist
                attractions, offering insights into the real Sri Lanka through
                connections with local communities and traditions.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-700 p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-leaf text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-display font-bold mb-4">
                Sustainability
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                We are committed to responsible tourism practices that minimize
                environmental impact, support conservation efforts, and
                contribute positively to local economies.
              </p>
            </div>

            <div className="bg-white dark:bg-neutral-700 p-8 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heart text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-display font-bold mb-4">
                Personalization
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                We recognize that each traveler is unique, which is why we
                tailor our tours to match individual interests, preferences, and
                travel styles for truly personal experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-white text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-display font-bold mb-4">
            Ready to Experience Sri Lanka With Us?
          </h2>
          <p className="text-lg mb-8">
            Let our team of local experts create the perfect Sri Lankan
            adventure for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours">
              <Button className="bg-white text-primary hover:bg-neutral-100 hover:text-primary-dark">
                Explore Our Tours
              </Button>
            </Link>
            <Link href="/contact">
              <Button className="bg-transparent border-2 border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

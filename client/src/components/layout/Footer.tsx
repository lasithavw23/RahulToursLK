import { Link } from "wouter";
import {
  SOCIAL_MEDIA,
  QUICK_LINKS,
  POPULAR_TOURS,
  CONTACT_INFO,
  FOOTER_LINKS,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-300 pt-16 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white text-xl font-display font-bold mb-4">
              Rahul Tours Sri Lanka
            </h3>
            <p className="mb-6">
              Your trusted partner for authentic Sri Lankan experiences. We
              craft personalized journeys to showcase the best of our beautiful
              island.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_MEDIA.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-neutral-300 hover:text-white transition"
                  aria-label={`Visit our ${social.icon.replace("fa-", "")} page`}
                >
                  <i className={`fab ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Popular Tours</h4>
            <ul className="space-y-2">
              {POPULAR_TOURS.map((tour, index) => (
                <li key={index}>
                  <Link
                    href={tour.href}
                    className="hover:text-white transition"
                  >
                    {tour.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact Information</h4>
            <ul className="space-y-3">
              {CONTACT_INFO.map((item, index) => (
                <li key={index} className="flex items-start">
                  <i className={`fas ${item.icon} mt-1 mr-3`}></i>
                  <span>{item.info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} Rahul Tours Sri Lanka. All
              rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {FOOTER_LINKS.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

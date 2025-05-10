import { useState } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS } from "@/lib/constants";
import { useTheme } from "@/hooks/use-theme";
import BookingModal from "@/components/booking/BookingModal";

// Import the logo
import logo from "@/assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openBookingModal = () => {
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
  };

  return (
    <header className="bg-white dark:bg-neutral-800 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-4 md:px-6">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <img src={logo} alt="Rahul Tours Sri Lanka" className="h-10 md:h-12" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                location === link.href
                  ? "text-primary dark:text-primary-light"
                  : "text-neutral-700 dark:text-neutral-200 hover:text-primary dark:hover:text-primary-light"
              } font-medium transition`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary-light p-2 rounded-full"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun text-lg"></i>
            ) : (
              <i className="fa-solid fa-moon text-lg"></i>
            )}
          </button>

          <button
            onClick={openBookingModal}
            className="hidden md:inline-block px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition font-medium"
          >
            Book Now
          </button>

          <button
            onClick={toggleMenu}
            className="md:hidden text-neutral-700 dark:text-neutral-200 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <i className="fa-solid fa-bars text-lg"></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-800 shadow-lg absolute w-full z-50">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 ${
                  location === link.href
                    ? "text-primary dark:text-primary-light"
                    : "text-neutral-700 dark:text-neutral-200 hover:text-primary dark:hover:text-primary-light"
                } font-medium`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                openBookingModal();
              }}
              className="block w-full px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition font-medium text-center"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && <BookingModal onClose={closeBookingModal} />}
    </header>
  );
}

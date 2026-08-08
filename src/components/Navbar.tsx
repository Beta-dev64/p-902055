
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
        document.body.style.overflow = '';
      }, 300);
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
      document.body.style.overflow = '';
    }, 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    if (isMenuOpen) {
      closeMenu();
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Software Agency"
        >
          <img 
            src="/logo.svg" 
            alt="Software Agency Logo" 
            className="h-7 sm:h-8" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className="nav-link"
          >
            Home
          </Link>
          {location.pathname === "/" ? (
            <>
              <Link to="/services" className="nav-link">Services</Link>
              <a href="#portfolio" className="nav-link">Portfolio</a>
              <a href="#details" className="nav-link">Contact</a>
            </>
          ) : (
            <>
              <Link to="/services" className="nav-link">Services</Link>
              <Link to="/portfolio" className="nav-link">Portfolio</Link>
              <Link to="/academic" className="nav-link">Academy</Link>
            </>
          )}
          <Link to="/start-project" className="nav-link">Start a project</Link>
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 p-3 focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div style={{ minHeight: "100dvh" }} className={cn(
        "fixed inset-0 z-40 flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
        "bg-white/95 backdrop-blur-xl backdrop-saturate-200",
        "border border-white/20 shadow-2xl",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        {/* Close button inside mobile menu */}
        <button
          onClick={closeMenu}
          className={cn(
            "self-end mb-8 p-2 rounded-full hover:bg-gray-100/80 transition-all duration-300",
            isClosing && "animate-spin"
          )}
        >
          <X size={24} className="text-gray-700" />
        </button>

        <nav className="flex flex-col space-y-8 items-center">
          <Link 
            to="/" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100/80 backdrop-blur-sm" 
            onClick={closeMenu}
          >
            Home
          </Link>
          {location.pathname === "/" ? (
            <>
              <Link
                to="/services"
                className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100/80 backdrop-blur-sm"
                onClick={closeMenu}
              >
                Services
              </Link>
              <a 
                href="#portfolio" 
                className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100/80 backdrop-blur-sm" 
                onClick={closeMenu}
              >
                Portfolio
              </a>
              <a 
                href="#details" 
                className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100/80 backdrop-blur-sm" 
                onClick={closeMenu}
              >
                Contact
              </a>
            </>
          ) : (
            <>
              <Link
                to="/services"
                className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100/80 backdrop-blur-sm"
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link
                to="/portfolio"
                className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100/80 backdrop-blur-sm"
                onClick={closeMenu}
              >
                Portfolio
              </Link>
              <Link
                to="/academic"
                className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100/80 backdrop-blur-sm"
                onClick={closeMenu}
              >
                Academy
              </Link>
            </>
          )}
          <Link
            to="/start-project"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg bg-pulse-500 text-white"
            onClick={closeMenu}
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

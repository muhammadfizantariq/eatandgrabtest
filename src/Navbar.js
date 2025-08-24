import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Star, Clock, Truck, Award, Phone, MapPin, Mail, ShoppingBag, Gift, Heart, Menu, X } from 'lucide-react';
import logo from '../src/assets/logobrand.jpg'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo - Unchanged */}
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Restaurant Logo"
                className="h-8 lg:h-10 w-auto object-contain transition-all duration-300 hover:scale-105"
              />
              <div className="text-white">
                <h1 className="font-bold text-xl lg:text-2xl">Grab & Eat</h1>
                <p className="text-xs text-gray-300 hidden sm:block">
                  Fresh • Fast • Tasty
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links - Unchanged */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }`
                }
              >
                Menu
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/job"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                  }`
                }
              >
                Jobs
              </NavLink>
            </div>

            {/* CTA Button and Mobile Menu - Modified to include hamburger */}
            <div className="flex items-center space-x-3">
              {/* CTA Button - Unchanged */}
              <button 
                onClick={() => navigate("/menu")} 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                ORDER NOW
              </button>

              {/* Mobile Menu Button - NEW */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-white hover:text-yellow-400 focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - NEW */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 pt-2 pb-6 space-y-2 bg-black/95 backdrop-blur-md border-t border-gray-700/50">
            
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center ${
                  isActive
                    ? 'bg-yellow-400 text-black'
                    : 'text-white hover:text-yellow-400 hover:bg-black/50'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center ${
                  isActive
                    ? 'bg-yellow-400 text-black'
                    : 'text-white hover:text-yellow-400 hover:bg-black/50'
                }`
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center ${
                  isActive
                    ? 'bg-yellow-400 text-black'
                    : 'text-white hover:text-yellow-400 hover:bg-black/50'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center ${
                  isActive
                    ? 'bg-yellow-400 text-black'
                    : 'text-white hover:text-yellow-400 hover:bg-black/50'
                }`
              }
            >
              Contact
            </NavLink>

            <NavLink
              to="/job"
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center ${
                  isActive
                    ? 'bg-yellow-400 text-black'
                    : 'text-white hover:text-yellow-400 hover:bg-black/50'
                }`
              }
            >
              Jobs
            </NavLink>
            
            {/* Mobile Order Button */}
            <div className="pt-4 border-t border-gray-700/50">
              <button 
                onClick={() => { navigate('/menu'); closeMenu(); }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>ORDER NOW - Fast Delivery</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - NEW */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Star, Clock, Truck, Award, Phone, MapPin, Mail, ShoppingBag, Gift, Heart, Menu, X, Home, Utensils, Info, Briefcase } from 'lucide-react';
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

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
  };

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: Utensils },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Mail },
    { name: 'Jobs', path: '/job', icon: Briefcase },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isOpen ? 'bg-black/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => handleNavigation('/')}
            >
              <img
                src={logo}
                alt="Restaurant Logo"
                className="h-8 lg:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
              <div className="text-white">
                <h1 className="font-bold text-xl lg:text-2xl group-hover:text-yellow-400 transition-colors">
                  Grab & Eat
                </h1>
                <p className="text-xs text-gray-300 hidden sm:block">
                  Fresh • Fast • Tasty
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
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

            {/* Mobile/Desktop CTA and Menu */}
            <div className="flex items-center space-x-3">
              {/* CTA Button */}
              <button 
                onClick={() => navigate("/menu")} 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 sm:px-4 lg:px-6 py-2 lg:py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-base"
              >
                <span className="hidden sm:inline">ORDER NOW</span>
                <span className="sm:hidden">ORDER</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-white hover:text-yellow-400 focus:outline-none p-2 rounded-lg hover:bg-black/20 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 pt-2 pb-6 space-y-2 bg-black/95 backdrop-blur-md border-t border-gray-700/50">
            
            {/* Mobile Navigation Items */}
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center space-x-3 ${
                    isActive
                      ? 'bg-yellow-400 text-black shadow-lg'
                      : 'text-white hover:text-yellow-400 hover:bg-black/50'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
            
            {/* Mobile Order Button */}
            <div className="pt-4 border-t border-gray-700/50">
              <button 
                onClick={() => handleNavigation('/menu')}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-3 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-[1.02]"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>ORDER NOW - Fast Delivery</span>
              </button>
            </div>
            
            {/* Mobile Contact Info */}
            <div className="pt-4 border-t border-gray-700/50 space-y-3">
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-3">Quick Contact</div>
                <div className="flex justify-center space-x-6">
                  <a 
                    href="tel:+32123456789" 
                    className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">Call Now</span>
                  </a>
                  <div className="flex items-center space-x-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Brussels, Belgium</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Brand Info */}
            <div className="pt-4 border-t border-gray-700/50 text-center">
              <p className="text-gray-400 text-sm">Fresh • Fast • Tasty</p>
              <p className="text-gray-500 text-xs mt-1">© 2024 Grab & Eat</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Nav
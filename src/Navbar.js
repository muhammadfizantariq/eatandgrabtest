import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronRight, Star, Clock, Truck, Award, Phone, MapPin, Mail, ShoppingBag, Gift, Heart } from 'lucide-react';
import logo from '../src/assets/logobrand.jpg'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}

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


          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }`
              }
            >
              Menu
            </NavLink>
            {/* <NavLink
              to="/order"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }`
              }
            >
              Order
            </NavLink> */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/job"
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'
                }`
              }
            >
              Jobs
            </NavLink>
          </div>

          {/* CTA Button */}
          <button onClick={() => navigate("/menu")} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            ORDER NOW
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

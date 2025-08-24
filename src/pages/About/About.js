import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Clock, Users, Award, Heart, ChefHat, Truck, MapPin, Target, Eye, Zap } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md shadow-2xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg lg:text-xl">🍔</span>
            </div>
            <div className="text-white">
              <h1 className="font-bold text-xl lg:text-2xl">Grab & Eat</h1>
              <p className="text-xs text-gray-300 hidden sm:block">Fresh • Fast • Tasty</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium">Home</a>
            <a href="#menu" className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium">Menu</a>
            <a href="#about" className="text-yellow-400 font-bold">About</a>
            <a href="#contact" className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium">Contact</a>
            <a href="#jobs" className="text-white hover:text-yellow-400 transition-colors duration-200 font-medium">Jobs</a>
          </div>

          {/* CTA Button */}
          <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            ORDER NOW
          </button>
        </div>
      </div>
    </nav>
  );
};

const About = () => {
  const [activeSection, setActiveSection] = useState(0);

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: <Users className="w-8 h-8" /> },
    { number: "50+", label: "Menu Items", icon: <ChefHat className="w-8 h-8" /> },
    { number: "15min", label: "Avg Prep Time", icon: <Clock className="w-8 h-8" /> },
    { number: "4.9/5", label: "Customer Rating", icon: <Star className="w-8 h-8" /> }
  ];

  const values = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Made with Love",
      description: "Every burger is crafted with passion and attention to detail. We believe great food comes from the heart."
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Lightning Fast",
      description: "Fresh doesn't mean slow. Our streamlined process ensures you get quality food in record time."
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Premium Quality",
      description: "We source the finest ingredients and never compromise on quality. Every bite should be memorable."
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Customer First",
      description: "Your satisfaction drives everything we do. We're not happy until you're completely satisfied."
    }
  ];

  const story = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Started as a small burger stand with a big dream: to serve the freshest, tastiest burgers in Belgium.",
      image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      year: "2022",
      title: "Growing Strong",
      description: "Expanded our menu and opened our first permanent location, serving thousands of happy customers.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      year: "2024",
      title: "The Future",
      description: "Now serving the best burgers in Belgium with delivery, takeout, and an amazing dining experience.",
      image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % story.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-none">
                    <span className="block">Welcome to</span>
                    <span className="block">
                      <span className="text-red-600">Grab</span>
                      <span className="text-yellow-400"> & Eat</span>
                    </span>
                  </h1>
                  <div className="w-24 h-2 bg-gradient-to-r from-red-600 to-yellow-400 rounded-full"></div>
                </div>
                
                <p className="text-2xl md:text-3xl text-gray-200 font-bold leading-relaxed">
                  Fresh, fast, and full of flavor — that's our promise.
                </p>
                
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  At Grab & Eat, every burger is made fresh to order, fries are crispy golden, 
                  and our menu is packed with bold, mouth-watering choices.
                </p>

                {/* <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25 flex items-center space-x-2">
                  <span>DISCOVER OUR STORY</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  At Grab & Eat, every burger is made fresh to order, fries are crispy golden, 
                  and our menu is packed with bold, mouth-watering choices.
                </p>
                <p>
                  Whether you're grabbing a quick bite, a full meal, or a late-night snack, 
                  we've got you covered.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-600/20 to-yellow-400/20 border-l-4 border-red-600 p-8 rounded-xl">
                  <p className="text-2xl font-bold text-white mb-4">
                    Come hungry, leave happy.
                  </p>
                  <div className="text-xl">
                    <span className="text-red-400 font-bold">Grab it.</span>{' '}
                    <span className="text-yellow-400 font-bold">Eat it.</span>{' '}
                    <span className="text-white font-bold">Love it.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Fresh Burger"
                  className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                FRESH DAILY!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                100% TASTY!
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
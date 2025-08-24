import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Clock, Truck, Award, Phone, MapPin, Mail, ShoppingBag, Gift, Heart } from 'lucide-react';
import { baseURL } from '../../Config';
import logo from '../../assets/logobrand.jpg'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [voucherCode, setVoucherCode] = useState('');
  const [categoryItems, setCategoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "FRESH BURGERS",
      subtitle: "Made Fresh Daily",
      description: "Juicy beef and chicken burgers with premium ingredients"
    },
    {
      image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "CRISPY FRIES",
      subtitle: "Perfect Golden",
      description: "Hand-cut fries cooked to crispy perfection"
    },
    {
      image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "FRESH SHAKES",
      subtitle: "Creamy & Rich",
      description: "Indulgent milkshakes and ice cream treats"
    },
    {
      image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "FAST DELIVERY",
      subtitle: "30 Min Max",
      description: "Hot, fresh fast food delivered to your doorstep"
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Fast Service",
      description: "Ready in 15 minutes"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Delivery",
      description: "Orders above €25"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Fresh Daily",
      description: "Made fresh every day"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Family Friendly",
      description: "Perfect for everyone"
    }
  ];

  const popularItems = [
    {
      name: "Classic Beef Burger",
      price: "€8.99",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      description: "Juicy beef patty with fresh lettuce, tomato, and our special sauce"
    },
    {
      name: "Crispy Chicken Fries",
      price: "€4.99",
      image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      description: "Golden hand-cut fries, perfectly crispy and seasoned"
    },
    {
      name: "Chocolate Milkshake",
      price: "€5.99",
      image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      description: "Rich and creamy chocolate milkshake with whipped cream"
    },
    {
      name: "Chicken Wings",
      price: "€7.99",
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      description: "Spicy buffalo wings with our signature hot sauce"
    },
    {
      name: "Ice Cream Sundae",
      price: "€4.99",
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      description: "Vanilla ice cream with chocolate sauce and sprinkles"
    },
    {
      name: "Loaded Nachos",
      price: "€6.99",
      image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      description: "Crispy nachos loaded with cheese, jalapeños, and salsa"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateVoucher = () => {
    const codes = ['FRESH20', 'TASTY15', 'GRAB25', 'YUMMY30', 'FEAST10'];
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    setVoucherCode(randomCode);
  };


  // Fetch menu items
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${baseURL}/category/getAll`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched menu data:', data);

        if (data?.status === 'success') {
          console.log('inside')
          setCategoryItems(data?.data);
        }
        else {
          console.log('Unexpected data format:', data);
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading Categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">Oops! Something went wrong</p>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight">
                <span className="block text-red-600">{heroSlides[currentSlide].title}</span>
                <span className="block text-yellow-400">{heroSlides[currentSlide].subtitle}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/25 flex items-center space-x-2">
                  <ShoppingBag className="w-6 h-6" />
                  <span onClick={() => navigate("/menu")}>ORDER NOW</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              {voucherCode && (
                <div className="mt-6 p-4 bg-yellow-400 text-black rounded-lg inline-block animate-bounce">
                  <p className="font-bold">Your Discount Code: <span className="text-red-600">{voucherCode}</span></p>
                  <p className="text-sm">Valid for 24 hours • Use at checkout</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-red-600 w-8' : 'bg-white/50 hover:bg-white/75'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose <span className="text-red-600">Grab & Eat</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We deliver more than just food – we deliver an experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700/50"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section id="menu" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              <span className="text-yellow-400">Fast Food</span> We Have
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From burgers to shakes, fries to ice cream - taste what keeps our customers coming back
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryItems.map((item, index) => (
              <div
                key={index}
                className="group bg-black/50 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-700/30"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={logo}
                    alt={item.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm font-semibold">{item.rating}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  <button  onClick={() => navigate("/menu")} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25">
                    View Menu
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/25 flex items-center space-x-2 mx-auto" onClick={() => navigate("/menu")}>
              <span>VIEW FULL MENU</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to <span className="text-yellow-400">Grab & Eat</span>?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their daily dose of deliciousness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl" onClick={() => navigate("/menu")}>
              ORDER NOW
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
              CALL US: +32 123 456 789
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { Star, Heart, Clock, ShoppingCart, Plus, Minus, Filter, Search, X } from 'lucide-react';
import { baseURL } from '../../Config';
import CartCheckout from '../Order/CartCheckout';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on component mount
    try {
      const savedCart = localStorage.getItem('grabEatCart');
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return {};
    }
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseURL}/category/getAll`);
        const data = await response.json();

        if (data && data.status === 'success' && data.data) {
          setApiCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        console.log('Base URL being used:', baseURL);
        const response = await fetch(`${baseURL}/menu/getAll`, {
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

        let menuItemsData = [];

        // Handle different response formats
        if (data && Array.isArray(data)) {
          menuItemsData = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          // If API returns data in nested structure like {status: 'success', data: [...]}
          menuItemsData = data.data;
        } else if (data && data.status === 'success' && data.data && Array.isArray(data.data)) {
          menuItemsData = data.data;
        } else {
          console.log('Unexpected data format:', data);
          setError(true);
          return;
        }

        // Process menu items and fix image URLs
        const processedItems = menuItemsData.map(item => {
          const imageUrl = item.image ? `${baseURL}/${item.image}` : item.imageUrl || null;
          console.log(`Item: ${item.title}, Image path: ${item.image}, Final URL: ${imageUrl}`);
          return {
            ...item,
            imageUrl: imageUrl
          };
        });

        console.log('Processed menu items:', processedItems);
        setMenuItems(processedItems);

        // Extract unique categories
        const uniqueCategories = [...new Set(processedItems.map(item => item.categoryId?.name).filter(Boolean))];
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching menu:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter menu items
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.categoryId?.name === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.isAvailable;
  });

 // Add to cart
  const addToCart = (itemId) => {
    setCart(prev => {
      const newCart = {
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      };
      // Save to localStorage immediately
      try {
        localStorage.setItem('grabEatCart', JSON.stringify(newCart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
      return newCart;
    });
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      // Save to localStorage immediately
      try {
        localStorage.setItem('grabEatCart', JSON.stringify(newCart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
      return newCart;
    });
  };

  // Clear cart (useful after successful order)
  const clearCart = () => {
    setCart({});
    try {
      localStorage.removeItem('grabEatCart');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  // Get cart count for item
  const getCartCount = (itemId) => cart[itemId] || 0;

  // Format price
  const formatPrice = (price) => {
    return `€${(price / 100).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading delicious menu...</p>
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

  console.log('categories',categories)

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative pt-20 h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)`
            }}
          />
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                Our <span className="text-red-600">Menu</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
                Discover our mouth-watering selection of burgers, sides, and treats crafted with love in Belgium
              </p>
              <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3">
                <Heart className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-300 font-semibold">Made Fresh Daily</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-900 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for your favorite dish..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                />
              </div>

              {/* Category Filter - Desktop */}
              <div className="hidden lg:flex items-center space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 bg-gray-800 px-4 py-3 rounded-xl"
              >
                <Filter className="w-5 h-5" />
                <span>Categories</span>
              </button>
            </div>

            {/* Mobile Categories */}
            {showFilters && (
              <div className="lg:hidden mt-4 p-4 bg-gray-800 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Categories</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowFilters(false);
                      }}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-400 mb-4">No items found</p>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-900/50 rounded-3xl overflow-hidden hover:bg-gray-800/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10 group"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          item.imageUrl ||
                          `${baseURL}/${item.image}` ||
                          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                        }
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                        }}
                      />

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                          {item.categoryId?.name}
                        </span>
                      </div>

                      {/* Combo Badge */}
                      {item.combo && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-yellow-500/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-xs font-bold">
                            COMBO
                          </span>
                        </div>
                      )}

                      {/* Price Overlay */}
                      <div className="absolute bottom-3 right-3">
                        <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-full">
                          <span className="text-lg font-black text-yellow-400">
                            {item.price} €
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.desc}</p>

                      {/* Rating Stars (Mock) */}
                      {/* <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-600'
                              }`}
                          />
                        ))}
                        <span className="text-gray-400 text-sm ml-2">(4.2)</span>
                      </div> */}

                      {/* Add to Cart */}
                      <div className="flex items-center justify-between">
                        {getCartCount(item._id) === 0 ? (
                          <button
                            onClick={() => addToCart(item._id)}
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                          >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Add to Cart</span>
                          </button>
                        ) : (
                          <div className="flex-1 flex items-center justify-between bg-gray-800 rounded-xl p-2">
                            <button
                              onClick={() => removeFromCart(item._id)}
                              className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>

                            <span className="text-white font-bold text-lg">
                              {getCartCount(item._id)}
                            </span>

                            <button
                              onClick={() => addToCart(item._id)}
                              className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Floating Cart Summary */}
        {Object.keys(cart).length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => setShowCart(true)}
              className="bg-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-110"
            >
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-10 h-10" />
                <span className="font-bold">
                  {Object.values(cart).reduce((total, count) => total + count, 0)}
                </span>
              </div>
            </button>
          </div>
        )}

        {/* Cart Checkout Modal */}
        {showCart && (
          <CartCheckout
            cart={cart}
            menuItems={menuItems}
            onClose={() => setShowCart(false)}
            onCartUpdate={setCart}
          />
        )}

        {/* Special Offers Section */}
        <section className="py-20 bg-gradient-to-r from-red-900/20 to-yellow-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-black text-white mb-4">
              Special <span className="text-yellow-400">Offers</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Don't miss out on our amazing deals and combo offers!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-500/30 rounded-2xl p-6">
                <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Happy Hour</h3>
                <p className="text-gray-300 text-sm">20% off on all combos from 3-6 PM</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-700/20 border border-yellow-500/30 rounded-2xl p-6">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Family Pack</h3>
                <p className="text-gray-300 text-sm">Buy 3 burgers, get 1 free!</p>
              </div>

              <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 border border-green-500/30 rounded-2xl p-6">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Student Discount</h3>
                <p className="text-gray-300 text-sm">15% off with valid student ID</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


export default Menu;
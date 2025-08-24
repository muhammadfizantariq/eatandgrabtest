import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Receipt, Home, Star, Heart, Phone, Mail, X } from 'lucide-react';
import { baseURL } from '../../Config';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [searchParams] = useSearchParams();
  const sessionId = localStorage.getItem('sessionId')

  console.log("Stripe Session ID:", sessionId);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseURL}/orders/success?session_id=${sessionId}`);
        const data = await response.json();
        
        console.log('Order success data:', data);
        
        if (data.status === 'success') {
          setOrderData(data.data);
        } else {
          setOrderData(data);
        }
      } catch (error) {
        console.error('Error fetching order data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();

    // Countdown timer for auto redirect
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [sessionId, navigate]);

  const formatPrice = (price) => `€${(price / 100).toFixed(2)}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold mb-2">Processing Your Order</h2>
          <p className="text-gray-400">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  if (!sessionId || !orderData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-red-400 mb-4">Order Not Found</h1>
          <p className="text-gray-400 mb-8">We couldn't find your order details. Please contact support if you think this is an error.</p>
          <div className="space-y-4">
            <Link 
              to="/menu" 
              className="block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              Back to Menu
            </Link>
            <Link 
              to="/" 
              className="block bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold transition-all"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Confetti Background Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-32 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Header */}
          <div className="text-center mb-16">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/50 animate-pulse">
                <CheckCircle className="w-20 h-20 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Order <span className="text-green-400">Confirmed!</span>
            </h1>
            
            <div className="max-w-2xl mx-auto mb-8">
              <p className="text-2xl text-gray-200 mb-4">
                🎉 Thank you, <span className="text-yellow-400 font-bold">{orderData.customerName}</span>!
              </p>
              <p className="text-lg text-gray-300">
                Your delicious order is confirmed and we're already preparing it with love!
              </p>
            </div>
            
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-gray-800 to-gray-900 backdrop-blur-sm border border-gray-600 rounded-full px-8 py-4">
              <Receipt className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-300 font-bold text-lg">
                Order ID: #{orderData._id.toString().slice(-8).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            
            {/* Order Details */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <span>Order Summary</span>
              </h2>

              <div className="space-y-6 mb-8">
                {orderData.items.map((item, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600 hover:border-red-500/50 transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-400">
                          <span>Qty: {item.quantity}</span>
                          <span>×</span>
                          <span>{(item.price)} €</span>
                        </div>
                        
                        {/* Mock rating for visual appeal */}
                        {/* <div className="flex items-center space-x-1 mt-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                          <span className="text-gray-400 text-sm ml-2">(4.8)</span>
                        </div> */}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-yellow-400">{(item.total)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-600">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span className="text-lg">Subtotal</span>
                    <span className="text-lg font-semibold">{(orderData.subtotal)} €</span>
                  </div>
                  {/* <div className="flex justify-between text-gray-300">
                    <span className="text-lg">Delivery Fee</span>
                    <span className="text-lg font-semibold">
                      {orderData.deliveryFee === 0 ? (
                        <span className="text-green-400 font-bold">FREE!</span>
                      ) : (
                        (orderData.deliveryFee)
                      )}
                    </span>
                  </div> */}
                  <hr className="border-gray-600 my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">Total Paid</span>
                    <span className="text-3xl font-black text-green-400">{(orderData.totalAmount)} €</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery & Status Info */}
            <div className="space-y-8">
              
              {/* Delivery Information */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <span>Delivery Details</span>
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600">
                    <h3 className="text-xl font-bold text-white mb-4">👤 Customer Information</h3>
                    <div className="space-y-3 text-gray-300">
                      <p><strong className="text-white">Name:</strong> {orderData.customerName}</p>
                      <p><strong className="text-white">Email:</strong> {orderData.customerEmail}</p>
                      <p><strong className="text-white">Phone:</strong> {orderData.customerPhone}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-600">
                    <h3 className="text-xl font-bold text-white mb-4">📍 Delivery Address</h3>
                    <p className="text-gray-300 bg-gray-700 p-4 rounded-xl border border-gray-600">
                      {orderData.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-3xl p-8 border border-green-500/30 shadow-2xl">
                <h2 className="text-2xl font-bold text-green-400 mb-6 flex items-center space-x-3">
                  <Clock className="w-8 h-8" />
                  <span>Order Status</span>
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-lg text-green-300 font-semibold capitalize">
                      {orderData.status} & {orderData.paymentStatus}
                    </span>
                  </div>
                  
                  <div className="bg-green-400/10 rounded-xl p-4 border border-green-400/20">
                    <h3 className="text-green-400 font-bold mb-3">🚀 What's happening now?</h3>
                    <ul className="text-green-300 space-y-2">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Payment confirmed successfully</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>Order sent to kitchen</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-400 animate-spin" />
                        <span>Preparing your delicious meal...</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Estimated delivery: 25-35 minutes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/"
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-red-500/50 flex items-center space-x-3"
              >
                <Home className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                <span>Go to Home</span>
              </Link>
              
              <Link
                to="/menu"
                className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50 flex items-center space-x-3"
              >
                <Heart className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <span>Order Again</span>
              </Link>
            </div>
            
            {/* Auto Redirect Notice */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600 max-w-md mx-auto">
              <p className="text-gray-300 text-lg">
                🕐 Auto redirecting to home in{' '}
                <span className="text-yellow-400 font-bold text-2xl">{countdown}</span> seconds
              </p>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-20">
            <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-800/20 rounded-3xl p-8 border border-yellow-500/30 text-center">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Need Help? We're Here!</h3>
              <p className="text-yellow-200 mb-6 text-lg">
                If you have any questions about your order, our friendly team is ready to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+32123456789"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-bold transition-all inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-yellow-500/25 transform hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  <span>📞 Call Us</span>
                </a>
                <a
                  href="mailto:support@grabandeat.be"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-xl font-bold transition-all inline-flex items-center justify-center space-x-2 shadow-xl hover:shadow-yellow-500/25 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  <span>✉️ Email Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
// src/components/CartCheckout.jsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { X, Plus, Minus, ShoppingCart, CreditCard, MapPin, User, Mail, Phone, Tag, Check, AlertCircle } from 'lucide-react';
import { baseURL, STRIPE_PUBLISHABLE_KEY } from '../../Config';

// Initialize Stripe - Replace with your publishable key
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CartCheckout = ({ cart, menuItems, onClose, onCartUpdate }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    // Promocode state
    const [promocode, setPromocode] = useState('');
    const [promocodeStatus, setPromocodeStatus] = useState(''); // 'loading', 'valid', 'invalid'
    const [promocodeMessage, setPromocodeMessage] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [isPromocodeApplied, setIsPromocodeApplied] = useState(false);

    // Get cart items with details
    const cartItems = Object.entries(cart).map(([itemId, quantity]) => {
        const menuItem = menuItems.find(item => item._id === itemId);
        return {
            ...menuItem,
            quantity,
            total: menuItem.price * quantity
        };
    }).filter(item => item.title); // Filter out any undefined items

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
    const deliveryFee = subtotal > 2000 ? 0 : 299; // Free delivery over €20

    // Calculate discount amount
    const discountAmount = isPromocodeApplied ? (subtotal * discountPercentage / 100) : 0;
    const totalAmount = subtotal - discountAmount;

    // Format price
    const formatPrice = (price) => `€${(price / 100).toFixed(2)}`;

    // Handle input changes
    const handleInputChange = (e) => {
        setCustomerInfo(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Handle quantity change
    const updateQuantity = (itemId, newQuantity) => {
        let newCart;
        if (newQuantity === 0) {
            newCart = { ...cart };
            delete newCart[itemId];
        } else {
            newCart = {
                ...cart,
                [itemId]: newQuantity
            };
        }

        // Update parent component
        onCartUpdate(newCart);

        // Save to localStorage immediately
        try {
            if (Object.keys(newCart).length === 0) {
                localStorage.removeItem('grabEatCart');
            } else {
                localStorage.setItem('grabEatCart', JSON.stringify(newCart));
            }
        } catch (error) {
            console.error('Error updating cart in localStorage:', error);
        }
    };

    // Verify promocode
    const verifyPromocode = async () => {
        if (!promocode.trim()) {
            setPromocodeMessage('Please enter a promocode');
            return;
        }

        if (!customerInfo.email) {
            setPromocodeMessage('Please enter your email first');
            return;
        }

        setPromocodeStatus('loading');
        setPromocodeMessage('Verifying promocode...');

        try {
            const response = await fetch(`${baseURL}/orders/verify-promocode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: promocode.trim(),
                    userEmail: customerInfo.email
                })
            });

            const data = await response.json();

            if (data.valid) {
                setPromocodeStatus('valid');
                setPromocodeMessage(`Promocode applied! ${data.discount}% discount`);
                setDiscountPercentage(data.discount);
                setIsPromocodeApplied(true);
            } else {
                setPromocodeStatus('invalid');
                setPromocodeMessage(data.message);
                setIsPromocodeApplied(false);
                setDiscountPercentage(0);
            }
        } catch (error) {
            console.error('Error verifying promocode:', error);
            setPromocodeStatus('invalid');
            setPromocodeMessage('Error verifying promocode. Please try again.');
            setIsPromocodeApplied(false);
            setDiscountPercentage(0);
        }
    };

    // Remove promocode
    const removePromocode = () => {
        setPromocode('');
        setPromocodeStatus('');
        setPromocodeMessage('');
        setDiscountPercentage(0);
        setIsPromocodeApplied(false);
    };

    console.log('subtotal', subtotal);
    console.log('discountAmount', discountAmount);
    console.log('totalAmount', totalAmount);

    // Handle checkout
    const handleCheckout = async () => {
        if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
            alert('Please fill in all required fields');
            return;
        }

        setIsProcessing(true);

        try {
            const orderData = {
                customerName: customerInfo.name,
                customerEmail: customerInfo.email,
                customerPhone: customerInfo.phone,
                deliveryAddress: customerInfo.address,
                items: cartItems.map(item => ({
                    menuItemId: item._id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity,
                    total: item.total
                })),
                subtotal: subtotal,
                deliveryFee: 0,
                totalAmount: totalAmount,
                // Promocode data
                promocodeUsed: isPromocodeApplied ? promocode.trim() : null,
                discountAmount: discountAmount,
                originalTotal: isPromocodeApplied ? subtotal : null
            };

            console.log('Sending order data:', orderData);

            const response = await fetch(`${baseURL}/orders/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();
            console.log('Checkout response:', data);
            localStorage.setItem('sessionId', data?.sessionId);
            localStorage.removeItem('grabEatCart');

            if (data.status === 'success') {
                const stripe = await stripePromise;

                // Redirect to Stripe Checkout
                const { error } = await stripe.redirectToCheckout({
                    sessionId: data.sessionId
                });

                if (error) {
                    console.error('Stripe error:', error);
                    alert('Payment failed. Please try again.');
                }
            } else {
                alert('Failed to create checkout session');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-gray-900 rounded-3xl p-8 max-w-md w-full text-center">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
                    <p className="text-gray-400 mb-6">Add some delicious items to get started!</p>
                    <button
                        onClick={onClose}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">Your Order</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* Cart Items */}
                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                        <h3 className="text-xl font-bold text-white mb-4">Order Items</h3>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-gray-800 rounded-xl p-4 flex items-center space-x-4">
                                    <img
                                        src={item.imageUrl || `${baseURL}/${item.image}` || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'}
                                        alt={item.title}
                                        className="w-16 h-16 object-cover rounded-lg"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';
                                        }}
                                    />
                                    <div className="flex-1">
                                        <h4 className="text-white font-bold">{item.title}</h4>
                                        <p className="text-gray-400 text-sm">{(item.price)} € each</p>
                                        <p className="text-yellow-400 font-bold">{(item.total)} €</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center"
                                        >
                                            <Minus className="w-4 h-4 text-white" />
                                        </button>
                                        <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center"
                                        >
                                            <Plus className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Promocode Section */}
                        <div className="mt-6 bg-gray-800 rounded-xl p-4">
                            <div className="flex items-center space-x-2 mb-3">
                                <Tag className="w-5 h-5 text-yellow-400" />
                                <h4 className="text-white font-bold">Have a Promocode?</h4>
                            </div>

                            {!isPromocodeApplied ? (
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={promocode}
                                        onChange={(e) => setPromocode(e.target.value.toUpperCase())}
                                        placeholder="Enter promocode"
                                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
                                        disabled={promocodeStatus === 'loading'}
                                    />
                                    <button
                                        onClick={verifyPromocode}
                                        disabled={promocodeStatus === 'loading'}
                                        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 text-black font-bold rounded-lg transition-colors"
                                    >
                                        {promocodeStatus === 'loading' ? 'Checking...' : 'Apply'}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between bg-green-900/50 border border-green-600 rounded-lg p-3">
                                    <div className="flex items-center space-x-2">
                                        <Check className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 font-bold">{promocode}</span>
                                        <span className="text-green-300">({discountPercentage}% OFF)</span>
                                    </div>
                                    <button
                                        onClick={removePromocode}
                                        className="text-red-400 hover:text-red-300 font-bold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}

                            {promocodeMessage && (
                                <div className={`mt-2 p-2 rounded-lg flex items-center space-x-2 ${promocodeStatus === 'valid' ? 'bg-green-900/50 text-green-400' :
                                        promocodeStatus === 'invalid' ? 'bg-red-900/50 text-red-400' :
                                            'bg-blue-900/50 text-blue-400'
                                    }`}>
                                    {promocodeStatus === 'valid' ? (
                                        <Check className="w-4 h-4" />
                                    ) : promocodeStatus === 'invalid' ? (
                                        <AlertCircle className="w-4 h-4" />
                                    ) : (
                                        <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                                    )}
                                    <span className="text-sm">{promocodeMessage}</span>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-6 bg-gray-800 rounded-xl p-4">
                            <div className="flex justify-between text-gray-300 mb-2">
                                <span>Subtotal</span>
                                <span>{(subtotal)} €</span>
                            </div>

                            {isPromocodeApplied && (
                                <div className="flex justify-between text-green-400 mb-2">
                                    <span>Discount ({discountPercentage}% OFF)</span>
                                    <span>-{(discountAmount)} €</span>
                                </div>
                            )}

                            <hr className="border-gray-600 my-2" />
                            <div className="flex justify-between text-white font-bold text-lg">
                                <span>Total</span>
                                <span>{(totalAmount)} €</span>
                            </div>

                            {isPromocodeApplied && (
                                <p className="text-green-400 text-sm mt-2 text-center">
                                    🎉 You saved {(discountAmount)} € with promocode!
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Customer Info & Checkout */}
                    <div className="p-6 bg-gray-850 border-l border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">Delivery Information</h3>

                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                                    <User className="w-4 h-4 text-red-400" />
                                    <span>Full Name *</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-red-400" />
                                    <span>Email Address *</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={customerInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                                    placeholder="Enter your email"
                                    required
                                />
                                {customerInfo.email && promocodeStatus !== 'valid' && (
                                    <p className="text-yellow-400 text-xs mt-1">
                                        💡 Enter your email to use promocodes
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-red-400" />
                                    <span>Phone Number *</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={customerInfo.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50"
                                    placeholder="+32 123 456 789"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                                    <MapPin className="w-4 h-4 text-red-400" />
                                    <span>Delivery Address *</span>
                                </label>
                                <textarea
                                    name="address"
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 resize-vertical"
                                    placeholder="Enter your full delivery address..."
                                    required
                                />
                            </div>
                        </div>

                        {/* Checkout Button */}
                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-2xl hover:shadow-red-500/25 flex items-center justify-center space-x-3"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-6 h-6" />
                                    <span>PROCEED TO PAYMENT • {totalAmount} €</span>
                                </>
                            )}
                        </button>

                        <p className="text-gray-400 text-xs text-center mt-4">
                            🔒 Secure payment powered by Stripe
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCheckout;
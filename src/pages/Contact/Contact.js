import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import { baseURL } from '../../Config';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      const response = await fetch(`${baseURL}/contact/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          subject: formData.subject.trim(),
          message: formData.message.trim()
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero Section */}
      <section className="relative pt-20 h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1577303935007-0d306ee638cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)`
          }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Get in <span className="text-red-600">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              We'd love to hear from you! Drop us a message and we'll get back to you faster than you can say "burger"!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Send us a <span className="text-red-600">Message</span>
            </h2>
            <p className="text-xl text-gray-300">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-3xl p-8 md:p-12">
            {/* Success Message */}
            {showSuccess && (
              <div className="mb-8 p-6 bg-green-600/20 border border-green-600/30 rounded-xl flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="text-green-400 font-bold text-lg">Message Sent Successfully!</h3>
                  <p className="text-green-300">Thank you for reaching out. We'll get back to you within 2 hours.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {showError && (
              <div className="mb-8 p-6 bg-red-600/20 border border-red-600/30 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <div>
                  <h3 className="text-red-400 font-bold text-lg">Oops! Something went wrong</h3>
                  <p className="text-red-300">Please try again or contact us directly at info@grabandeat.be</p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <User className="w-4 h-4 text-red-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-red-500 focus:ring-red-500/50'
                      }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.name}</span>
                    </p>
                  )}
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
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-red-500 focus:ring-red-500/50'
                      }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-red-400" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                    placeholder="+32 123 456 789"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-red-400" />
                    <span>Subject *</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${errors.subject ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-red-500 focus:ring-red-500/50'
                      }`}
                    placeholder="What's your message about?"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-red-400" />
                  <span>Message *</span>
                </label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all resize-vertical ${errors.message ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-red-500 focus:ring-red-500/50'
                    }`}
                  placeholder="Tell us what's on your mind..."
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 shadow-2xl hover:shadow-red-500/25 flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="mt-8 p-6 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
              <p className="text-yellow-300 text-center">
                <strong>💡 Quick Tip:</strong> For urgent matters or immediate orders,
                call us directly at <span className="text-yellow-400 font-bold">+32 123 456 789</span>
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
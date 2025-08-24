import React, { useState } from 'react';
import { User, Mail, Phone, Briefcase, FileText, Upload, Send, CheckCircle, AlertCircle, Clock, Award, Users, Heart } from 'lucide-react';
import { baseURL } from '../../Config';

const JobApplicationPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resumeBase64: '',
    coverLetter: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({});
  const [resumeFileName, setResumeFileName] = useState('');

  // Available positions
  const positions = [
    'Kitchen Helper',
    'Cook',
    'Head Chef',
    'Restaurant Manager',
    'Cashier',
    'Delivery Rider',
    'Server/Waiter',
    'Cleaning Staff',
    'Assistant Manager'
  ];

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

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          resume: 'Please upload a PDF file only'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({
          ...prev,
          resume: 'File size must be less than 5MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          resumeBase64: event.target.result
        }));
        setResumeFileName(file.name);
        setErrors(prev => ({
          ...prev,
          resume: ''
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
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
      const response = await fetch(`${baseURL}/job-applications/create`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          position: formData.position.trim(),
          experience: formData.experience.trim() || undefined,
          resumeBase64: formData.resumeBase64 || undefined,
          coverLetter: formData.coverLetter.trim() || undefined
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setShowSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          position: '',
          experience: '',
          resumeBase64: '',
          coverLetter: ''
        });
        setResumeFileName('');
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Job application error:', error);
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
            backgroundImage: `url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)` 
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Join Our <span className="text-red-600">Team</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
              Be part of Belgium's favorite fast food family! We're looking for passionate people who love great food and excellent service.
            </p>
            <div className="inline-flex items-center space-x-2 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3">
              <Heart className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-semibold">Building the Best Team in Belgium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-center text-white mb-16">
            Why Work with <span className="text-yellow-400">Us</span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Great Team */}
            <div className="bg-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Great Team</h3>
              <p className="text-gray-300 text-sm">Work with passionate people who care about quality</p>
            </div>

            {/* Growth */}
            <div className="bg-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Career Growth</h3>
              <p className="text-gray-300 text-sm">Opportunities to learn and advance your career</p>
            </div>

            {/* Flexible Hours */}
            <div className="bg-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Flexible Hours</h3>
              <p className="text-gray-300 text-sm">Work-life balance that fits your schedule</p>
            </div>

            {/* Competitive Pay */}
            <div className="bg-gray-800/50 rounded-2xl p-8 text-center hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Great Benefits</h3>
              <p className="text-gray-300 text-sm">Competitive salary plus employee perks</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Apply <span className="text-red-600">Today</span>
            </h2>
            <p className="text-xl text-gray-300">
              Fill out the application below and join our amazing team
            </p>
          </div>

          <div className="bg-gray-900/50 rounded-3xl p-8 md:p-12">
            {/* Success Message */}
            {showSuccess && (
              <div className="mb-8 p-6 bg-green-600/20 border border-green-600/30 rounded-xl flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="text-green-400 font-bold text-lg">Application Submitted Successfully!</h3>
                  <p className="text-green-300">Thank you for applying! We'll review your application and get back to you within 2-3 business days.</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {showError && (
              <div className="mb-8 p-6 bg-red-600/20 border border-red-600/30 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <div>
                  <h3 className="text-red-400 font-bold text-lg">Oops! Something went wrong</h3>
                  <p className="text-red-300">Please try again or contact us directly at hr@grabandeat.be</p>
                </div>
              </div>
            )}

            {/* Form */}
            <div className="space-y-6">
              {/* First Name and Last Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <User className="w-4 h-4 text-red-400" />
                    <span>First Name *</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.firstName ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-red-500 focus:ring-red-500/50'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.firstName}</span>
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <User className="w-4 h-4 text-red-400" />
                    <span>Last Name *</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.lastName ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-red-500 focus:ring-red-500/50'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.lastName}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-red-500 focus:ring-red-500/50'
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
                    className={`w-full px-4 py-3 bg-gray-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone ? 'border-red-500 focus:ring-red-500/50' : 'border-gray-600 focus:border-red-500 focus:ring-red-500/50'
                    }`}
                    placeholder="+32 123 456 789"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Position and Experience Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Position */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-red-400" />
                    <span>Position Applied For *</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                    placeholder="e.g., 2 years in restaurant service"
                  />
                  {errors.position && (
                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.position}</span>
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                    <Award className="w-4 h-4 text-gray-400" />
                    <span>Work Experience</span>
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all"
                    placeholder="e.g., 2 years in restaurant service"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Resume/CV</span>
                  <span className="text-gray-400 text-xs">(Optional - PDF only, max 5MB)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white cursor-pointer hover:bg-gray-700/50 transition-all flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-5 h-5" />
                    <span>{resumeFileName || 'Click to upload your resume (PDF)'}</span>
                  </label>
                </div>
                {errors.resume && (
                  <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.resume}</span>
                  </p>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-bold text-white mb-2 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span>Cover Letter</span>
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  name="coverLetter"
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all resize-vertical"
                  placeholder="Tell us why you want to work with Grab & Eat..."
                />
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
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      <span>SUBMIT APPLICATION</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Application Info */}
            <div className="mt-8 p-6 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
              <p className="text-yellow-300 text-center">
                <strong>💡 Application Process:</strong> We'll review your application within 2-3 business days. 
                If selected, we'll contact you for an interview. Questions? Email us at 
                <span className="text-yellow-400 font-bold"> hr@grabandeat.be</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobApplicationPage;
import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
import logo from '../../assets/logobrand.jpg'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to <span className="text-yellow-400">Grab & Eat</span>?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their daily dose of deliciousness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              ORDER NOW
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-red-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
              CALL US: +32 123 456 789
            </button>
          </div>
        </div>
      </section> */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 flex items-center justify-center shadow-lg">
                <img
                  src={logo}
                  alt="Restaurant Logo"
                  className="h-8 lg:h-10 w-auto object-contain transition-all duration-300 hover:scale-105"
                />

              </div>
              <div className="text-white">
                <h1 className="font-bold text-2xl">Grab & Eat</h1>
                <p className="text-sm text-gray-400">Fresh • Fast • Tasty</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Brussels, Belgium</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-5 h-5 text-red-600" />
                <span>+32 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-5 h-5 text-red-600" />
                <span>info@grabandeat.be</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © {currentYear} Grab & Eat. All rights reserved. | Fresh • Fast • Tasty
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

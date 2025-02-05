

import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-gray-300 w-full">
    <footer className="py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* TaskMaster Info */}
        <div>
          <h5 className="text-xl font-bold mb-4 text-gray-100">TaskMaster</h5>
          <p className="text1 text-white-100">
            Boost your productivity and stay on top of your tasks with our
            powerful task management platform.
          </p>
        </div>
  
        {/* Quick Links */}
        <div>
          <h5 className="text-xl font-bold mb-4 text-gray-100">Quick Links</h5>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white no-underline">Dashboard</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white no-underline">Features</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white no-underline">Pricing</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white no-underline">Support</a></li>
          </ul>
        </div>
  
        {/* Resources */}
        <div>
          <h5 className="text-xl font-bold mb-4 text-gray-100">Resources</h5>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white no-underline">Help Center</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white no-underline">Guides</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white no-underline">Blog</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white no-underline">Community</a></li>
          </ul>
        </div>
  
        {/* Contact Us */}
        <div>
          <h5 className="text-xl font-bold mb-4 text-gray-100">Contact Us</h5>
          <p className="text1 text-gray-400">📧 support@taskmaster.com</p>
          <p className="text1 text-gray-400">📞 +962798837302</p>
          <p className="text1 text-gray-400">📍 Amman ,Jordan</p>
        </div>
      </div>
  
      {/* Copyright & Social Media */}
      <div className="flex flex-col sm:flex-row justify-between py-6 border-t border-gray-700 mt-6 text-gray-500 text-sm">
        <p className="text1">&copy; 2024 TaskMaster. All rights reserved.</p>
  
        <div className="flex gap-6 "style={{width:"24%",}}>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook fa-2x"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter fa-2x"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin fa-2x"></i></a>
          <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram fa-2x"></i></a>
        </div>
      </div>
    </footer>
  </div>
  
  );
};

export default Footer;
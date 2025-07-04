import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:hello@iconify-ai.com', label: 'Email' },
  ];

  return (
    <footer className="bg-white/5 backdrop-blur-lg border-t border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Iconify AI</h3>
            <p className="text-white/60 mb-4">
              Create beautiful icons with AI-powered generation. Perfect for modern web and mobile applications.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-xl shadow-soft hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white/60 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Create Icons', 'Gallery', 'Documentation', 'API'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Iconify AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-white/60 text-sm mt-4 sm:mt-0">
            <span>Made with</span>
            <FiHeart className="w-4 h-4 text-red-500" />
            <span>for designers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
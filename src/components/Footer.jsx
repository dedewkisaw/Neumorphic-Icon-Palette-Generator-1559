import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHeart, FiGithub, FiTwitter, FiMail } = FiIcons;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiMail, href: 'mailto:hello@iconify-ai.com', label: 'Email' },
  ];

  return (
    <footer className="bg-white/90 backdrop-blur-sm border-t border-warm-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-warm-800 mb-4">Iconify AI</h3>
            <p className="text-warm-600 mb-4">
              Create beautiful neumorphic icons with AI-powered generation. Perfect for modern web and mobile applications.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white rounded-xl shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300 flex items-center justify-center text-warm-600 hover:text-primary-600"
                  aria-label={social.label}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-warm-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Create Icons', 'Gallery', 'Documentation', 'API'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-warm-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-warm-800 mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-warm-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-warm-600 text-sm">
            © {currentYear} Iconify AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-warm-600 text-sm mt-4 sm:mt-0">
            <span>Made with</span>
            <SafeIcon icon={FiHeart} className="w-4 h-4 text-coral-500" />
            <span>for designers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
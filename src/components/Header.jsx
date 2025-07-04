import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiMenu, FiX, FiSettings, FiUsers, FiEdit3, FiHome } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: FiHome },
    { path: '/creator', label: 'Create Icons', icon: FiZap },
    { path: '/editor', label: 'Editor', icon: FiEdit3 },
    { path: '/community', label: 'Community', icon: FiUsers },
    { path: '/about', label: 'About' }
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-warm-200 shadow-neumorphic-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-2xl shadow-neumorphic-sm flex items-center justify-center group-hover:shadow-neumorphic transition-all duration-300">
              <SafeIcon icon={FiZap} className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-warm-800">Iconify AI</h1>
              <p className="text-xs text-warm-600 -mt-1">Neumorphic Icons</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-neumorphic-sm'
                    : 'text-warm-600 hover:bg-warm-100 hover:text-warm-800 shadow-neumorphic-sm hover:shadow-neumorphic'
                }`}
              >
                {item.icon && <SafeIcon icon={item.icon} className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300"
          >
            {isMenuOpen ? (
              <SafeIcon icon={FiX} className="w-5 h-5 text-warm-600" />
            ) : (
              <SafeIcon icon={FiMenu} className="w-5 h-5 text-warm-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-warm-200"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-3 ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-neumorphic-sm'
                      : 'text-warm-600 hover:bg-warm-100 hover:text-warm-800 shadow-neumorphic-sm hover:shadow-neumorphic'
                  }`}
                >
                  {item.icon && <SafeIcon icon={item.icon} className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
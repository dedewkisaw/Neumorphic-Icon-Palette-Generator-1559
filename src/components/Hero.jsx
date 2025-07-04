import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiDownload, FiPalette, FiTrendingUp, FiPlay, FiBrain, FiUsers, FiAward, FiTarget, FiArrowRight } = FiIcons;

const Hero = () => {
  const [currentIconSet, setCurrentIconSet] = useState([]);
  const [iconSetKey, setIconSetKey] = useState(0);

  // Comprehensive icon pool with categories and colors
  const iconPool = [
    // Business & Finance
    { icon: 'Briefcase', color: '#c84bff', category: 'business' },
    { icon: 'TrendingUp', color: '#f97316', category: 'business' },
    { icon: 'DollarSign', color: '#14b8a6', category: 'finance' },
    { icon: 'PieChart', color: '#ff5757', category: 'analytics' },
    { icon: 'BarChart', color: '#facc15', category: 'analytics' },
    { icon: 'Target', color: '#2dd4bf', category: 'business' },
    
    // Technology
    { icon: 'Smartphone', color: '#8b5cf6', category: 'tech' },
    { icon: 'Monitor', color: '#06b6d4', category: 'tech' },
    { icon: 'Cpu', color: '#84cc16', category: 'tech' },
    { icon: 'Database', color: '#f59e0b', category: 'tech' },
    { icon: 'Cloud', color: '#ef4444', category: 'tech' },
    { icon: 'Wifi', color: '#10b981', category: 'tech' },
    
    // Communication & Social
    { icon: 'MessageCircle', color: '#ec4899', category: 'social' },
    { icon: 'Users', color: '#6366f1', category: 'social' },
    { icon: 'Mail', color: '#f97316', category: 'communication' },
    { icon: 'Phone', color: '#14b8a6', category: 'communication' },
    { icon: 'Share', color: '#c84bff', category: 'social' },
    { icon: 'Heart', color: '#ff5757', category: 'social' },
    
    // Media & Creative
    { icon: 'Camera', color: '#facc15', category: 'media' },
    { icon: 'Video', color: '#2dd4bf', category: 'media' },
    { icon: 'Music', color: '#8b5cf6', category: 'media' },
    { icon: 'Image', color: '#06b6d4', category: 'media' },
    { icon: 'Edit', color: '#84cc16', category: 'creative' },
    { icon: 'Palette', color: '#f59e0b', category: 'creative' },
    
    // Navigation & Interface
    { icon: 'Home', color: '#ef4444', category: 'navigation' },
    { icon: 'Search', color: '#10b981', category: 'interface' },
    { icon: 'Settings', color: '#ec4899', category: 'interface' },
    { icon: 'Menu', color: '#6366f1', category: 'navigation' },
    { icon: 'Grid', color: '#f97316', category: 'interface' },
    { icon: 'Layers', color: '#14b8a6', category: 'interface' },
    
    // E-commerce
    { icon: 'ShoppingCart', color: '#c84bff', category: 'ecommerce' },
    { icon: 'Package', color: '#ff5757', category: 'ecommerce' },
    { icon: 'CreditCard', color: '#facc15', category: 'ecommerce' },
    { icon: 'Gift', color: '#2dd4bf', category: 'ecommerce' },
    { icon: 'Tag', color: '#8b5cf6', category: 'ecommerce' },
    { icon: 'Truck', color: '#06b6d4', category: 'ecommerce' },
    
    // Health & Wellness
    { icon: 'Activity', color: '#84cc16', category: 'health' },
    { icon: 'Shield', color: '#f59e0b', category: 'health' },
    { icon: 'Plus', color: '#ef4444', category: 'health' },
    { icon: 'Zap', color: '#10b981', category: 'health' },
    { icon: 'Sun', color: '#ec4899', category: 'health' },
    { icon: 'Moon', color: '#6366f1', category: 'health' },
    
    // Education & Learning
    { icon: 'Book', color: '#f97316', category: 'education' },
    { icon: 'BookOpen', color: '#14b8a6', category: 'education' },
    { icon: 'GraduationCap', color: '#c84bff', category: 'education' },
    { icon: 'Award', color: '#ff5757', category: 'education' },
    { icon: 'Lightbulb', color: '#facc15', category: 'education' },
    { icon: 'Pencil', color: '#2dd4bf', category: 'education' },
    
    // Travel & Location
    { icon: 'MapPin', color: '#8b5cf6', category: 'travel' },
    { icon: 'Compass', color: '#06b6d4', category: 'travel' },
    { icon: 'Globe', color: '#84cc16', category: 'travel' },
    { icon: 'Plane', color: '#f59e0b', category: 'travel' },
    { icon: 'Mountain', color: '#ef4444', category: 'travel' },
    { icon: 'Navigation', color: '#10b981', category: 'travel' },
    
    // Security & Tools
    { icon: 'Lock', color: '#ec4899', category: 'security' },
    { icon: 'Key', color: '#6366f1', category: 'security' },
    { icon: 'Tool', color: '#f97316', category: 'tools' },
    { icon: 'Wrench', color: '#14b8a6', category: 'tools' },
    { icon: 'Sliders', color: '#c84bff', category: 'tools' },
    { icon: 'ToggleLeft', color: '#ff5757', category: 'tools' }
  ];

  // Generate a random set of 6 icons with smart selection
  const generateRandomIconSet = () => {
    console.log('🎲 Generating new random icon set...');
    
    // Create a copy of the icon pool to avoid mutations
    const availableIcons = [...iconPool];
    const selectedIcons = [];
    const usedCategories = new Set();
    
    // First, try to get diverse categories
    for (let i = 0; i < 6 && availableIcons.length > 0; i++) {
      let selectedIcon;
      
      // Try to find an icon from a new category first
      const unusedCategoryIcons = availableIcons.filter(icon => 
        !usedCategories.has(icon.category)
      );
      
      if (unusedCategoryIcons.length > 0) {
        // Pick randomly from unused categories
        const randomIndex = Math.floor(Math.random() * unusedCategoryIcons.length);
        selectedIcon = unusedCategoryIcons[randomIndex];
        usedCategories.add(selectedIcon.category);
      } else {
        // If all categories are used, pick any remaining icon
        const randomIndex = Math.floor(Math.random() * availableIcons.length);
        selectedIcon = availableIcons[randomIndex];
      }
      
      selectedIcons.push(selectedIcon);
      
      // Remove the selected icon from available icons
      const iconIndex = availableIcons.findIndex(icon => 
        icon.icon === selectedIcon.icon && icon.color === selectedIcon.color
      );
      availableIcons.splice(iconIndex, 1);
    }
    
    console.log('✅ Generated icon set:', selectedIcons.map(icon => `${icon.icon} (${icon.category})`));
    return selectedIcons;
  };

  // Generate icons on component mount and create refresh function
  useEffect(() => {
    const newIconSet = generateRandomIconSet();
    setCurrentIconSet(newIconSet);
    setIconSetKey(Date.now()); // Force re-render with animation
  }, []);

  // Auto-refresh icons every 30 seconds (optional - can be removed if too distracting)
  useEffect(() => {
    const interval = setInterval(() => {
      const newIconSet = generateRandomIconSet();
      setCurrentIconSet(newIconSet);
      setIconSetKey(Date.now());
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Manual refresh function for the demo
  const refreshIcons = () => {
    console.log('🔄 Manually refreshing icons...');
    const newIconSet = generateRandomIconSet();
    setCurrentIconSet(newIconSet);
    setIconSetKey(Date.now());
  };

  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  const features = [
    { icon: FiBrain, text: 'AI-Powered Generation', color: 'from-primary-400 to-primary-600' },
    { icon: FiPalette, text: 'Neumorphic Design System', color: 'from-secondary-400 to-secondary-600' },
    { icon: FiDownload, text: 'Professional SVG Export', color: 'from-teal-400 to-teal-600' },
    { icon: FiUsers, text: 'Community Marketplace', color: 'from-coral-400 to-coral-600' },
  ];

  const handleStartCreating = () => {
    // Navigate directly to the dedicated Create Icons page
    window.location.hash = '#/creator';
  };

  const handleViewCommunity = () => {
    // Navigate to community page
    window.location.hash = '#/community';
  };

  const handleViewEditor = () => {
    // Navigate to editor page
    window.location.hash = '#/editor';
  };

  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary-200/30 to-primary-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/30 to-secondary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-teal-200/30 to-teal-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-coral-200/30 to-coral-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-2xl shadow-neumorphic-sm flex items-center justify-center mr-4">
                <SafeIcon icon={FiBrain} className="w-6 h-6 text-white" />
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-primary-100 via-secondary-100 to-warm-100 rounded-full border border-primary-200 shadow-neumorphic-sm">
                <span className="text-sm font-bold text-primary-700">✨ Professional AI Platform</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-warm-800 mb-8 leading-tight">
              Create Perfect
              <span className="block bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 bg-clip-text text-transparent animate-glow-pulse">
                Icon Palettes
              </span>
              in Seconds
            </h1>

            {/* USP Description */}
            <p className="text-xl sm:text-2xl text-warm-600 mb-12 leading-relaxed max-w-2xl">
              The only platform that combines <strong>advanced AI analysis</strong>, <strong>professional neumorphic design</strong>, and <strong>contextual icon generation</strong> to create perfect icon sets for your brand.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200,75,255,0.4), 0 0 60px rgba(249,115,22,0.2)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartCreating}
                className="px-12 py-5 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-3xl font-bold text-xl shadow-neumorphic-lg hover:shadow-warm-glow transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <SafeIcon icon={FiBrain} className="w-6 h-6" />
                <span>Start Creating</span>
                <SafeIcon icon={FiArrowRight} className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleViewCommunity}
                className="px-12 py-5 bg-white/90 text-warm-700 rounded-3xl font-bold text-xl shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 backdrop-blur-sm border border-warm-200 flex items-center justify-center space-x-3"
              >
                <SafeIcon icon={FiUsers} className="w-5 h-5" />
                <span>Browse Community</span>
              </motion.button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-neumorphic-sm border border-white/50"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-neumorphic-sm`}>
                    <SafeIcon icon={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-warm-700 font-semibold">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Dynamic Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Demo Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic-lg border border-white/60 relative">
              
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-warm-800">AI Icon Generation</h3>
                  <p className="text-warm-600">Professional • Contextual • Instant</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={refreshIcons}
                    className="p-2 bg-primary-100 hover:bg-primary-200 text-primary-600 rounded-xl transition-all duration-300 shadow-neumorphic-sm hover:shadow-neumorphic"
                    title="Generate new random icons"
                  >
                    <SafeIcon icon={FiZap} className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Dynamic Demo Icons Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {currentIconSet.map((iconData, index) => (
                  <motion.div
                    key={`${iconSetKey}-${index}`} // Unique key for animation
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                    className="aspect-square bg-gradient-to-br from-white to-warm-50 rounded-2xl flex items-center justify-center shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300 border border-white/50 relative overflow-hidden"
                    style={{ backgroundColor: iconData.color + '15' }}
                  >
                    <SafeIcon 
                      icon={getIconComponent(iconData.icon)} 
                      className="w-8 h-8 transition-transform duration-200" 
                      style={{ color: iconData.color }}
                    />
                    
                    {/* Category indicator */}
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: iconData.color }}></div>
                  </motion.div>
                ))}
              </div>

              {/* Demo Actions */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleViewEditor}
                  className="flex-1 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl font-semibold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
                >
                  Customize
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-white text-warm-600 rounded-2xl font-semibold border border-warm-200 hover:bg-warm-50 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
                >
                  Export SVG
                </motion.button>
              </div>

              {/* Dynamic indicator */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-green-100 to-teal-100 rounded-full border border-green-200">
                <span className="text-xs font-bold text-green-700">🎲 Dynamic Icons</span>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-neumorphic flex items-center justify-center"
            >
              <SafeIcon icon={FiZap} className="w-8 h-8 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-teal-500 to-primary-500 rounded-xl shadow-neumorphic flex items-center justify-center"
            >
              <SafeIcon icon={FiDownload} className="w-6 h-6 text-white" />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: '50K+', label: 'AI Icons Generated', color: 'from-primary-500 to-secondary-500' },
            { number: '2K+', label: 'Happy Designers', color: 'from-teal-500 to-primary-500' },
            { number: '99%', label: 'Satisfaction Rate', color: 'from-coral-500 to-secondary-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-white/50 text-center"
            >
              <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                {stat.number}
              </div>
              <div className="text-warm-600 font-semibold text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiDownload, FiPalette, FiTrendingUp, FiPlay, FiBrain } = FiIcons;

const Hero = () => {
  const features = [
    { icon: FiBrain, text: 'AI-Powered Generation', color: 'from-primary-400 to-primary-600' },
    { icon: FiPalette, text: 'Multiple Styles & Themes', color: 'from-secondary-400 to-secondary-600' },
    { icon: FiDownload, text: 'One-Click Export', color: 'from-teal-400 to-teal-600' },
    { icon: FiTrendingUp, text: 'Trending Palettes', color: 'from-coral-400 to-coral-600' },
  ];

  const handleStartCreating = () => {
    // Scroll to the palette generator section
    const paletteSection = document.querySelector('#palette-generator');
    if (paletteSection) {
      paletteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewExamples = () => {
    // Navigate to community page
    window.location.hash = '#/community';
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-primary-200/30 to-primary-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/30 to-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-teal-200/30 to-teal-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-coral-200/30 to-coral-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-3xl shadow-neumorphic-lg flex items-center justify-center mr-4">
              <SafeIcon icon={FiBrain} className="w-8 h-8 text-white" />
            </div>
            <div className="px-6 py-2 bg-gradient-to-r from-primary-100 via-secondary-100 to-warm-100 rounded-full border border-primary-200">
              <span className="text-sm font-bold text-primary-700">✨ Now with Advanced AI</span>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-warm-800 mb-8 leading-tight">
            Craft Perfect
            <span className="block bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 bg-clip-text text-transparent animate-glow-pulse">
              AI Icon Palettes
            </span>
            in Seconds
          </h1>
          <p className="text-xl sm:text-2xl text-warm-600 max-w-4xl mx-auto leading-relaxed">
            Advanced AI-powered icon generator that analyzes your designs and creates contextual, brand-aligned icon sets. 
            Upload your design or describe your project to get perfectly matched icons with one click.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 30px rgba(200,75,255,0.4), 0 0 60px rgba(249,115,22,0.2)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartCreating}
            className="px-12 py-5 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-3xl font-bold text-xl shadow-neumorphic-lg hover:shadow-warm-glow transition-all duration-300 flex items-center justify-center space-x-3"
          >
            <SafeIcon icon={FiBrain} className="w-6 h-6" />
            <span>Try AI Generator</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleViewExamples}
            className="px-12 py-5 bg-white/90 text-warm-700 rounded-3xl font-bold text-xl shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 backdrop-blur-sm border border-warm-200 flex items-center justify-center space-x-3"
          >
            <SafeIcon icon={FiPlay} className="w-5 h-5" />
            <span>View Examples</span>
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 group border border-white/50"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-neumorphic-sm`}>
                <SafeIcon icon={feature.icon} className="w-8 h-8 text-white" />
              </div>
              <p className="text-base font-semibold text-warm-700">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-12 text-center"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-neumorphic-sm border border-white/50">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">50K+</div>
            <div className="text-warm-600 font-medium">AI Icons Generated</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-neumorphic-sm border border-white/50">
            <div className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-primary-500 bg-clip-text text-transparent">2K+</div>
            <div className="text-warm-600 font-medium">Happy Designers</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-neumorphic-sm border border-white/50">
            <div className="text-3xl font-bold bg-gradient-to-r from-coral-500 to-secondary-500 bg-clip-text text-transparent">99%</div>
            <div className="text-warm-600 font-medium">AI Accuracy</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
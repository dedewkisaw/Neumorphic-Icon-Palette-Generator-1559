import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiDownload, FiPalette, FiTrendingUp, FiPlay, FiBrain, FiUsers, FiAward, FiTarget, FiArrowRight } = FiIcons;

const Hero = () => {
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
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-secondary-200/30 to-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-teal-200/30 to-teal-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-coral-200/30 to-coral-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
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
                AI Icon Sets
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
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 0 30px rgba(200,75,255,0.4), 0 0 60px rgba(249,115,22,0.2)' 
                }}
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

          {/* Right Column - Visual Demo */}
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
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>

              {/* Demo Icons Grid */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { icon: FiTarget, color: '#c84bff', name: 'Target' },
                  { icon: FiAward, color: '#f97316', name: 'Award' },
                  { icon: FiTrendingUp, color: '#14b8a6', name: 'Growth' },
                  { icon: FiUsers, color: '#ff5757', name: 'Team' },
                  { icon: FiBrain, color: '#facc15', name: 'AI' },
                  { icon: FiZap, color: '#2dd4bf', name: 'Power' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="aspect-square bg-gradient-to-br from-white to-warm-50 rounded-2xl flex items-center justify-center shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300 border border-white/50"
                    style={{ backgroundColor: item.color + '15' }}
                  >
                    <SafeIcon 
                      icon={item.icon} 
                      className="w-8 h-8 transition-transform duration-200"
                      style={{ color: item.color }}
                    />
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
import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiBrain, FiZap, FiPalette, FiUsers, FiTarget, FiAward, FiTrendingUp, FiShield, FiDownload, FiEdit3, FiEye, FiHeart } = FiIcons;

const USPSection = () => {
  const usps = [
    {
      icon: FiBrain,
      title: 'AI-Powered Context Analysis',
      description: 'Our advanced AI analyzes your project description and uploaded designs to generate contextually perfect icon sets that match your brand identity.',
      features: ['Smart keyword analysis', 'Visual design recognition', 'Brand personality detection'],
      color: 'from-primary-500 to-secondary-500',
      bgColor: 'from-primary-50 to-secondary-50'
    },
    {
      icon: FiPalette,
      title: 'Professional Neumorphic Design',
      description: 'Every icon follows modern neumorphic design principles with soft shadows, elegant depth, and premium aesthetics that elevate your brand.',
      features: ['Soft UI aesthetics', 'Perfect depth & shadows', 'Premium visual quality'],
      color: 'from-secondary-500 to-warm-500',
      bgColor: 'from-secondary-50 to-warm-50'
    },
    {
      icon: FiTarget,
      title: 'Harmonious Color Systems',
      description: 'Generate professional 16-color palettes using advanced color theory and industry-specific color psychology for perfect brand alignment.',
      features: ['16-color harmony system', 'Industry-specific palettes', 'Color psychology applied'],
      color: 'from-teal-500 to-primary-500',
      bgColor: 'from-teal-50 to-primary-50'
    },
    {
      icon: FiUsers,
      title: 'Community Marketplace',
      description: 'Access thousands of professional icon sets created by our community of talented designers, or share your own creations with the world.',
      features: ['Curated icon collections', 'Designer marketplace', 'Community feedback'],
      color: 'from-coral-500 to-secondary-500',
      bgColor: 'from-coral-50 to-secondary-50'
    }
  ];

  const benefits = [
    {
      icon: FiZap,
      title: 'Save 10+ Hours',
      description: 'Generate complete icon sets in seconds instead of designing each icon manually'
    },
    {
      icon: FiShield,
      title: 'Professional Quality',
      description: 'Every icon meets professional design standards with perfect scalability'
    },
    {
      icon: FiDownload,
      title: 'Multiple Formats',
      description: 'Export as SVG, PNG, or React components with one-click downloads'
    },
    {
      icon: FiEdit3,
      title: 'Full Customization',
      description: 'Fine-tune every aspect: colors, sizes, styles, and neumorphic effects'
    }
  ];

  const handleGetStarted = () => {
    window.location.hash = '#/creator';
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-3xl flex items-center justify-center mr-4 shadow-neumorphic">
              <SafeIcon icon={FiAward} className="w-8 h-8 text-white" />
            </div>
            <div className="px-6 py-2 bg-gradient-to-r from-primary-100 via-secondary-100 to-warm-100 rounded-full border border-primary-200 shadow-neumorphic-sm">
              <span className="text-sm font-bold text-primary-700">✨ Why Choose Iconify AI</span>
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-warm-800 mb-6">
            The Complete Icon
            <span className="block bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 bg-clip-text text-transparent">
              Generation Platform
            </span>
          </h2>
          
          <p className="text-xl text-warm-600 max-w-4xl mx-auto leading-relaxed">
            Unlike basic icon libraries, we provide an intelligent design system that understands your brand, 
            generates contextual icons, and delivers professional-quality results every time.
          </p>
        </motion.div>

        {/* Main USPs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-gradient-to-br ${usp.bgColor} rounded-3xl p-10 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-white/50`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${usp.color} rounded-2xl flex items-center justify-center mb-8 shadow-neumorphic-sm`}>
                <SafeIcon icon={usp.icon} className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-warm-800 mb-4">{usp.title}</h3>
              <p className="text-warm-700 text-lg mb-6 leading-relaxed">{usp.description}</p>
              
              <div className="space-y-3">
                {usp.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                    <span className="text-warm-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-warm-800 text-center mb-12">
            Everything You Need for Professional Icon Design
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-white/50 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-neumorphic-sm">
                  <SafeIcon icon={benefit.icon} className="w-7 h-7 text-white" />
                </div>
                
                <h4 className="text-xl font-bold text-warm-800 mb-4">{benefit.title}</h4>
                <p className="text-warm-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-primary-50 via-secondary-50 to-warm-50 rounded-3xl p-12 shadow-neumorphic border border-white/50 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-neumorphic">
              <SafeIcon icon={FiHeart} className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-bold text-warm-800 mb-6">
              Ready to Transform Your Design Workflow?
            </h3>
            
            <p className="text-xl text-warm-600 mb-10 leading-relaxed">
              Join thousands of designers who have revolutionized their icon creation process with our AI-powered platform.
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 0 30px rgba(200,75,255,0.4), 0 0 60px rgba(249,115,22,0.2)' 
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGetStarted}
              className="px-12 py-5 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-3xl font-bold text-xl shadow-neumorphic-lg hover:shadow-warm-glow transition-all duration-300 flex items-center space-x-4 mx-auto"
            >
              <SafeIcon icon={FiBrain} className="w-6 h-6" />
              <span>Start Creating Professional Icons</span>
              <SafeIcon icon={FiTrendingUp} className="w-6 h-6" />
            </motion.button>
            
            <p className="text-warm-500 mt-6 text-lg">
              No credit card required • Professional results in seconds
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default USPSection;
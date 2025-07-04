import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import USPSection from './components/USPSection';
import IconCreator from './components/IconCreator';
import IconEditor from './components/IconEditor';
import Community from './components/Community';
import ErrorBoundary from './components/ErrorBoundary';
import FeedbackButton from './components/FeedbackButton';
import { DocumentationPage, APIPage, HelpPage, PrivacyPage, TermsPage } from './components/DocumentPages';
import './App.css';

// Home Page Component - Now focused on USP and conversion
const HomePage = () => (
  <>
    <Hero />
    <USPSection />
  </>
);

// Enhanced About Component
const About = () => (
  <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-3xl flex items-center justify-center mr-4 shadow-neumorphic">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="px-6 py-2 bg-gradient-to-r from-primary-100 via-secondary-100 to-warm-100 rounded-full border border-primary-200 shadow-neumorphic-sm">
              <span className="text-sm font-bold text-primary-700">✨ Professional Platform</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-warm-800 mb-6">About Iconify AI</h1>
          <p className="text-xl text-warm-600 max-w-3xl mx-auto mb-12">
            Professional neumorphic icon generation platform for modern applications and creative professionals
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic border border-white/50"
        >
          <h2 className="text-2xl font-bold text-warm-800 mb-6">Our Mission</h2>
          <p className="text-warm-700 text-lg leading-relaxed mb-6">
            Iconify AI revolutionizes the way designers and developers create icons. Our advanced artificial intelligence analyzes your project requirements and generates perfectly matched, professional-quality icons in seconds.
          </p>
          <p className="text-warm-600 leading-relaxed">
            Whether you're building a mobile app, website, or brand identity, our platform ensures visual consistency and saves you countless hours of design work.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic border border-white/50"
        >
          <h2 className="text-2xl font-bold text-warm-800 mb-6">Key Features</h2>
          <div className="space-y-4">
            {[
              { icon: '🤖', title: 'AI-Powered Generation', desc: 'Smart icon creation based on your project context' },
              { icon: '🎨', title: 'Neumorphic Design', desc: 'Beautiful soft UI aesthetic with depth and elegance' },
              { icon: '📁', title: 'Project Management', desc: 'Organize and manage your icon collections effortlessly' },
              { icon: '👥', title: 'Community Platform', desc: 'Share and discover icons from talented creators worldwide' }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center text-lg shadow-neumorphic-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-warm-800 mb-1">{feature.title}</h3>
                  <p className="text-warm-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        {[
          { number: '50K+', label: 'Icons Generated', color: 'from-primary-500 to-secondary-500' },
          { number: '2K+', label: 'Happy Users', color: 'from-teal-500 to-primary-500' },
          { number: '99%', label: 'Satisfaction Rate', color: 'from-coral-500 to-secondary-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-neumorphic border border-white/50 text-center">
            <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.number}
            </div>
            <div className="text-warm-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic border border-white/50 text-center"
      >
        <h2 className="text-2xl font-bold text-warm-800 mb-6">Built by Passionate Creators</h2>
        <p className="text-warm-700 text-lg max-w-3xl mx-auto mb-8">
          Our team combines expertise in artificial intelligence, user experience design, and creative technology to deliver the most intuitive neumorphic icon generation platform in the industry.
        </p>
        <div className="flex justify-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200,75,255,0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-3xl font-bold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
          >
            Get Started Today
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white text-warm-600 rounded-3xl font-bold border border-warm-200 hover:bg-warm-50 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-warm-50 via-white to-warm-100">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <HomePage />
                </motion.div>
              } />
              
              <Route path="/creator" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconCreator />
                </motion.div>
              } />
              
              <Route path="/editor" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <IconEditor />
                </motion.div>
              } />
              
              <Route path="/community" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Community />
                </motion.div>
              } />
              
              <Route path="/about" element={<About />} />
              
              {/* New Document Pages */}
              <Route path="/docs" element={<DocumentationPage />} />
              <Route path="/api" element={<APIPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </main>
          <Footer />
          <FeedbackButton />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
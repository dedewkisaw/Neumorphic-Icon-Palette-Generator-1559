import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import IconCreator from './components/IconCreator';
import IconPaletteGenerator from './components/IconPaletteGenerator';
import IconEditor from './components/IconEditor';
import Community from './components/Community';
import ErrorBoundary from './components/ErrorBoundary';
import FeedbackButton from './components/FeedbackButton';
import './App.css';

// Enhanced Gallery Component
const Gallery = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-6">Icon Gallery</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Explore beautiful icons created by our community
          </p>
        </motion.div>
      </div>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/15 shadow-soft text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
          <span className="text-2xl">🎨</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-4">Gallery Coming Soon</h3>
        <p className="text-white/60">We're working on an amazing gallery experience for you!</p>
      </div>
    </div>
  </div>
);

// Enhanced About Component
const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-soft">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full border border-white/15 shadow-soft">
              <span className="text-sm font-bold text-white">✨ Premium Platform</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">About Iconify AI</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
            AI-powered icon generation platform for modern applications and creative professionals
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/15 shadow-soft"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-white/80 text-lg leading-relaxed mb-6">
            Iconify AI revolutionizes the way designers and developers create icons. Our advanced artificial intelligence 
            analyzes your project requirements and generates perfectly matched, professional-quality icons in seconds.
          </p>
          <p className="text-white/60 leading-relaxed">
            Whether you're building a mobile app, website, or brand identity, our platform ensures visual consistency 
            and saves you countless hours of design work.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/15 shadow-soft"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
          <div className="space-y-4">
            {[
              { icon: '🤖', title: 'AI-Powered Generation', desc: 'Smart icon creation based on your project context' },
              { icon: '🎨', title: 'Advanced Customization', desc: 'Fine-tune colors, styles, and sizes with precision' },
              { icon: '📁', title: 'Project Management', desc: 'Organize and manage your icon collections effortlessly' },
              { icon: '👥', title: 'Community Platform', desc: 'Share and discover icons from talented creators worldwide' }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.desc}</p>
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
          { number: '50K+', label: 'Icons Generated', color: 'from-blue-500 to-purple-600' },
          { number: '2K+', label: 'Happy Users', color: 'from-emerald-500 to-teal-600' },
          { number: '99%', label: 'Satisfaction Rate', color: 'from-orange-500 to-red-600' }
        ].map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/15 shadow-soft text-center">
            <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.number}
            </div>
            <div className="text-white/60 font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/15 shadow-soft text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Built by Passionate Creators</h2>
        <p className="text-white/80 text-lg max-w-3xl mx-auto mb-8">
          Our team combines expertise in artificial intelligence, user experience design, and creative technology 
          to deliver the most intuitive icon generation platform in the industry.
        </p>
        
        <div className="flex justify-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-soft hover:shadow-lg transition-all duration-300"
          >
            Get Started Today
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-soft"
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Header />
          <main>
            <Routes>
              <Route 
                path="/" 
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconCreator />
                  </motion.div>
                } 
              />
              <Route 
                path="/generator" 
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconPaletteGenerator />
                  </motion.div>
                } 
              />
              <Route 
                path="/editor" 
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconEditor />
                  </motion.div>
                } 
              />
              <Route 
                path="/community" 
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Community />
                  </motion.div>
                } 
              />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
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
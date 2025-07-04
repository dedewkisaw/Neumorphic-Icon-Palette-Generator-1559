import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrendingUp, FiClock, FiHeart, FiDownload, FiUser, FiSearch, FiFilter, FiEye, FiShare2, FiBookmark, FiStar, FiMessageCircle, FiThumbsUp, FiExternalLink } = FiIcons;

const Community = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPalettes, setLikedPalettes] = useState(new Set());
  const [bookmarkedPalettes, setBookmarkedPalettes] = useState(new Set());
  const [downloadCounts, setDownloadCounts] = useState({});

  const communityPalettes = [
    {
      id: 1,
      name: 'Finance Dashboard Icons',
      author: 'Sarah Chen',
      likes: 234,
      downloads: 1205,
      views: 3420,
      preview: ['TrendingUp', 'DollarSign', 'PieChart', 'BarChart', 'CreditCard', 'Wallet'],
      colors: ['#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4'],
      tags: ['finance', 'dashboard', 'analytics'],
      featured: true,
      gradient: 'from-teal-400 to-teal-600',
      description: 'Professional finance dashboard icon set with modern gradients',
      authorAvatar: '👩‍💼',
      createdAt: '2024-01-15',
      category: 'Business'
    },
    {
      id: 2,
      name: 'Medical & Health',
      author: 'Dr. Mike Johnson',
      likes: 189,
      downloads: 892,
      views: 2156,
      preview: ['Heart', 'Activity', 'Shield', 'Plus', 'Thermometer', 'Pill'],
      colors: ['#ff7a7a', '#ff5757', '#f03e3e', '#e03131'],
      tags: ['medical', 'health', 'hospital'],
      gradient: 'from-coral-400 to-coral-600',
      description: 'Medical icons for healthcare applications and websites',
      authorAvatar: '👨‍⚕️',
      createdAt: '2024-01-12',
      category: 'Healthcare'
    },
    {
      id: 3,
      name: 'E-commerce Essentials',
      author: 'Alex Rodriguez',
      likes: 156,
      downloads: 743,
      views: 1834,
      preview: ['ShoppingCart', 'Package', 'Truck', 'CreditCard', 'Gift', 'Tag'],
      colors: ['#d97aff', '#c84bff', '#b52fff', '#9f1aff'],
      tags: ['ecommerce', 'shopping', 'retail'],
      gradient: 'from-primary-400 to-primary-600',
      description: 'Complete e-commerce icon collection for online stores',
      authorAvatar: '🛒',
      createdAt: '2024-01-10',
      category: 'E-commerce'
    },
    {
      id: 4,
      name: 'Social Media Pack',
      author: 'Emma Wilson',
      likes: 298,
      downloads: 1456,
      views: 4123,
      preview: ['Share', 'MessageCircle', 'ThumbsUp', 'Users', 'Camera', 'Video'],
      colors: ['#c84bff', '#f97316', '#14b8a6', '#facc15'],
      tags: ['social', 'media', 'communication'],
      gradient: 'from-primary-500 to-secondary-500',
      description: 'Social media icons with vibrant colors and modern design',
      authorAvatar: '💬',
      createdAt: '2024-01-08',
      category: 'Social'
    },
    {
      id: 5,
      name: 'Travel & Adventure',
      author: 'James Park',
      likes: 167,
      downloads: 623,
      views: 1567,
      preview: ['MapPin', 'Compass', 'Camera', 'Plane', 'Mountain', 'Globe'],
      colors: ['#facc15', '#eab308', '#ca8a04', '#a16207'],
      tags: ['travel', 'adventure', 'navigation'],
      gradient: 'from-accent-400 to-accent-600',
      description: 'Travel and adventure icons for tourism and outdoor apps',
      authorAvatar: '✈️',
      createdAt: '2024-01-05',
      category: 'Travel'
    },
    {
      id: 6,
      name: 'Education & Learning',
      author: 'Prof. Lisa Chen',
      likes: 134,
      downloads: 567,
      views: 1234,
      preview: ['Book', 'GraduationCap', 'Award', 'Lightbulb', 'Pencil', 'Calculator'],
      colors: ['#f97316', '#ea580c', '#c2410c', '#9a3412'],
      tags: ['education', 'learning', 'academic'],
      gradient: 'from-secondary-400 to-secondary-600',
      description: 'Educational icons for learning platforms and schools',
      authorAvatar: '🎓',
      createdAt: '2024-01-03',
      category: 'Education'
    }
  ];

  const tabs = [
    { id: 'trending', label: 'Trending', icon: FiTrendingUp, color: 'from-primary-500 to-secondary-500' },
    { id: 'recent', label: 'Recent', icon: FiClock, color: 'from-teal-500 to-primary-500' },
    { id: 'popular', label: 'Popular', icon: FiHeart, color: 'from-coral-500 to-primary-500' },
  ];

  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  const filteredPalettes = communityPalettes.filter(palette =>
    palette.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    palette.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleLike = (paletteId) => {
    setLikedPalettes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(paletteId)) {
        newSet.delete(paletteId);
      } else {
        newSet.add(paletteId);
        // Show success notification
        showNotification('❤️ Added to Likes!', 'Palette saved to your liked collection', 'success');
      }
      return newSet;
    });
  };

  const handleBookmark = (paletteId) => {
    setBookmarkedPalettes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(paletteId)) {
        newSet.delete(paletteId);
      } else {
        newSet.add(paletteId);
        showNotification('🔖 Bookmarked!', 'Palette saved to your bookmarks', 'success');
      }
      return newSet;
    });
  };

  const handleDownload = (palette) => {
    // Increment download count
    setDownloadCounts(prev => ({
      ...prev,
      [palette.id]: (prev[palette.id] || 0) + 1
    }));

    // Create and download the palette file
    const paletteData = {
      name: palette.name,
      author: palette.author,
      colors: palette.colors,
      icons: palette.preview,
      tags: palette.tags,
      description: palette.description,
      downloadedAt: new Date().toISOString(),
      source: 'Iconify AI Community'
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}-palette.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showNotification('📥 Download Started!', `${palette.name} palette downloaded successfully`, 'success');
  };

  const handleViewDetails = (palette) => {
    // Create detailed view modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/50 transform scale-95 opacity-0 transition-all duration-300" id="palette-modal">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-gradient-to-br ${palette.gradient} rounded-2xl flex items-center justify-center text-2xl">
              ${palette.authorAvatar}
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-800">${palette.name}</h3>
              <p class="text-gray-600">by ${palette.author}</p>
            </div>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="mb-6">
          <p class="text-gray-600 text-lg">${palette.description}</p>
        </div>
        
        <div class="grid grid-cols-3 gap-4 mb-6">
          ${palette.preview.map((iconName, index) => `
            <div class="aspect-square bg-gradient-to-br from-white to-gray-50 rounded-2xl flex items-center justify-center shadow-lg border border-white/50" style="background-color: ${palette.colors[index % palette.colors.length]}15;">
              <div class="text-2xl" style="color: ${palette.colors[index % palette.colors.length]};">
                ${iconName.charAt(0)}
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="flex space-x-2 mb-6">
          ${palette.colors.map(color => `
            <div class="flex-1 h-12 rounded-xl shadow-lg border-2 border-white/50" style="background-color: ${color};"></div>
          `).join('')}
        </div>
        
        <div class="flex flex-wrap gap-2 mb-6">
          ${palette.tags.map(tag => `
            <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-xl font-medium">#${tag}</span>
          `).join('')}
        </div>
        
        <div class="grid grid-cols-3 gap-4 text-center mb-6">
          <div class="bg-gray-50 rounded-2xl p-4">
            <div class="text-2xl font-bold text-gray-800">${palette.likes + (likedPalettes.has(palette.id) ? 1 : 0)}</div>
            <div class="text-gray-600">Likes</div>
          </div>
          <div class="bg-gray-50 rounded-2xl p-4">
            <div class="text-2xl font-bold text-gray-800">${palette.downloads + (downloadCounts[palette.id] || 0)}</div>
            <div class="text-gray-600">Downloads</div>
          </div>
          <div class="bg-gray-50 rounded-2xl p-4">
            <div class="text-2xl font-bold text-gray-800">${palette.views}</div>
            <div class="text-gray-600">Views</div>
          </div>
        </div>
        
        <div class="flex space-x-4">
          <button onclick="window.communityHandlers.handleDownload(${palette.id}); this.closest('.fixed').remove();" class="flex-1 py-3 bg-gradient-to-r ${palette.gradient} text-white rounded-2xl font-bold text-center shadow-lg hover:shadow-xl transition-all duration-300">
            Download Palette
          </button>
          <button onclick="window.communityHandlers.handleLike(${palette.id})" class="px-6 py-3 bg-white text-gray-600 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
            ${likedPalettes.has(palette.id) ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
      const modalContent = modal.querySelector('#palette-modal');
      modalContent.style.transform = 'scale(1)';
      modalContent.style.opacity = '1';
    }, 10);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Make handlers available globally for the modal
    window.communityHandlers = {
      handleDownload: (id) => handleDownload(communityPalettes.find(p => p.id === id)),
      handleLike: (id) => handleLike(id)
    };
  };

  const handleShare = (palette) => {
    if (navigator.share) {
      navigator.share({
        title: palette.name,
        text: `Check out this amazing ${palette.name} icon palette by ${palette.author}!`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      const shareText = `Check out this amazing ${palette.name} icon palette by ${palette.author}! ${window.location.href}`;
      navigator.clipboard.writeText(shareText);
      showNotification('🔗 Link Copied!', 'Share link copied to clipboard', 'success');
    }
  };

  const handleAuthorProfile = (author) => {
    // Create author profile modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm';
    modal.innerHTML = `
      <div class="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-white/50 transform scale-95 opacity-0 transition-all duration-300" id="author-modal">
        <div class="text-center mb-6">
          <div class="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
            👨‍🎨
          </div>
          <h3 class="text-2xl font-bold text-gray-800">${author}</h3>
          <p class="text-gray-600">Icon Designer</p>
        </div>
        
        <div class="space-y-4 mb-6">
          <div class="bg-gray-50 rounded-2xl p-4">
            <h4 class="font-semibold text-gray-800 mb-2">About</h4>
            <p class="text-gray-600">Professional icon designer with 5+ years of experience creating beautiful, functional icon sets for web and mobile applications.</p>
          </div>
          
          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="bg-blue-50 rounded-2xl p-3">
              <div class="text-xl font-bold text-blue-600">${communityPalettes.filter(p => p.author === author).length}</div>
              <div class="text-blue-600 text-sm">Palettes</div>
            </div>
            <div class="bg-green-50 rounded-2xl p-3">
              <div class="text-xl font-bold text-green-600">${communityPalettes.filter(p => p.author === author).reduce((sum, p) => sum + p.likes, 0)}</div>
              <div class="text-green-600 text-sm">Total Likes</div>
            </div>
            <div class="bg-purple-50 rounded-2xl p-3">
              <div class="text-xl font-bold text-purple-600">${communityPalettes.filter(p => p.author === author).reduce((sum, p) => sum + p.downloads, 0)}</div>
              <div class="text-purple-600 text-sm">Downloads</div>
            </div>
          </div>
        </div>
        
        <div class="flex space-x-4">
          <button onclick="this.closest('.fixed').remove()" class="flex-1 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl font-bold text-center shadow-lg hover:shadow-xl transition-all duration-300">
            Follow Designer
          </button>
          <button onclick="this.closest('.fixed').remove()" class="px-6 py-3 bg-white text-gray-600 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
            Close
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
      const modalContent = modal.querySelector('#author-modal');
      modalContent.style.transform = 'scale(1)';
      modalContent.style.opacity = '1';
    }, 10);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  };

  const showNotification = (title, message, type = 'success') => {
    const notification = document.createElement('div');
    const colors = type === 'success' ? 'from-green-500 to-teal-500' : 'from-red-500 to-red-600';
    notification.className = 'fixed top-6 right-6 z-[9999] bg-white rounded-2xl p-6 shadow-2xl border border-white/50 max-w-sm transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-start space-x-4">
        <div class="w-10 h-10 bg-gradient-to-r ${colors} rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-gray-800 mb-1">${title}</h4>
          <p class="text-gray-600 text-sm">${message}</p>
        </div>
        <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    setTimeout(() => notification.remove(), 4000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-warm-800 mb-6">Community Palettes</h1>
          <p className="text-xl text-warm-600 max-w-3xl mx-auto leading-relaxed">
            Discover and share amazing icon palettes created by our talented community of designers and creators.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic mb-12 border border-white/50"
        >
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <SafeIcon icon={FiSearch} className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-warm-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search palettes, tags, or authors..."
                className="w-full pl-14 pr-6 py-4 bg-white rounded-2xl border-0 shadow-neumorphic-inset text-warm-800 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 text-lg"
              />
            </div>

            {/* FIXED: Mobile Responsive Tabs */}
            <div className="bg-warm-100 rounded-2xl p-2 shadow-neumorphic-inset">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 sm:px-6 lg:px-8 py-3 rounded-xl font-semibold text-xs sm:text-sm lg:text-base transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 min-w-0 whitespace-nowrap ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-neumorphic-sm`
                        : 'text-warm-600 hover:text-warm-800'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm lg:text-base font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Palette */}
        {!searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-warm-800 mb-8">Featured This Week</h2>
            <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-warm-50 rounded-3xl p-10 shadow-neumorphic border border-white/50">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-warm-200 to-warm-300 rounded-2xl flex items-center justify-center text-xl">
                      {communityPalettes[0].authorAvatar}
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-warm-800">
                        {communityPalettes[0].name}
                      </h3>
                      <button
                        onClick={() => handleAuthorProfile(communityPalettes[0].author)}
                        className="text-warm-600 hover:text-primary-600 transition-colors duration-200 text-lg font-medium"
                      >
                        by {communityPalettes[0].author}
                      </button>
                    </div>
                  </div>
                  <p className="text-warm-600 mb-6 text-lg">{communityPalettes[0].description}</p>
                  <div className="flex items-center space-x-8 text-warm-500 mb-8">
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiHeart} className="w-5 h-5 text-coral-500" />
                      <span className="font-semibold">{communityPalettes[0].likes + (likedPalettes.has(communityPalettes[0].id) ? 1 : 0)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiDownload} className="w-5 h-5 text-teal-500" />
                      <span className="font-semibold">{communityPalettes[0].downloads + (downloadCounts[communityPalettes[0].id] || 0)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={FiEye} className="w-5 h-5 text-primary-500" />
                      <span className="font-semibold">{communityPalettes[0].views}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleViewDetails(communityPalettes[0])}
                      className={`px-8 py-4 bg-gradient-to-r ${communityPalettes[0].gradient} text-white rounded-2xl font-bold text-lg shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300`}
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(communityPalettes[0])}
                      className="px-6 py-4 bg-white text-warm-600 rounded-2xl font-bold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200"
                    >
                      <SafeIcon icon={FiDownload} className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {communityPalettes[0].preview.map((iconName, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-neumorphic-sm border border-white/50"
                      style={{ backgroundColor: communityPalettes[0].colors[index % communityPalettes[0].colors.length] + '15' }}
                    >
                      <SafeIcon
                        icon={getIconComponent(iconName)}
                        className="w-8 h-8"
                        style={{ color: communityPalettes[0].colors[index % communityPalettes[0].colors.length] }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Palettes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-warm-800 mb-8">
            {searchTerm ? `Search Results (${filteredPalettes.length})` : 'All Palettes'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPalettes.map((palette, index) => (
              <motion.div
                key={palette.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 group border border-white/50"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-warm-200 to-warm-300 rounded-2xl flex items-center justify-center text-lg">
                      {palette.authorAvatar}
                    </div>
                    <div>
                      <button
                        onClick={() => handleAuthorProfile(palette.author)}
                        className="font-bold text-warm-800 hover:text-primary-600 transition-colors duration-200"
                      >
                        {palette.author}
                      </button>
                      <p className="text-warm-500 text-sm">{palette.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLike(palette.id)}
                      className={`p-2 rounded-xl transition-all duration-200 ${
                        likedPalettes.has(palette.id)
                          ? 'bg-coral-100 text-coral-600'
                          : 'hover:bg-warm-100 text-warm-400 hover:text-coral-400'
                      }`}
                    >
                      <SafeIcon icon={FiHeart} className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleBookmark(palette.id)}
                      className={`p-2 rounded-xl transition-all duration-200 ${
                        bookmarkedPalettes.has(palette.id)
                          ? 'bg-primary-100 text-primary-600'
                          : 'hover:bg-warm-100 text-warm-400 hover:text-primary-400'
                      }`}
                    >
                      <SafeIcon icon={FiBookmark} className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Palette Name */}
                <h3 className="font-bold text-warm-800 mb-3 text-xl">{palette.name}</h3>
                <p className="text-warm-600 text-sm mb-6">{palette.description}</p>

                {/* Icon Preview */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {palette.preview.slice(0, 6).map((iconName, iconIndex) => (
                    <motion.div
                      key={iconIndex}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="aspect-square bg-gradient-to-br from-white to-warm-50 rounded-2xl flex items-center justify-center shadow-neumorphic-sm group-hover:shadow-neumorphic transition-all duration-300 border border-white/50"
                      style={{
                        backgroundColor: palette.colors[iconIndex % palette.colors.length] + '15',
                      }}
                    >
                      <SafeIcon
                        icon={getIconComponent(iconName)}
                        className="w-6 h-6"
                        style={{ color: palette.colors[iconIndex % palette.colors.length] }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Color Palette */}
                <div className="flex space-x-2 mb-6">
                  {palette.colors.map((color, colorIndex) => (
                    <motion.div
                      key={colorIndex}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="flex-1 h-8 rounded-xl shadow-neumorphic-sm border-2 border-white/50 cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={color}
                      onClick={() => {
                        navigator.clipboard.writeText(color);
                        showNotification('🎨 Color Copied!', `${color} copied to clipboard`, 'success');
                      }}
                    />
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {palette.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchTerm(tag)}
                      className="px-3 py-1 bg-warm-100 text-warm-600 text-sm rounded-xl font-medium hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-warm-500 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiHeart} className="w-4 h-4 text-coral-500" />
                      <span className="font-semibold">{palette.likes + (likedPalettes.has(palette.id) ? 1 : 0)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiDownload} className="w-4 h-4 text-teal-500" />
                      <span className="font-semibold">{palette.downloads + (downloadCounts[palette.id] || 0)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiEye} className="w-4 h-4 text-primary-500" />
                      <span className="font-semibold">{palette.views}</span>
                    </div>
                  </div>
                  <span className="text-xs">{new Date(palette.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleViewDetails(palette)}
                    className={`flex-1 py-3 bg-gradient-to-r ${palette.gradient} text-white rounded-2xl font-bold text-base shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300`}
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(palette)}
                    className="px-4 py-3 bg-white text-warm-600 rounded-2xl font-bold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200"
                  >
                    <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare(palette)}
                    className="px-4 py-3 bg-white text-warm-600 rounded-2xl font-bold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200"
                  >
                    <SafeIcon icon={FiShare2} className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;
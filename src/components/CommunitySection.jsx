import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiDownload, FiEye, FiUser, FiTrendingUp, FiClock, FiStar } from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const CommunitySection = () => {
  const [activeFilter, setActiveFilter] = useState('trending');
  const [likedSets, setLikedSets] = useState(new Set());

  // Mock community data
  const communityPalettes = [
    {
      id: 1,
      name: 'Modern Business Icons',
      author: 'Sarah Chen',
      likes: 234,
      downloads: 1205,
      views: 3420,
      icons: ['Briefcase', 'TrendingUp', 'Users', 'Target', 'Award'],
      colors: ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
      featured: true
    },
    {
      id: 2,
      name: 'Tech Startup Pack',
      author: 'Alex Rodriguez',
      likes: 189,
      downloads: 892,
      views: 2156,
      icons: ['Cpu', 'Code', 'Database', 'Cloud', 'Smartphone'],
      colors: ['#8B5CF6', '#6366F1', '#EC4899', '#06B6D4', '#84CC16']
    },
    {
      id: 3,
      name: 'Health & Wellness',
      author: 'Dr. Mike Johnson',
      likes: 156,
      downloads: 743,
      views: 1834,
      icons: ['Heart', 'Activity', 'Shield', 'Plus', 'Zap'],
      colors: ['#EF4444', '#F97316', '#10B981', '#06B6D4', '#8B5CF6']
    },
    {
      id: 4,
      name: 'E-commerce Essentials',
      author: 'Emma Wilson',
      likes: 298,
      downloads: 1456,
      views: 4123,
      icons: ['ShoppingCart', 'Package', 'CreditCard', 'Gift', 'Truck'],
      colors: ['#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899']
    }
  ];

  const filters = [
    { id: 'trending', name: 'Trending', icon: FiTrendingUp },
    { id: 'recent', name: 'Recent', icon: FiClock },
    { id: 'popular', name: 'Popular', icon: FiStar }
  ];

  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  const toggleLike = (paletteId) => {
    setLikedSets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(paletteId)) {
        newSet.delete(paletteId);
      } else {
        newSet.add(paletteId);
      }
      return newSet;
    });
  };

  const downloadPalette = (palette) => {
    const paletteData = {
      name: palette.name,
      author: palette.author,
      icons: palette.icons,
      colors: palette.colors,
      downloadedAt: new Date().toISOString()
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
  };

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/15">
          <div className="flex space-x-1">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeFilter === filter.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <SafeIcon icon={filter.icon} className="w-4 h-4" />
                <span>{filter.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Community Palettes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communityPalettes.map((palette, index) => (
          <motion.div
            key={palette.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/15 shadow-soft hover:bg-white/15 transition-all duration-300 ${
              palette.featured ? 'ring-2 ring-yellow-500/30' : ''
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{palette.name}</h3>
                  <p className="text-white/60 text-sm">by {palette.author}</p>
                  {palette.featured && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 mt-1">
                      ⭐ Featured
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => toggleLike(palette.id)}
                className={`p-2 rounded-lg transition-colors ${
                  likedSets.has(palette.id)
                    ? 'bg-pink-500/20 text-pink-400'
                    : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                }`}
              >
                <SafeIcon icon={FiHeart} className="w-4 h-4" />
              </button>
            </div>

            {/* Icons Preview */}
            <div className="flex space-x-2 mb-4">
              {palette.icons.map((iconName, iconIndex) => (
                <div
                  key={iconIndex}
                  className="flex-1 aspect-square bg-white/10 rounded-lg flex items-center justify-center"
                  style={{ color: palette.colors[iconIndex] }}
                >
                  <SafeIcon 
                    icon={getIconComponent(iconName)} 
                    className="w-6 h-6"
                  />
                </div>
              ))}
            </div>

            {/* Color Palette */}
            <div className="flex space-x-1 mb-4">
              {palette.colors.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  className="flex-1 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-white/60 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiHeart} className="w-4 h-4" />
                  <span>{palette.likes + (likedSets.has(palette.id) ? 1 : 0)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>{palette.downloads}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                  <span>{palette.views}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={() => downloadPalette(palette)}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                Preview
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommunitySection;
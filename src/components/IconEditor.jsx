import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHome, FiSearch, FiUser, FiSettings, FiDownload, FiRotateCcw, FiCopy, FiPalette, FiEdit3, FiZap, FiStar, FiHeart, FiEye, FiLayers, FiGrid, FiRefreshCw, FiSave, FiShare2 } = FiIcons;

const IconEditor = () => {
  const [selectedIcon, setSelectedIcon] = useState('Home');
  const [iconColor, setIconColor] = useState('#c84bff');
  const [iconSize, setIconSize] = useState(48);
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState('#fefcfb');
  const [isExporting, setIsExporting] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState([]);
  const [showGeneratedIcons, setShowGeneratedIcons] = useState(false);
  const [selectedGeneratedIcon, setSelectedGeneratedIcon] = useState(null);
  const [activeTab, setActiveTab] = useState('library');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    if (params.get('icon')) {
      setSelectedIcon(decodeURIComponent(params.get('icon')));
    }
    if (params.get('color')) {
      setIconColor(decodeURIComponent(params.get('color')));
    }
    if (params.get('size')) {
      setIconSize(parseInt(params.get('size')) || 48);
    }
    if (params.get('stroke')) {
      setStrokeWidth(parseFloat(params.get('stroke')) || 2);
    }
    
    if (params.get('icon') && params.get('color')) {
      setTimeout(() => {
        console.log(`🎨 Welcome to Icon Editor! Pre-loaded: ${params.get('icon')} with color ${params.get('color')}`);
      }, 500);
    }

    loadGeneratedIcons();
    loadFavorites();
  }, []);

  const loadGeneratedIcons = () => {
    const stored = localStorage.getItem('iconify_generated_icons');
    if (stored) {
      try {
        const icons = JSON.parse(stored);
        setGeneratedIcons(icons);
        setShowGeneratedIcons(true);
        return;
      } catch (error) {
        console.log('Error loading stored icons, generating samples');
      }
    }

    const sampleIcons = generateSampleIcons();
    setGeneratedIcons(sampleIcons);
    setShowGeneratedIcons(true);
    localStorage.setItem('iconify_generated_icons', JSON.stringify(sampleIcons));
  };

  const loadFavorites = () => {
    const stored = localStorage.getItem('iconify_favorites');
    if (stored) {
      try {
        const favs = JSON.parse(stored);
        setFavorites(favs);
      } catch (error) {
        console.log('Error loading favorites');
      }
    }
  };

  const generateSampleIcons = () => {
    const iconNames = ['Home', 'Search', 'User', 'Settings', 'Bell', 'Mail', 'Heart', 'Star', 'Plus', 'Edit', 'Trash', 'Download'];
    const colors = ['#c84bff', '#f97316', '#14b8a6', '#ff5757', '#facc15', '#2dd4bf'];
    
    return iconNames.map((name, index) => ({
      id: name.toLowerCase(),
      name,
      color: colors[index % colors.length],
      category: 'interface',
      generated: true,
      timestamp: Date.now() - (index * 1000)
    }));
  };

  const availableIcons = [
    'Home', 'Search', 'User', 'Settings', 'Bell', 'Mail', 
    'Heart', 'Star', 'Plus', 'Edit', 'Trash', 'Download', 
    'Upload', 'Share', 'Lock', 'Eye', 'Grid', 'Layers',
    'Zap', 'Target', 'Award', 'Shield', 'Globe', 'Camera',
    'Calendar', 'Clock', 'Map', 'Phone', 'Video', 'Music',
    'Image', 'File', 'Folder', 'Archive', 'Database', 'Server',
    'Wifi', 'Bluetooth', 'Battery', 'Power', 'Volume', 'Mic'
  ];

  const presetColors = [
    '#c84bff', '#f97316', '#14b8a6', '#ff5757', '#facc15', '#2dd4bf',
    '#d97aff', '#fb923c', '#5eead4', '#ff7a7a', '#fde047', '#99f6e4',
    '#8b5cf6', '#06b6d4', '#84cc16', '#f59e0b', '#ef4444', '#10b981'
  ];

  const backgroundPresets = [
    '#fefcfb', '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1',
    '#1e293b', '#0f172a', '#000000', '#fef2f2', '#fef7ed', '#f0fdf4'
  ];

  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  const exportIcon = async (format) => {
    console.log(`📤 Exporting ${selectedIcon} as ${format}`);
    setIsExporting(true);

    try {
      let content, filename, mimeType;

      if (format === 'SVG') {
        content = createSVGContent();
        filename = `${selectedIcon.toLowerCase()}-icon.svg`;
        mimeType = 'image/svg+xml';
      } else if (format === 'PNG') {
        content = await createPNGContent();
        filename = `${selectedIcon.toLowerCase()}-icon.png`;
        mimeType = 'image/png';
      } else if (format === 'React') {
        content = createReactContent();
        filename = `${selectedIcon}Icon.jsx`;
        mimeType = 'text/javascript';
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      console.log(`✅ Exported ${selectedIcon} as ${format} successfully`);
      showSuccessNotification(`🎉 ${selectedIcon} exported as ${format}!`, `File: ${filename}\nColor: ${iconColor}\nSize: ${iconSize}px`);

    } catch (error) {
      console.error('❌ Export failed:', error);
      showErrorNotification('❌ Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const showSuccessNotification = (title, message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-6 right-6 z-[9999] transform translate-x-full transition-transform duration-500';
    notification.innerHTML = `
      <div class="bg-white/95 backdrop-blur-lg rounded-[1.5rem] p-8 shadow-neumorphic border border-green-200/50 max-w-sm">
        <div class="flex items-start space-x-6">
          <div class="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 rounded-[1rem] flex items-center justify-center shadow-neumorphic-sm">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-warm-800 text-xl mb-2">${title}</h4>
            <p class="text-warm-600 text-base whitespace-pre-line leading-relaxed">${message}</p>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="p-2 text-warm-400 hover:text-warm-600 hover:bg-warm-100 rounded-xl transition-all duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  };

  const showErrorNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-6 right-6 z-[9999] transform translate-x-full transition-transform duration-500';
    notification.innerHTML = `
      <div class="bg-white/95 backdrop-blur-lg rounded-[1.5rem] p-8 shadow-neumorphic border border-red-200/50 max-w-sm">
        <div class="flex items-start space-x-6">
          <div class="w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 rounded-[1rem] flex items-center justify-center shadow-neumorphic-sm">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-warm-800 text-xl mb-2">Export Error</h4>
            <p class="text-warm-600 text-base">${message}</p>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="p-2 text-warm-400 hover:text-warm-600 hover:bg-warm-100 rounded-xl transition-all duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 500);
    }, 4000);
  };

  const createSVGContent = () => {
    return `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" fill="${backgroundColor}" rx="4"/>
  <g transform="translate(2,2)" fill="none" stroke="${iconColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    <!-- ${selectedIcon} icon -->
    <circle cx="10" cy="10" r="8"/>
    <path d="M8 12l2 2 4-4"/>
  </g>
</svg>`;
  };

  const createPNGContent = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = iconSize * 2;
    canvas.height = iconSize * 2;

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = iconColor;
    ctx.font = `${iconSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(selectedIcon[0], canvas.width / 2, canvas.height / 2);

    return new Promise(resolve => {
      canvas.toBlob(blob => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsArrayBuffer(blob);
      });
    });
  };

  const createReactContent = () => {
    const IconComponent = getIconComponent(selectedIcon);
    return `import React from 'react';
import { ${IconComponent.name} } from 'react-icons/fi';

const ${selectedIcon}Icon = ({ size = ${iconSize}, color = "${iconColor}", ...props }) => {
  return (
    <${IconComponent.name}
      size={size}
      color={color}
      strokeWidth={${strokeWidth}}
      {...props}
    />
  );
};

export default ${selectedIcon}Icon;`.trim();
  };

  const resetSettings = () => {
    console.log('🔄 Resetting editor settings');
    setIconColor('#c84bff');
    setIconSize(48);
    setStrokeWidth(2);
    setBackgroundColor('#fefcfb');
    showSuccessNotification('🔄 Settings Reset', 'All settings have been reset to defaults');
  };

  const handleIconSelect = (iconName) => {
    console.log(`🎯 Icon selected: ${iconName}`);
    setSelectedIcon(iconName);
  };

  const handleGeneratedIconSelect = (icon) => {
    console.log(`🎯 Generated icon selected: ${icon.name}`);
    setSelectedIcon(icon.name);
    setIconColor(icon.color);
    setSelectedGeneratedIcon(icon);
    setActiveTab('library');
  };

  const handleFavoriteSelect = (favorite) => {
    console.log(`⭐ Favorite selected: ${favorite.name}`);
    setSelectedIcon(favorite.name);
    setIconColor(favorite.color);
    setIconSize(favorite.size);
    setStrokeWidth(favorite.strokeWidth);
    setBackgroundColor(favorite.backgroundColor);
    setActiveTab('library');
  };

  const handleColorChange = (color, source = 'picker') => {
    console.log(`🎨 Color changed: ${color} (${source})`);
    setIconColor(color);
  };

  const handleSizeChange = (size) => {
    console.log(`📏 Size changed: ${size}px`);
    setIconSize(size);
  };

  const handleStrokeChange = (stroke) => {
    console.log(`✏️ Stroke width changed: ${stroke}px`);
    setStrokeWidth(stroke);
  };

  const handleBackgroundChange = (bg) => {
    console.log(`🖼️ Background changed: ${bg}`);
    setBackgroundColor(bg);
  };

  const copyIconCode = () => {
    const code = createReactContent();
    navigator.clipboard.writeText(code);
    showSuccessNotification('📋 Code Copied!', 'React component code copied to clipboard');
  };

  const saveToFavorites = () => {
    const newFavorite = {
      id: `${selectedIcon}_${Date.now()}`,
      name: selectedIcon,
      color: iconColor,
      size: iconSize,
      strokeWidth,
      backgroundColor,
      timestamp: Date.now()
    };
    
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('iconify_favorites', JSON.stringify(updatedFavorites));
    showSuccessNotification('⭐ Saved to Favorites!', `${selectedIcon} configuration saved`);
  };

  const removeFavorite = (favoriteId) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
    setFavorites(updatedFavorites);
    localStorage.setItem('iconify_favorites', JSON.stringify(updatedFavorites));
    showSuccessNotification('🗑️ Removed from Favorites', 'Favorite configuration removed');
  };

  const tabs = [
    { id: 'library', label: 'Library', icon: FiGrid },
    { id: 'generated', label: 'AI Generated', icon: FiZap, badge: generatedIcons.length },
    { id: 'favorites', label: 'Favorites', icon: FiHeart, badge: favorites.length }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-[1.5rem] flex items-center justify-center shadow-neumorphic mr-4">
              <SafeIcon icon={FiEdit3} className="w-8 h-8 text-white" />
            </div>
            <div className="px-6 py-2 bg-gradient-to-r from-primary-100 via-secondary-100 to-warm-100 rounded-[1rem] border border-primary-200 shadow-neumorphic-sm">
              <span className="text-sm font-bold text-primary-700">✨ Professional Editor</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-warm-800 mb-6">Professional Icon Editor</h1>
          <p className="text-xl text-warm-600 max-w-3xl mx-auto leading-relaxed">
            Customize your icons with precision. Adjust colors, sizes, and styles to create the perfect icon for your project.
          </p>
        </motion.div>

        {/* OPTIMIZED THREE COLUMN LAYOUT WITH BETTER SPACING */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Icon Selection - Enhanced Spacing and Layout */}
          <div className="xl:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/95 backdrop-blur-sm rounded-[1.5rem] p-8 shadow-neumorphic border border-white/60 h-full"
            >
              {/* Enhanced Tab Navigation with Better Fit and Spacing */}
              <div className="flex space-x-3 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-5 py-4 rounded-xl font-semibold text-sm transition-all duration-300 flex flex-col items-center space-y-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-neumorphic-inset'
                        : 'text-warm-600 hover:text-warm-800 hover:bg-warm-100 shadow-neumorphic-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <SafeIcon icon={tab.icon} className="w-5 h-5" />
                      {tab.badge && tab.badge > 0 && (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-600'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Enhanced Tab Content with Better Spacing */}
              <AnimatePresence mode="wait">
                {activeTab === 'library' && (
                  <motion.div
                    key="library"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-warm-800">Icon Library</h3>
                      <span className="px-3 py-1 bg-warm-100 text-warm-600 rounded-lg text-sm font-medium">
                        {availableIcons.length}
                      </span>
                    </div>
                    
                    {/* Optimized Icon Grid with Better Spacing */}
                    <div className="grid grid-cols-6 gap-4 max-h-96 overflow-y-auto pr-2">
                      {availableIcons.map((iconName) => (
                        <motion.button
                          key={iconName}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleIconSelect(iconName)}
                          className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 p-3 ${
                            selectedIcon === iconName
                              ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-neumorphic-inset'
                              : 'bg-warm-100 text-warm-600 hover:bg-warm-200 shadow-neumorphic-sm hover:shadow-neumorphic'
                          }`}
                          title={`Select ${iconName} icon`}
                        >
                          <SafeIcon icon={getIconComponent(iconName)} className="w-5 h-5" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'generated' && (
                  <motion.div
                    key="generated"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-warm-800">AI Generated</h3>
                      <span className="px-3 py-1 bg-primary-100 text-primary-600 rounded-lg text-sm font-medium">
                        {generatedIcons.length}
                      </span>
                    </div>
                    
                    {generatedIcons.length > 0 ? (
                      <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
                        {generatedIcons.map((icon) => (
                          <motion.button
                            key={icon.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleGeneratedIconSelect(icon)}
                            className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 border-2 p-3 ${
                              selectedGeneratedIcon?.id === icon.id
                                ? 'border-primary-400 bg-primary-50 shadow-neumorphic-inset'
                                : 'border-white/60 bg-white hover:border-primary-300 shadow-neumorphic-sm hover:shadow-neumorphic'
                            }`}
                            style={{ backgroundColor: selectedGeneratedIcon?.id === icon.id ? `${icon.color}15` : 'white' }}
                          >
                            <SafeIcon 
                              icon={getIconComponent(icon.name)} 
                              className="w-5 h-5" 
                              style={{ color: icon.color }}
                            />
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 flex-1 flex flex-col items-center justify-center">
                        <SafeIcon icon={FiZap} className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                        <p className="text-warm-600 text-lg font-medium">No AI generated icons yet</p>
                        <p className="text-warm-500 text-base mt-2">Use the Generator to create some!</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'favorites' && (
                  <motion.div
                    key="favorites"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-warm-800">Favorites</h3>
                      <span className="px-3 py-1 bg-coral-100 text-coral-600 rounded-lg text-sm font-medium">
                        {favorites.length}
                      </span>
                    </div>
                    
                    {favorites.length > 0 ? (
                      <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-2">
                        {favorites.map((favorite) => (
                          <motion.div
                            key={favorite.id}
                            className="relative group"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleFavoriteSelect(favorite)}
                              className="w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 border-2 border-white/60 bg-white hover:border-coral-300 shadow-neumorphic-sm hover:shadow-neumorphic p-3"
                              style={{ backgroundColor: `${favorite.color}15` }}
                            >
                              <SafeIcon 
                                icon={getIconComponent(favorite.name)} 
                                className="w-5 h-5" 
                                style={{ color: favorite.color }}
                              />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFavorite(favorite.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs shadow-neumorphic-sm"
                            >
                              ×
                            </motion.button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 flex-1 flex flex-col items-center justify-center">
                        <SafeIcon icon={FiHeart} className="w-16 h-16 text-coral-500 mx-auto mb-4" />
                        <p className="text-warm-600 text-lg font-medium">No favorites yet</p>
                        <p className="text-warm-500 text-base mt-2">Save icons you love!</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* MIDDLE COLUMN: Preview - Enhanced Layout */}
          <div className="xl:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/95 backdrop-blur-sm rounded-[1.5rem] p-8 shadow-neumorphic border border-white/60 h-full flex flex-col"
            >
              {/* Enhanced Header with Better Spacing */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-warm-800">Preview</h3>
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={saveToFavorites}
                    className="p-3 bg-coral-100 text-coral-600 rounded-xl shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300"
                    title="Save to favorites"
                  >
                    <SafeIcon icon={FiHeart} className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetSettings}
                    className="p-3 bg-warm-100 text-warm-600 rounded-xl shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-300"
                    title="Reset settings"
                  >
                    <SafeIcon icon={FiRotateCcw} className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Preview Area with More Space */}
              <div 
                className="w-full h-80 rounded-[1.5rem] flex items-center justify-center shadow-neumorphic-inset mb-8 border-2 border-white/50 relative overflow-hidden"
                style={{ backgroundColor }}
              >
                <motion.div
                  key={`${selectedIcon}-${iconColor}-${iconSize}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <SafeIcon 
                    icon={getIconComponent(selectedIcon)} 
                    style={{ 
                      color: iconColor, 
                      fontSize: `${iconSize * 1.5}px`,
                      strokeWidth: strokeWidth,
                      filter: `drop-shadow(0 ${iconSize/12}px ${iconSize/8}px rgba(0,0,0,0.1))`
                    }} 
                  />
                </motion.div>
              </div>

              {/* Enhanced Icon Info with Better Layout */}
              <div className="bg-gradient-to-r from-warm-50 to-primary-50 rounded-[1rem] p-6 mb-8 border border-white/30">
                <h4 className="font-bold text-warm-800 mb-4 text-xl">{selectedIcon} Icon</h4>
                <div className="grid grid-cols-2 gap-4 text-base">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-warm-700">Color:</span>
                    <div className="w-5 h-5 rounded-lg border border-white shadow-sm" style={{ backgroundColor: iconColor }}></div>
                    <span className="text-warm-600 font-mono text-sm">{iconColor}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-warm-700">Size:</span>
                    <span className="text-warm-600 ml-3">{iconSize}px</span>
                  </div>
                  <div>
                    <span className="font-semibold text-warm-700">Stroke:</span>
                    <span className="text-warm-600 ml-3">{strokeWidth}px</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-warm-700">Background:</span>
                    <div className="w-5 h-5 rounded-lg border border-white shadow-sm" style={{ backgroundColor }}></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Export Buttons with Better Spacing */}
              <div className="space-y-4 mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => exportIcon('SVG')}
                  disabled={isExporting}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-[1rem] font-bold text-lg shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                  <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  <span>{isExporting ? 'Exporting...' : 'Export as SVG'}</span>
                </motion.button>

                <div className="grid grid-cols-3 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => exportIcon('PNG')}
                    disabled={isExporting}
                    className="py-3 bg-white text-warm-600 rounded-xl font-semibold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200 disabled:opacity-50"
                  >
                    PNG
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => exportIcon('React')}
                    disabled={isExporting}
                    className="py-3 bg-white text-warm-600 rounded-xl font-semibold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200 disabled:opacity-50"
                  >
                    React
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={copyIconCode}
                    className="py-3 bg-white text-warm-600 rounded-xl font-semibold shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-warm-200 flex items-center justify-center"
                  >
                    <SafeIcon icon={FiCopy} className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Enhanced Controls with Better Spacing */}
          <div className="xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Enhanced Color Control */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[1rem] p-6 shadow-neumorphic border border-white/60">
                <h4 className="text-lg font-bold text-warm-800 mb-5 flex items-center space-x-3">
                  <SafeIcon icon={FiPalette} className="w-5 h-5 text-primary-600" />
                  <span>Color</span>
                </h4>
                <div className="space-y-4">
                  <input
                    type="color"
                    value={iconColor}
                    onChange={(e) => handleColorChange(e.target.value, 'picker')}
                    className="w-full h-10 rounded-lg shadow-neumorphic-inset cursor-pointer border border-white"
                  />
                  <div className="grid grid-cols-6 gap-2">
                    {presetColors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleColorChange(color, 'preset')}
                        className={`aspect-square rounded-lg shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-200 border ${
                          iconColor === color ? 'border-primary-400 border-2' : 'border-white'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Size Control */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[1rem] p-6 shadow-neumorphic border border-white/60">
                <h4 className="text-lg font-bold text-warm-800 mb-5 flex items-center space-x-3">
                  <SafeIcon icon={FiLayers} className="w-5 h-5 text-secondary-600" />
                  <span>Size</span>
                </h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="24"
                    max="128"
                    value={iconSize}
                    onChange={(e) => handleSizeChange(Number(e.target.value))}
                    className="w-full h-3 bg-warm-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-secondary-500 to-warm-500 bg-clip-text text-transparent">
                      {iconSize}px
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[24, 32, 48, 64].map(size => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          iconSize === size 
                            ? 'bg-secondary-100 text-secondary-700 shadow-neumorphic-inset' 
                            : 'bg-warm-100 text-warm-600 hover:bg-warm-200 shadow-neumorphic-sm'
                        }`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Stroke Width */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[1rem] p-6 shadow-neumorphic border border-white/60">
                <h4 className="text-lg font-bold text-warm-800 mb-5">Stroke Width</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.5"
                    value={strokeWidth}
                    onChange={(e) => handleStrokeChange(Number(e.target.value))}
                    className="w-full h-3 bg-warm-200 rounded-full appearance-none cursor-pointer slider"
                  />
                  <div className="text-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-primary-500 bg-clip-text text-transparent">
                      {strokeWidth}px
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Background Color */}
              <div className="bg-white/95 backdrop-blur-sm rounded-[1rem] p-6 shadow-neumorphic border border-white/60">
                <h4 className="text-lg font-bold text-warm-800 mb-5">Background</h4>
                <div className="space-y-4">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => handleBackgroundChange(e.target.value)}
                    className="w-full h-10 rounded-lg shadow-neumorphic-inset cursor-pointer border border-white"
                  />
                  <div className="grid grid-cols-6 gap-2">
                    {backgroundPresets.map((bg) => (
                      <motion.button
                        key={bg}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleBackgroundChange(bg)}
                        className={`aspect-square rounded-lg shadow-neumorphic-sm hover:shadow-neumorphic transition-all duration-200 border ${
                          backgroundColor === bg ? 'border-primary-400 border-2' : 'border-white'
                        }`}
                        style={{ backgroundColor: bg }}
                        title={bg}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconEditor;
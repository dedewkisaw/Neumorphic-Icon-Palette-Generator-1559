import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ColorPicker from './ColorPicker';
import IconCustomizationModal from './IconCustomizationModal';
import CommunitySection from './CommunitySection';
import ProjectsSection from './ProjectsSection';

const { FiZap, FiUpload, FiDownload, FiSettings, FiUsers, FiFolderPlus, FiRefreshCw, FiSave, FiEdit3, FiCopy, FiHeart, FiShare2 } = FiIcons;

const IconPaletteGenerator = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [keyword, setKeyword] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('line');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedIcons, setGeneratedIcons] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [currentPalette, setCurrentPalette] = useState({ name: '', icons: [] });
  const fileInputRef = useRef(null);

  // AI Icon Generation Engine
  const generateIcons = async (keyword, style = 'line') => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const iconSuggestions = getContextualIcons(keyword);
    const harmonizedColors = generateHarmonizedColors(keyword);
    
    const icons = iconSuggestions.map((iconName, index) => ({
      id: `${iconName}-${Date.now()}-${index}`,
      name: iconName,
      component: getIconComponent(iconName),
      color: harmonizedColors[index % harmonizedColors.length],
      strokeWidth: style === 'line' ? 2 : style === 'glyph' ? 0 : 1.5,
      style: style,
      size: 24,
      customizable: true
    }));

    setGeneratedIcons(icons);
    setCurrentPalette({ name: `${keyword} Icons`, icons });
    setIsGenerating(false);
  };

  // Image Analysis for Style Extraction
  const analyzeUploadedImage = async (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const analysis = extractImageColors(imageData);
          resolve(analysis);
        } catch (error) {
          resolve(generateFallbackAnalysis(file.name));
        }
      };
      
      img.onerror = () => resolve(generateFallbackAnalysis(file.name));
      img.src = URL.createObjectURL(file);
    });
  };

  // Contextual Icon Suggestions
  const getContextualIcons = (keyword) => {
    const iconMappings = {
      business: ['Briefcase', 'TrendingUp', 'Users', 'Target', 'Award'],
      finance: ['DollarSign', 'TrendingUp', 'PieChart', 'CreditCard', 'BarChart'],
      tech: ['Cpu', 'Code', 'Database', 'Cloud', 'Smartphone'],
      health: ['Heart', 'Activity', 'Shield', 'Plus', 'Zap'],
      education: ['BookOpen', 'GraduationCap', 'Lightbulb', 'Target', 'Award'],
      social: ['Users', 'MessageCircle', 'Share2', 'Heart', 'ThumbsUp'],
      travel: ['MapPin', 'Compass', 'Camera', 'Globe', 'Plane'],
      food: ['Coffee', 'Star', 'Clock', 'Heart', 'Utensils']
    };

    const keywordLower = keyword.toLowerCase();
    
    // Find best match
    for (const [category, icons] of Object.entries(iconMappings)) {
      if (keywordLower.includes(category) || category.includes(keywordLower)) {
        return icons;
      }
    }
    
    return ['Home', 'Search', 'Settings', 'User', 'Mail']; // Default
  };

  // Harmonized Color Generation
  const generateHarmonizedColors = (keyword) => {
    const baseColors = {
      business: '#6366F1',
      finance: '#059669',
      tech: '#8B5CF6',
      health: '#EF4444',
      education: '#F59E0B',
      social: '#EC4899',
      travel: '#06B6D4',
      food: '#F97316'
    };

    const keywordLower = keyword.toLowerCase();
    let baseColor = '#6366F1'; // Default

    for (const [category, color] of Object.entries(baseColors)) {
      if (keywordLower.includes(category)) {
        baseColor = color;
        break;
      }
    }

    return generateColorHarmony(baseColor);
  };

  // Color Harmony Generator
  const generateColorHarmony = (baseColor) => {
    // Convert hex to HSL for manipulation
    const hsl = hexToHsl(baseColor);
    
    return [
      baseColor,
      hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
      hslToHex((hsl.h + 60) % 360, hsl.s * 0.8, hsl.l * 1.1),
      hslToHex((hsl.h + 180) % 360, hsl.s * 0.9, hsl.l),
      hslToHex((hsl.h + 120) % 360, hsl.s * 0.7, hsl.l * 0.9)
    ];
  };

  // Utility Functions
  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  const hexToHsl = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    const sum = max + min;
    const l = sum / 2;

    let h, s;
    if (diff === 0) {
      h = s = 0;
    } else {
      s = l > 0.5 ? diff / (2 - sum) : diff / sum;
      switch (max) {
        case r: h = ((g - b) / diff + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / diff + 2) / 6; break;
        case b: h = ((r - g) / diff + 4) / 6; break;
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h, s, l) => {
    h = h / 360; s = s / 100; l = l / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = l - c / 2;
    let r, g, b;

    if (h < 1/6) [r, g, b] = [c, x, 0];
    else if (h < 2/6) [r, g, b] = [x, c, 0];
    else if (h < 3/6) [r, g, b] = [0, c, x];
    else if (h < 4/6) [r, g, b] = [0, x, c];
    else if (h < 5/6) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const extractImageColors = (imageData) => {
    const { data } = imageData;
    const colorCounts = {};
    
    // Sample every 40th pixel for performance
    for (let i = 0; i < data.length; i += 160) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }
    
    return Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color]) => color);
  };

  const generateFallbackAnalysis = (filename) => {
    const hash = filename.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#06B6D4'];
    return colors.slice(0, 5);
  };

  // File Upload Handler
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedImage(file);
    const colors = await analyzeUploadedImage(file);
    const filename = file.name.split('.')[0];
    
    // Generate icons based on filename and extracted colors
    const icons = getContextualIcons(filename).map((iconName, index) => ({
      id: `${iconName}-${Date.now()}-${index}`,
      name: iconName,
      component: getIconComponent(iconName),
      color: colors[index % colors.length],
      strokeWidth: 2,
      style: 'line',
      size: 24,
      customizable: true
    }));

    setGeneratedIcons(icons);
    setCurrentPalette({ name: `${filename} Palette`, icons });
  };

  // Export Functions
  const exportAsSVG = (icon) => {
    const svgContent = createSVGContent(icon);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${icon.name.toLowerCase()}-icon.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportPalette = () => {
    const paletteData = {
      name: currentPalette.name,
      icons: currentPalette.icons.map(icon => ({
        name: icon.name,
        color: icon.color,
        strokeWidth: icon.strokeWidth,
        style: icon.style,
        size: icon.size
      })),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentPalette.name.toLowerCase().replace(/\s+/g, '-')}-palette.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const createSVGContent = (icon) => {
    const { name, color, strokeWidth, size, style } = icon;
    
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="${getIconPath(name)}" 
        fill="${style === 'glyph' ? color : 'none'}"
        stroke="${style === 'glyph' ? 'none' : color}"
        stroke-width="${style === 'glyph' ? 0 : strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>`;
  };

  const getIconPath = (iconName) => {
    // Simplified icon paths for demo
    const paths = {
      'Home': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
      'Search': 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35',
      'Settings': 'M12.22 2l-.44.1a9.94 9.94 0 0 0-7.75 7.75l-.03.44v3.56l.03.44a9.94 9.94 0 0 0 7.75 7.75l.44.03h.44l.44-.03a9.94 9.94 0 0 0 7.75-7.75l.03-.44v-3.56l-.03-.44A9.94 9.94 0 0 0 12.66 2l-.44-.03h-.44z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'
    };
    return paths[iconName] || 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
  };

  // Save Palette
  const savePalette = () => {
    const newPalette = {
      ...currentPalette,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setSavedPalettes(prev => [...prev, newPalette]);
    
    // Show success notification
    showNotification('Palette Saved!', 'Your icon palette has been saved to projects.');
  };

  const showNotification = (title, message) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/15 shadow-soft z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <p class="text-white font-medium">${title}</p>
          <p class="text-white/60 text-sm">${message}</p>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const styleOptions = [
    { id: 'line', name: 'Line', icon: '○', description: 'Outlined icons' },
    { id: 'flat', name: 'Flat', icon: '●', description: 'Filled icons' },
    { id: 'glyph', name: 'Glyph', icon: '◐', description: 'Solid icons' },
    { id: 'duotone', name: 'Duotone', icon: '◑', description: 'Two-tone icons' }
  ];

  const tabs = [
    { id: 'generate', name: 'Generate', icon: FiZap },
    { id: 'community', name: 'Community', icon: FiUsers },
    { id: 'projects', name: 'Projects', icon: FiFolderPlus }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Premium Icon Palette Generator
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Create stunning icon sets with AI-powered generation and advanced customization
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/15">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'generate' && (
            <motion.div
              key="generate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Generation Controls */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/15 shadow-soft">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Keyword Input */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Generate from Keywords</h3>
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          value={keyword}
                          onChange={(e) => setKeyword(e.target.value)}
                          placeholder="e.g., business, finance, tech..."
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent"
                        />
                      </div>
                      
                      {/* Style Selection */}
                      <div className="grid grid-cols-2 gap-2">
                        {styleOptions.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`p-3 rounded-lg text-left transition-all duration-300 ${
                              selectedStyle === style.id
                                ? 'bg-indigo-500/20 border-2 border-indigo-500/50 text-white'
                                : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-lg">{style.icon}</span>
                              <span className="font-medium">{style.name}</span>
                            </div>
                            <p className="text-xs opacity-60">{style.description}</p>
                          </button>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => generateIcons(keyword, selectedStyle)}
                        disabled={!keyword.trim() || isGenerating}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {isGenerating ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                            </motion.div>
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <SafeIcon icon={FiZap} className="w-4 h-4" />
                            <span>Generate Icons</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Upload Image for Analysis</h3>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-white/30 transition-colors"
                    >
                      <SafeIcon icon={FiUpload} className="w-8 h-8 text-white/40 mx-auto mb-2" />
                      <p className="text-white/60 mb-1">Drop an image or click to browse</p>
                      <p className="text-white/40 text-sm">PNG, JPG up to 10MB</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                    {uploadedImage && (
                      <div className="mt-4 p-3 bg-white/10 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <SafeIcon icon={FiZap} className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{uploadedImage.name}</p>
                            <p className="text-white/60 text-sm">Colors extracted and analyzed</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Generated Icons */}
              {generatedIcons.length > 0 && (
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/15 shadow-soft">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Generated Icon Palette</h3>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={savePalette}
                        className="px-4 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors flex items-center space-x-2"
                      >
                        <SafeIcon icon={FiSave} className="w-4 h-4" />
                        <span>Save Palette</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={exportPalette}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg flex items-center space-x-2"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        <span>Export</span>
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    {generatedIcons.map((icon, index) => (
                      <motion.div
                        key={icon.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-white/10 rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300"
                      >
                        <div className="mb-4 flex justify-center">
                          <div 
                            className="p-4 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors"
                            style={{ color: icon.color }}
                          >
                            <SafeIcon 
                              icon={icon.component} 
                              className="w-8 h-8"
                              style={{ 
                                strokeWidth: icon.strokeWidth,
                                fill: icon.style === 'glyph' ? icon.color : 'none'
                              }}
                            />
                          </div>
                        </div>
                        
                        <h4 className="text-white font-medium mb-2">{icon.name}</h4>
                        <div className="flex justify-center space-x-1">
                          <button
                            onClick={() => {
                              setSelectedIcon(icon);
                              setShowCustomizeModal(true);
                            }}
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                          >
                            <SafeIcon icon={FiEdit3} className="w-3 h-3 text-white" />
                          </button>
                          <button
                            onClick={() => exportAsSVG(icon)}
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                          >
                            <SafeIcon icon={FiDownload} className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CommunitySection />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProjectsSection savedPalettes={savedPalettes} setSavedPalettes={setSavedPalettes} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Customization Modal */}
      <IconCustomizationModal
        isOpen={showCustomizeModal}
        onClose={() => setShowCustomizeModal(false)}
        icon={selectedIcon}
        onSave={(updatedIcon) => {
          setGeneratedIcons(prev => 
            prev.map(icon => icon.id === updatedIcon.id ? updatedIcon : icon)
          );
          setShowCustomizeModal(false);
        }}
      />
    </div>
  );
};

export default IconPaletteGenerator;
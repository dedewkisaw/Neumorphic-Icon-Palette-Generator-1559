import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import IconPalette from './IconPalette';
import StyleSelector from './StyleSelector';
import AIIconGenerator from './AIIconGenerator';
import EnhancedFileUpload from './EnhancedFileUpload';

const { FiSearch, FiRefreshCw, FiZap, FiShuffle, FiBrain } = FiIcons;

const PaletteGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('flat');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPalettes, setGeneratedPalettes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [designAnalysis, setDesignAnalysis] = useState(null);
  const [aiGeneratedIcons, setAIGeneratedIcons] = useState([]);

  // ENHANCED: Professional Color Palette Generation System
  const generateHarmoniousColors = (baseKeyword, paletteType = 'primary') => {
    const keywordLower = baseKeyword.toLowerCase();
    
    // Professional color psychology and harmony rules
    const colorHarmonyRules = {
      // Monochromatic harmonies - variations of single hue
      monochromatic: (baseHue, baseSat, baseLum) => [
        `hsl(${baseHue}, ${Math.max(20, baseSat - 30)}%, ${Math.min(85, baseLum + 20)}%)`,
        `hsl(${baseHue}, ${baseSat}%, ${baseLum}%)`,
        `hsl(${baseHue}, ${Math.min(100, baseSat + 15)}%, ${Math.max(25, baseLum - 15)}%)`,
        `hsl(${baseHue}, ${Math.min(100, baseSat + 25)}%, ${Math.max(15, baseLum - 30)}%)`
      ],
      
      // Analogous harmonies - adjacent colors on color wheel
      analogous: (baseHue, baseSat, baseLum) => [
        `hsl(${(baseHue - 30 + 360) % 360}, ${baseSat}%, ${baseLum}%)`,
        `hsl(${baseHue}, ${baseSat}%, ${baseLum}%)`,
        `hsl(${(baseHue + 30) % 360}, ${baseSat}%, ${baseLum}%)`,
        `hsl(${(baseHue + 60) % 360}, ${Math.max(40, baseSat - 20)}%, ${Math.min(80, baseLum + 10)}%)`
      ],
      
      // Complementary harmonies - opposite colors
      complementary: (baseHue, baseSat, baseLum) => [
        `hsl(${baseHue}, ${baseSat}%, ${baseLum}%)`,
        `hsl(${(baseHue + 180) % 360}, ${baseSat}%, ${baseLum}%)`,
        `hsl(${baseHue}, ${Math.max(30, baseSat - 25)}%, ${Math.min(85, baseLum + 15)}%)`,
        `hsl(${(baseHue + 180) % 360}, ${Math.max(30, baseSat - 25)}%, ${Math.min(85, baseLum + 15)}%)`
      ],
      
      // Triadic harmonies - three evenly spaced colors
      triadic: (baseHue, baseSat, baseLum) => [
        `hsl(${baseHue}, ${baseSat}%, ${baseLum}%)`,
        `hsl(${(baseHue + 120) % 360}, ${baseSat}%, ${baseLum}%)`,
        `hsl(${(baseHue + 240) % 360}, ${baseSat}%, ${baseLum}%)`,
        `hsl(${baseHue}, ${Math.max(20, baseSat - 40)}%, ${Math.min(90, baseLum + 25)}%)`
      ]
    };

    // Industry-specific color schemes with proper harmony
    const industryColorSchemes = {
      finance: { hue: 190, saturation: 65, lightness: 50, harmony: 'complementary' },
      health: { hue: 350, saturation: 70, lightness: 55, harmony: 'analogous' },
      tech: { hue: 260, saturation: 75, lightness: 60, harmony: 'triadic' },
      education: { hue: 25, saturation: 80, lightness: 58, harmony: 'analogous' },
      travel: { hue: 45, saturation: 85, lightness: 62, harmony: 'triadic' },
      food: { hue: 90, saturation: 70, lightness: 55, harmony: 'complementary' },
      social: { hue: 200, saturation: 75, lightness: 60, harmony: 'analogous' },
      sports: { hue: 0, saturation: 80, lightness: 58, harmony: 'complementary' },
      gaming: { hue: 270, saturation: 85, lightness: 55, harmony: 'triadic' },
      fashion: { hue: 320, saturation: 75, lightness: 65, harmony: 'complementary' },
      'real estate': { hue: 120, saturation: 60, lightness: 50, harmony: 'monochromatic' },
      entertainment: { hue: 35, saturation: 85, lightness: 60, harmony: 'triadic' }
    };

    // Find the best matching industry
    let selectedScheme = industryColorSchemes.tech; // default
    for (const [industry, scheme] of Object.entries(industryColorSchemes)) {
      if (keywordLower.includes(industry) || industry.includes(keywordLower)) {
        selectedScheme = scheme;
        break;
      }
    }

    const { hue, saturation, lightness, harmony } = selectedScheme;
    
    // Generate harmonious colors based on the selected harmony rule
    const harmoniousColors = colorHarmonyRules[harmony](hue, saturation, lightness);
    
    // Convert HSL to HEX for consistency
    return harmoniousColors.map(hslColor => hslToHex(hslColor));
  };

  // Helper function to convert HSL to HEX
  const hslToHex = (hslString) => {
    const hslMatch = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!hslMatch) return '#c84bff';
    
    const h = parseInt(hslMatch[1]) / 360;
    const s = parseInt(hslMatch[2]) / 100;
    const l = parseInt(hslMatch[3]) / 100;
    
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // ENHANCED: Dynamic icon mapping based on keywords
  const getContextualIcons = (keyword) => {
    const keywordLower = keyword.toLowerCase();
    
    const iconMappings = {
      finance: ['TrendingUp', 'DollarSign', 'PieChart', 'BarChart', 'CreditCard', 'Briefcase'],
      banking: ['Building', 'Shield', 'Lock', 'CreditCard', 'DollarSign', 'Archive'],
      business: ['Briefcase', 'Target', 'Award', 'Users', 'Building', 'TrendingUp'],
      ecommerce: ['ShoppingCart', 'Package', 'Truck', 'Gift', 'Tag', 'Store'],
      health: ['Heart', 'Activity', 'Shield', 'Plus', 'Sun', 'Zap'],
      medical: ['Plus', 'Heart', 'Activity', 'Shield', 'Eye', 'Thermometer'],
      tech: ['Smartphone', 'Monitor', 'Wifi', 'Cloud', 'Code', 'Cpu'],
      technology: ['Cpu', 'Database', 'Server', 'Code', 'Monitor', 'Cloud'],
      education: ['Book', 'GraduationCap', 'Award', 'Lightbulb', 'Pencil', 'Calculator'],
      learning: ['Lightbulb', 'Book', 'Target', 'CheckCircle', 'Star', 'Award'],
      travel: ['MapPin', 'Compass', 'Camera', 'Plane', 'Mountain', 'Globe'],
      adventure: ['Mountain', 'Compass', 'Sun', 'Camera', 'MapPin', 'Zap'],
      food: ['Coffee', 'Utensils', 'Apple', 'Star', 'Clock', 'Heart'],
      restaurant: ['Utensils', 'Coffee', 'Star', 'Clock', 'MapPin', 'Users'],
      entertainment: ['Play', 'Music', 'Video', 'Camera', 'Headphones', 'Star'],
      gaming: ['Target', 'Trophy', 'Zap', 'Star', 'Award', 'Shield'],
      social: ['Users', 'MessageCircle', 'Share', 'Heart', 'ThumbsUp', 'Camera'],
      communication: ['MessageCircle', 'Phone', 'Mail', 'Send', 'Users', 'Globe'],
      sports: ['Trophy', 'Target', 'Activity', 'Award', 'Zap', 'Star'],
      fitness: ['Activity', 'Heart', 'Target', 'TrendingUp', 'Award', 'Zap'],
      fashion: ['Star', 'Heart', 'Camera', 'Edit', 'Palette', 'Eye'],
      beauty: ['Star', 'Heart', 'Sun', 'Eye', 'Palette', 'Camera'],
      'real estate': ['Home', 'Building', 'MapPin', 'Key', 'Search', 'Star'],
      realestate: ['Home', 'Building', 'MapPin', 'Key', 'Search', 'Star']
    };

    // Find exact matches first
    if (iconMappings[keywordLower]) {
      return iconMappings[keywordLower];
    }

    // Find partial matches
    for (const [key, icons] of Object.entries(iconMappings)) {
      if (keywordLower.includes(key) || key.includes(keywordLower)) {
        return icons;
      }
    }

    return ['Home', 'Search', 'User', 'Settings', 'Bell', 'Mail'];
  };

  const handleGenerate = async () => {
    if (!keyword.trim() && !uploadedFile) return;

    console.log('🎯 Generating palettes for keyword:', keyword);
    setIsGenerating(true);
    setShowResults(false);

    setTimeout(() => {
      const mockPalettes = generateMockPalettes(keyword, selectedStyle);
      setGeneratedPalettes(mockPalettes);
      setIsGenerating(false);
      setShowResults(true);
    }, 2000);
  };

  const handleQuickKeywordSelect = (selectedKeyword) => {
    console.log('🚀 Quick keyword selected:', selectedKeyword);
    setKeyword(selectedKeyword);
    
    setTimeout(() => {
      const mockPalettes = generateMockPalettes(selectedKeyword, selectedStyle);
      setGeneratedPalettes(mockPalettes);
      setShowResults(true);
    }, 500);
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setKeyword(file.name.split('.')[0]);
    console.log('File uploaded:', file.name);
  };

  const handleAnalysisComplete = (analysis) => {
    setDesignAnalysis(analysis);
    if (analysis.suggestedStyle) {
      setSelectedStyle(analysis.suggestedStyle);
    }
  };

  const handleAIIconsGenerated = (icons) => {
    setAIGeneratedIcons(icons);
  };

  const handleEditIcon = (icon) => {
    console.log('🎨 Navigating to editor with icon:', icon);
    const editorUrl = `#/editor?icon=${encodeURIComponent(icon.name)}&color=${encodeURIComponent(icon.color)}&size=48&stroke=2`;
    window.location.href = editorUrl;
    
    setTimeout(() => {
      alert(`🎨 Opening Icon Editor!\n\nIcon: ${icon.name}\nColor: ${icon.color}\n\nYou can now customize this icon further in the editor.`);
    }, 100);
  };

  // ENHANCED: Dynamic palette generation with harmonious colors
  const generateMockPalettes = (keyword, style) => {
    const contextualIcons = getContextualIcons(keyword);
    
    console.log('Generated icons for', keyword, ':', contextualIcons);
    
    // Generate 5 unique variations with harmonious colors
    const palettes = [
      {
        id: 1,
        name: `${keyword} Professional`,
        style: style,
        icons: contextualIcons,
        colors: generateHarmoniousColors(keyword, 'professional'),
        theme: 'professional',
        gradient: 'from-primary-400 to-secondary-400'
      },
      {
        id: 2,
        name: `${keyword} Modern`,
        style: style,
        icons: [...contextualIcons.slice(0, 3), 'Grid', 'Layers', 'Zap'],
        colors: generateHarmoniousColors(keyword, 'modern'),
        theme: 'modern',
        gradient: 'from-teal-400 to-teal-600'
      },
      {
        id: 3,
        name: `${keyword} Minimal`,
        style: style,
        icons: [...contextualIcons.slice(0, 2), 'Circle', 'Square', 'Triangle', 'Minus'],
        colors: generateHarmoniousColors(keyword, 'minimal'),
        theme: 'minimal',
        gradient: 'from-primary-300 to-primary-600'
      },
      {
        id: 4,
        name: `${keyword} Bold`,
        style: style,
        icons: [...contextualIcons.slice(0, 4), 'Zap', 'Shield'],
        colors: generateHarmoniousColors(keyword, 'bold'),
        theme: 'bold',
        gradient: 'from-accent-400 to-accent-600'
      },
      {
        id: 5,
        name: `${keyword} Creative`,
        style: style,
        icons: [...contextualIcons.slice(0, 3), 'Smile', 'Sun', 'Star'],
        colors: generateHarmoniousColors(keyword, 'creative'),
        theme: 'creative',
        gradient: 'from-coral-400 to-coral-600'
      }
    ];

    return palettes;
  };

  const quickKeywords = [
    'Finance', 'Health', 'Tech', 'E-commerce', 
    'Travel', 'Food', 'Education', 'Sports',
    'Social', 'Gaming', 'Fashion', 'Real Estate'
  ];

  return (
    <section id="palette-generator" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Generator Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-warm-800 mb-6">
            Generate Your Perfect Icon Palette
          </h2>
          <p className="text-xl text-warm-600 max-w-3xl mx-auto leading-relaxed">
            Enter a keyword or upload your design to get AI-curated icon palettes with harmonious color combinations that match your project's style.
          </p>
        </motion.div>

        {/* Enhanced Input Section with Neumorphic Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-10 shadow-neumorphic mb-12 border border-white/60"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Keyword Input */}
            <div className="flex-1">
              <label className="block text-base font-semibold text-warm-700 mb-4">
                Describe your project
              </label>
              <div className="relative">
                <SafeIcon icon={FiSearch} className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-warm-400" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g., finance, health, tech, e-commerce..."
                  className="w-full pl-16 pr-6 py-5 bg-white/90 rounded-[1.5rem] border-0 shadow-neumorphic-inset text-warm-800 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                />
              </div>

              {/* Enhanced Quick Keywords with neumorphic buttons */}
              <div className="mt-6">
                <p className="text-sm text-warm-500 mb-4 font-medium">Quick suggestions:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {quickKeywords.map((kw) => (
                    <motion.button
                      key={kw}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickKeywordSelect(kw)}
                      className="px-4 py-3 text-sm bg-white/90 hover:bg-primary-50 text-warm-700 hover:text-primary-700 rounded-xl transition-all duration-300 font-medium shadow-neumorphic-sm hover:shadow-neumorphic border border-white/50"
                    >
                      {kw}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Upload Option */}
            <div className="lg:w-80">
              <label className="block text-base font-semibold text-warm-700 mb-4">
                Or upload design
              </label>
              <EnhancedFileUpload
                onFileUpload={handleFileUpload}
                onAnalysisComplete={handleAnalysisComplete}
                disabled={isGenerating}
              />
            </div>
          </div>

          {/* Style Selector */}
          <div className="mt-12">
            <StyleSelector
              selectedStyle={selectedStyle}
              onStyleChange={setSelectedStyle}
            />
          </div>

          {/* Enhanced Generate Button */}
          <div className="flex justify-center mt-12">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200,75,255,0.4), 0 0 60px rgba(249,115,22,0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={(!keyword.trim() && !uploadedFile) || isGenerating}
              className="px-12 py-5 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-[1.5rem] font-bold text-xl shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 flex items-center space-x-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <SafeIcon icon={FiRefreshCw} className="w-6 h-6" />
                  </motion.div>
                  <span>Generating Professional Palettes...</span>
                </>
              ) : (
                <>
                  <SafeIcon icon={FiZap} className="w-6 h-6" />
                  <span>Generate Harmonious Palettes</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* AI Icon Generator Section */}
        <AnimatePresence>
          {uploadedFile && (keyword.trim() || uploadedFile) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-[1rem] flex items-center justify-center shadow-neumorphic-sm">
                    <SafeIcon icon={FiBrain} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-warm-800">AI Icon Generator</h3>
                    <p className="text-warm-600 text-lg">
                      Deep learning powered icon creation with harmonious color palettes
                    </p>
                  </div>
                </div>
              </div>
              <AIIconGenerator
                projectDescription={keyword}
                uploadedImage={uploadedFile}
                selectedStyle={selectedStyle}
                onIconsGenerated={handleAIIconsGenerated}
                onEditIcon={handleEditIcon}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Palette Results Section */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              {/* Results Header */}
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h3 className="text-3xl font-bold text-warm-800">
                    Professional Palettes for "{keyword || uploadedFile?.name}"
                  </h3>
                  <p className="text-warm-600 mt-2 text-lg">
                    {generatedPalettes.length} harmonious palettes • {selectedStyle} style • Color theory applied
                    {designAnalysis && ` • Based on your design analysis`}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 180 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="p-4 bg-white/95 rounded-[1rem] shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 border border-white/60 disabled:opacity-50"
                    title="Regenerate palettes"
                  >
                    <SafeIcon icon={FiShuffle} className="w-6 h-6 text-warm-600" />
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Palettes Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {generatedPalettes.map((palette, index) => (
                  <motion.div
                    key={`${palette.id}-${keyword}-${Date.now()}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <IconPalette palette={palette} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PaletteGenerator;
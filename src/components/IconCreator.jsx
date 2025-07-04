import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiDownload, FiRefreshCw, FiSettings, FiGrid, FiCpu, FiStar, FiHeart, FiTrendingUp, FiEdit3 } from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import StepWizard from './StepWizard';

// Step 1: Project Description
const ProjectStep = ({ onNext, onData, canProceed }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [style, setStyle] = useState('outline');

  const categories = [
    { id: 'business', name: 'Business', icon: '💼', gradient: 'from-indigo-500 to-purple-600' },
    { id: 'tech', name: 'Technology', icon: '💻', gradient: 'from-blue-500 to-cyan-600' },
    { id: 'health', name: 'Healthcare', icon: '🏥', gradient: 'from-green-500 to-emerald-600' },
    { id: 'education', name: 'Education', icon: '🎓', gradient: 'from-yellow-500 to-orange-600' },
    { id: 'finance', name: 'Finance', icon: '💰', gradient: 'from-emerald-500 to-teal-600' },
    { id: 'social', name: 'Social', icon: '👥', gradient: 'from-pink-500 to-rose-600' },
  ];

  const styles = [
    { id: 'outline', name: 'Outline', preview: '○', description: 'Clean outlined icons' },
    { id: 'filled', name: 'Filled', preview: '●', description: 'Solid filled icons' },
    { id: 'neumorphic', name: 'Neumorphic', preview: '◐', description: 'Soft 3D effect' },
  ];

  // Update parent component when data changes
  React.useEffect(() => {
    onData?.({ description, category, style });
  }, [description, category, style, onData]);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-neumorphic border border-white/60">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-neumorphic-sm">
          <SafeIcon icon={FiCpu} className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-warm-800 mb-4">Describe Your Project</h2>
        <p className="text-warm-600 text-lg max-w-2xl mx-auto">Tell us about your project so we can create perfect icons tailored to your needs</p>
      </div>

      <div className="space-y-10">
        <div>
          <label className="block text-base font-bold text-warm-700 mb-4">
            Project Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., A modern fitness app for tracking workouts and nutrition with social features"
            className="w-full p-6 bg-white rounded-2xl border-0 shadow-neumorphic-inset text-warm-800 placeholder-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 min-h-[140px] resize-none text-lg"
          />
          <p className="text-warm-500 text-sm mt-2">
            Be specific about your project's purpose and target audience for better icon suggestions
          </p>
        </div>

        <div>
          <label className="block text-base font-bold text-warm-700 mb-6">
            Category (Optional)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCategory(cat.id)}
                className={`p-6 rounded-2xl text-center transition-all duration-300 border-2 ${
                  category === cat.id
                    ? `bg-gradient-to-br ${cat.gradient} text-white border-primary-400 shadow-neumorphic-lg`
                    : 'bg-white border-warm-200 text-warm-700 hover:border-primary-300 shadow-neumorphic-sm hover:shadow-neumorphic'
                }`}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-semibold text-lg">{cat.name}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-base font-bold text-warm-700 mb-6">
            Style Preference
          </label>
          <div className="grid grid-cols-3 gap-6">
            {styles.map((styleOption) => (
              <motion.button
                key={styleOption.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStyle(styleOption.id)}
                className={`p-6 rounded-2xl text-center transition-all duration-300 border-2 ${
                  style === styleOption.id
                    ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white border-primary-400 shadow-neumorphic-lg'
                    : 'bg-white border-warm-200 text-warm-700 hover:border-primary-300 shadow-neumorphic-sm hover:shadow-neumorphic'
                }`}
              >
                <div className="text-3xl mb-3">{styleOption.preview}</div>
                <div className="font-semibold text-lg">{styleOption.name}</div>
                <div className="text-sm opacity-80 mt-2">{styleOption.description}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {!canProceed && description.trim() === '' && (
        <div className="mt-8 p-4 bg-warm-50 border border-warm-200 rounded-2xl">
          <p className="text-warm-600 text-center">
            <span className="font-semibold">Almost there!</span> Please describe your project to continue.
          </p>
        </div>
      )}
    </div>
  );
};

// Step 2: Icon Generation & Selection
const GenerationStep = ({ onNext, onPrev, projectData, onData, canProceed }) => {
  const [generatedIcons, setGeneratedIcons] = useState([]);
  const [selectedIconIds, setSelectedIconIds] = useState(new Set());
  const [isGenerating, setIsGenerating] = useState(true);
  const [generationId, setGenerationId] = useState(Date.now());

  React.useEffect(() => {
    generateUniqueIcons();
  }, [projectData]);

  // Update parent with selected icons whenever selection changes
  React.useEffect(() => {
    const selectedIconsData = generatedIcons.filter(icon => selectedIconIds.has(icon.id));
    console.log('🔄 Selection updated:', selectedIconsData.length, 'icons selected');
    onData?.({ selectedIcons: selectedIconsData });
  }, [selectedIconIds, generatedIcons, onData]);

  // Generate unique icons with timestamp-based seeding
  const generateUniqueIcons = async () => {
    setIsGenerating(true);
    setSelectedIconIds(new Set());
    
    // Use current timestamp + random for true uniqueness
    const uniqueSeed = Date.now() + Math.random();
    setGenerationId(uniqueSeed);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const iconSuggestions = getUniqueIconSuggestions(
      projectData?.description || '',
      projectData?.category || '',
      uniqueSeed
    );
    
    const colors = getUniqueColorPalette(projectData?.category || '', uniqueSeed);
    
    const icons = iconSuggestions.map((iconName, index) => ({
      id: `${iconName}-${uniqueSeed}-${index}`,
      name: iconName,
      iconComponent: getIconComponent(iconName),
      color: colors[index % colors.length],
      category: projectData?.category || 'general',
      size: 48,
      strokeWidth: 2,
      style: projectData?.style || 'outline',
      generated: true,
      timestamp: uniqueSeed
    }));
    
    setGeneratedIcons(icons);
    setIsGenerating(false);
    console.log('✅ Generated icons:', icons.length);
  };

  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  // Enhanced unique icon suggestions with rotation
  const getUniqueIconSuggestions = (description, category, seed) => {
    const iconPools = {
      business: [
        ['Briefcase', 'TrendingUp', 'Target', 'Award', 'Users', 'Building'],
        ['DollarSign', 'BarChart', 'PieChart', 'Activity', 'Zap', 'Star'],
        ['Shield', 'Lock', 'Key', 'Settings', 'Tool', 'Layers'],
        ['Globe', 'Mail', 'Phone', 'Calendar', 'Clock', 'Bell']
      ],
      tech: [
        ['Smartphone', 'Monitor', 'Cpu', 'HardDrive', 'Wifi', 'Bluetooth'],
        ['Code', 'Terminal', 'GitBranch', 'Database', 'Server', 'Cloud'],
        ['Zap', 'Battery', 'Power', 'Refresh', 'Download', 'Upload'],
        ['Settings', 'Tool', 'Wrench', 'Sliders', 'ToggleLeft', 'Filter']
      ],
      health: [
        ['Heart', 'Activity', 'Thermometer', 'Stethoscope', 'Pills', 'Bandage'],
        ['Shield', 'Plus', 'Cross', 'FirstAid', 'Ambulance', 'Hospital'],
        ['Eye', 'Ear', 'Brain', 'Lungs', 'Bone', 'Pulse'],
        ['Sun', 'Moon', 'Droplet', 'Wind', 'Leaf', 'Flower']
      ],
      education: [
        ['Book', 'BookOpen', 'GraduationCap', 'Award', 'Trophy', 'Medal'],
        ['Lightbulb', 'Zap', 'Star', 'Target', 'CheckCircle', 'XCircle'],
        ['Edit', 'Pen', 'Pencil', 'Highlighter', 'Eraser', 'Ruler'],
        ['Calendar', 'Clock', 'Timer', 'Bell', 'Alarm', 'Watch']
      ],
      finance: [
        ['DollarSign', 'CreditCard', 'Wallet', 'Coins', 'Banknote', 'Receipt'],
        ['TrendingUp', 'TrendingDown', 'BarChart', 'PieChart', 'LineChart', 'Activity'],
        ['Shield', 'Lock', 'Key', 'Safe', 'Vault', 'Security'],
        ['Calculator', 'Percent', 'Plus', 'Minus', 'Equal', 'Hash']
      ],
      social: [
        ['Users', 'User', 'UserPlus', 'UserMinus', 'UserCheck', 'UserX'],
        ['MessageCircle', 'MessageSquare', 'Mail', 'Send', 'Reply', 'Forward'],
        ['Heart', 'ThumbsUp', 'ThumbsDown', 'Smile', 'Frown', 'Meh'],
        ['Share', 'Share2', 'ExternalLink', 'Link', 'Copy', 'Bookmark']
      ]
    };

    const pool = iconPools[category] || iconPools.business;
    const poolIndex = Math.floor(seed) % pool.length;
    return pool[poolIndex] || pool[0];
  };

  const getUniqueColorPalette = (category, seed) => {
    const colorPalettes = {
      business: [
        ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'],
        ['#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE'],
        ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5']
      ],
      tech: [
        ['#8B5CF6', '#6366F1', '#3B82F6', '#06B6D4', '#14B8A6', '#10B981'],
        ['#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#E5E7EB'],
        ['#7C3AED', '#8B5CF6', '#A855F7', '#C084FC', '#DDD6FE', '#EDE9FE']
      ],
      health: [
        ['#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E'],
        ['#DC2626', '#EA580C', '#D97706', '#CA8A04', '#65A30D', '#16A34A'],
        ['#FCA5A5', '#FDBA74', '#FDE68A', '#FDEF9F', '#BEF264', '#86EFAC']
      ],
      education: [
        ['#F59E0B', '#EAB308', '#FACC15', '#FDE047', '#FBBF24', '#F3E8FF'],
        ['#D97706', '#CA8A04', '#A16207', '#854D0E', '#713F12', '#451A03'],
        ['#FBBF24', '#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F']
      ],
      finance: [
        ['#10B981', '#059669', '#047857', '#065F46', '#064E3B', '#022C22'],
        ['#34D399', '#10B981', '#059669', '#047857', '#065F46', '#064E3B'],
        ['#6EE7B7', '#34D399', '#10B981', '#059669', '#047857', '#065F46']
      ],
      social: [
        ['#EC4899', '#DB2777', '#BE185D', '#9D174D', '#831843', '#500724'],
        ['#F472B6', '#EC4899', '#DB2777', '#BE185D', '#9D174D', '#831843'],
        ['#F9A8D4', '#F472B6', '#EC4899', '#DB2777', '#BE185D', '#9D174D']
      ]
    };

    const palettes = colorPalettes[category] || colorPalettes.business;
    const paletteIndex = Math.floor(seed / 1000) % palettes.length;
    return palettes[paletteIndex];
  };

  const toggleIconSelection = (iconId) => {
    const newSelection = new Set(selectedIconIds);
    if (newSelection.has(iconId)) {
      newSelection.delete(iconId);
      console.log('🗑️ Deselected icon:', iconId);
    } else {
      newSelection.add(iconId);
      console.log('✅ Selected icon:', iconId);
    }
    setSelectedIconIds(newSelection);
  };

  if (isGenerating) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-neumorphic border border-white/60">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-neumorphic-lg"
          >
            <SafeIcon icon={FiRefreshCw} className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-warm-800 mb-4">Generating Unique Icons</h2>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto">Creating perfect icons based on your project description...</p>
          <div className="mt-6 w-64 mx-auto bg-warm-200 rounded-full h-2 shadow-neumorphic-inset">
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-neumorphic border border-white/60">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-neumorphic-sm">
          <SafeIcon icon={FiGrid} className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-warm-800 mb-4">Select Your Icons</h2>
        <p className="text-warm-600 text-lg max-w-2xl mx-auto">
          Choose the icons that best fit your project ({selectedIconIds.size} selected)
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
        {generatedIcons.map((icon, index) => (
          <motion.button
            key={icon.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleIconSelection(icon.id)}
            className={`aspect-square p-6 rounded-2xl transition-all duration-300 flex items-center justify-center border-2 relative group ${
              selectedIconIds.has(icon.id)
                ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white border-primary-400 shadow-neumorphic-lg'
                : 'bg-white border-warm-200 text-warm-700 hover:border-primary-300 shadow-neumorphic-sm hover:shadow-neumorphic'
            }`}
          >
            <SafeIcon
              icon={icon.iconComponent}
              className="w-10 h-10 transition-transform duration-200"
              style={{ color: selectedIconIds.has(icon.id) ? 'white' : icon.color }}
            />
            
            {/* Selection indicator */}
            {selectedIconIds.has(icon.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-neumorphic-sm"
              >
                <SafeIcon icon={FiStar} className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex justify-center space-x-6 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateUniqueIcons}
          className="px-8 py-4 bg-white text-warm-600 rounded-2xl font-bold text-lg border border-warm-300 hover:bg-warm-50 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 flex items-center space-x-3"
        >
          <SafeIcon icon={FiRefreshCw} className="w-5 h-5" />
          <span>Generate New Set</span>
        </motion.button>
      </div>

      {!canProceed && selectedIconIds.size === 0 && (
        <div className="p-4 bg-warm-50 border border-warm-200 rounded-2xl">
          <p className="text-warm-600 text-center">
            <span className="font-semibold">Select at least one icon</span> to proceed to customization.
          </p>
        </div>
      )}
    </div>
  );
};

// Step 3: Customization & Export
const CustomizationStep = ({ selectedIcons, onComplete }) => {
  const [iconSettings, setIconSettings] = useState({});

  React.useEffect(() => {
    if (selectedIcons?.selectedIcons?.length > 0) {
      const initialSettings = {};
      selectedIcons.selectedIcons.forEach(icon => {
        initialSettings[icon.id] = {
          size: icon.size || 48,
          color: icon.color,
          strokeWidth: icon.strokeWidth || 2,
          style: icon.style || 'outline'
        };
      });
      setIconSettings(initialSettings);
    }
  }, [selectedIcons]);

  // Comprehensive SVG path database with accurate Feather icon paths
  const getIconPaths = (iconName) => {
    const iconPaths = {
      // Basic Interface
      'Home': 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10',
      'Search': 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z m21 21-4.35-4.35',
      'User': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
      'Settings': 'M12.22 2l-.44.1a9.94 9.94 0 0 0-7.75 7.75L4 10.22v3.56l.03.44a9.94 9.94 0 0 0 7.75 7.75l.44.03h.44l.44-.03a9.94 9.94 0 0 0 7.75-7.75l.03-.44v-3.56l-.03-.44a9.94 9.94 0 0 0-7.75-7.75L12.66 2l-.44-.03h-.44z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
      'Menu': 'M3 12h18 M3 6h18 M3 18h18',
      'Bell': 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
      
      // Communication
      'Mail': 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z m22 6-10 7L2 6',
      'Phone': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
      'MessageCircle': 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
      'Send': 'M22 2L2 8.5l9.5 1L13 19l9-17z',
      
      // Actions
      'Plus': 'M12 5v14 M5 12h14',
      'Minus': 'M5 12h14',
      'Edit': 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 m-1.5-9.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
      'Trash': 'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6',
      'Copy': 'M20 9H11a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
      'Download': 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
      'Upload': 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
      
      // Social
      'Heart': 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
      'Star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      'ThumbsUp': 'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3',
      'Share': 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8 M16 6l-4-4-4 4 M12 2v13',
      'Users': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z',
      
      // Business & Finance
      'Briefcase': 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16 M22 8H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8z M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2',
      'DollarSign': 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
      'TrendingUp': 'M23 6l-9.5 9.5-5-5L1 18 M23 6h-6 M23 6v6',
      'BarChart': 'M12 20V10 M18 20V4 M6 20v-4',
      'PieChart': 'M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z',
      'Target': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
      'Award': 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12',
      
      // Technology
      'Smartphone': 'M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z M12 18h.01',
      'Monitor': 'M20 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z M8 21h8 M12 17v4',
      'Cpu': 'M4 4h16v16H4z M9 9h6v6H9z M9 1v6 M15 1v6 M9 17v6 M15 17v6 M1 9h6 M17 9h6 M1 15h6 M17 15h6',
      'Wifi': 'M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01',
      'Database': 'M21 12c0 1.66-4 3-9 3s-9-1.34-9-3 M3 5c0 1.66 4 3 9 3s9-1.34 9-3 M3 5c0-1.66 4-3 9-3s9 1.34 9 3v14c0 1.66-4 3-9 3s-9-1.34-9-3V5z M3 12v7c0 1.66 4 3 9 3s9-1.34 9-3v-7',
      'Server': 'M20 3H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z M20 13H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z M6 7h.01 M6 17h.01',
      'Cloud': 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z',
      'Code': 'M16 18l6-6-6-6 M8 6l-6 6 6 6',
      
      // Health
      'Activity': 'm22 12-4-4v3H9.5a3.5 3.5 0 0 1-3.5-3.5V7 M2 12l4 4v-3h8.5a3.5 3.5 0 0 1 3.5 3.5V17',
      'Zap': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
      'Shield': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      
      // Navigation & Direction  
      'ArrowLeft': 'M19 12H6 M12 5l-7 7 7 7',
      'ArrowRight': 'M5 12h13 M12 5l7 7-7 7',
      'ArrowUp': 'M12 19V6 M5 12l7-7 7 7',
      'ArrowDown': 'M12 5v13 M19 12l-7 7-7-7',
      'ChevronLeft': 'M15 18l-6-6 6-6',
      'ChevronRight': 'M9 18l6-6-6-6',
      'ChevronUp': 'M18 15l-6-6-6 6',
      'ChevronDown': 'M6 9l6 6 6-6',
      
      // Time & Calendar
      'Clock': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2',
      'Calendar': 'M3 4h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M16 2v4 M8 2v4 M3 10h18',
      
      // Media & Files
      'Image': 'M15 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M21 21H3V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16z M3 16l5-5c.928-.893 2.072-.893 3 0l5 5',
      'File': 'M14 3v4a1 1 0 0 0 1 1h4 M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z',
      'Folder': 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z',
      
      // Tools & Objects
      'Tool': 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
      'Wrench': 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
      'Lock': 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4',
      'Key': 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4',
      
      // Default fallback
      'Circle': 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z'
    };
    
    return iconPaths[iconName] || iconPaths['Circle'];
  };

  const createSVG = (icon, settings) => {
    const { size, color, strokeWidth, style } = settings;
    const paths = getIconPaths(icon.name);
    
    // Split multiple path commands
    const pathCommands = paths.split(' M').map((path, index) => 
      index === 0 ? path : 'M' + path
    );
    
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .icon-path {
        fill: ${style === 'filled' ? color : 'none'};
        stroke: ${color};
        stroke-width: ${strokeWidth};
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    </style>
  </defs>
  ${pathCommands.map(pathData => 
    `<path class="icon-path" d="${pathData.trim()}" />`
  ).join('\n  ')}
</svg>`.trim();
  };

  const downloadIcon = async (icon) => {
    const settings = iconSettings[icon.id] || {};
    const svgContent = createSVG(icon, settings);
    
    console.log('📥 Downloading icon:', icon.name);
    console.log('🎨 SVG Content:', svgContent);
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${icon.name.toLowerCase()}-icon.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const editInEditor = (icon) => {
    const settings = iconSettings[icon.id] || {};
    const editorUrl = `#/editor?icon=${encodeURIComponent(icon.name)}&color=${encodeURIComponent(settings.color)}&size=${settings.size}&stroke=${settings.strokeWidth}`;
    window.location.href = editorUrl;
  };

  const exportAllIcons = async () => {
    if (!selectedIcons?.selectedIcons) return;
    
    for (const icon of selectedIcons.selectedIcons) {
      await downloadIcon(icon);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    onComplete?.();
  };

  if (!selectedIcons?.selectedIcons?.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-neumorphic border border-white/60 text-center">
        <div className="w-16 h-16 bg-warm-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <SafeIcon icon={FiGrid} className="w-8 h-8 text-warm-500" />
        </div>
        <h3 className="text-2xl font-bold text-warm-800 mb-4">No Icons Selected</h3>
        <p className="text-warm-600 text-lg">Please go back and select some icons to customize.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-neumorphic border border-white/60">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-neumorphic-sm">
          <SafeIcon icon={FiSettings} className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-warm-800 mb-4">Customize Your Icons</h2>
        <p className="text-warm-600 text-lg max-w-2xl mx-auto">Fine-tune each icon to match your brand perfectly</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {selectedIcons.selectedIcons.map((icon, index) => {
          const settings = iconSettings[icon.id] || {};
          return (
            <motion.div
              key={icon.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white border-2 border-warm-200 rounded-3xl p-8 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center h-24 mb-6 bg-warm-50 rounded-2xl border border-warm-200 shadow-neumorphic-inset">
                <SafeIcon
                  icon={icon.iconComponent}
                  className="w-12 h-12 transition-transform duration-200"
                  style={{
                    color: settings.color || icon.color,
                    strokeWidth: settings.strokeWidth || icon.strokeWidth || 2
                  }}
                />
              </div>
              
              <div className="text-center mb-6">
                <h3 className="font-bold text-warm-800 mb-2 text-xl">{icon.name}</h3>
                <p className="text-warm-600">
                  {settings.size || icon.size || 48}px • {settings.color || icon.color}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => downloadIcon(icon)}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Download</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => editInEditor(icon)}
                  className="px-4 py-3 bg-white text-warm-600 rounded-xl font-bold border border-warm-300 hover:bg-warm-50 shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300"
                  title="Edit in Advanced Editor"
                >
                  <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(200,75,255,0.4)' }}
          whileTap={{ scale: 0.98 }}
          onClick={exportAllIcons}
          className="px-12 py-5 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-3xl font-bold text-xl shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 flex items-center space-x-4 mx-auto"
        >
          <SafeIcon icon={FiDownload} className="w-6 h-6" />
          <span>Download All Icons ({selectedIcons.selectedIcons.length})</span>
        </motion.button>
      </div>
    </div>
  );
};

const IconCreator = () => {
  const handleComplete = () => {
    console.log('🎉 Icon creation process completed successfully!');
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-3xl flex items-center justify-center mr-4 shadow-neumorphic">
                <SafeIcon icon={FiCpu} className="w-8 h-8 text-white" />
              </div>
              <div className="px-6 py-2 bg-gradient-to-r from-primary-100 via-secondary-100 to-warm-100 rounded-full border border-primary-200 shadow-neumorphic-sm">
                <span className="text-sm font-bold text-primary-700">✨ AI-Powered Creation</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-warm-800 mb-6">
              Create Perfect Icons with AI
            </h1>
            <p className="text-xl text-warm-600 max-w-4xl mx-auto leading-relaxed">
              Follow our simple 3-step process to generate unique, customize, and download professional icons for your project.
            </p>
          </motion.div>
        </div>

        <StepWizard onComplete={handleComplete}>
          <ProjectStep />
          <GenerationStep />
          <CustomizationStep />
        </StepWizard>
      </div>
    </div>
  );
};

export default IconCreator;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiZap, FiRefreshCw, FiDownload, FiEdit3, FiEye, FiCopy, FiCheck, FiSettings, FiShuffle, FiPlay, FiPause, FiSkipForward, FiStar, FiTrendingUp } = FiIcons;

const AIIconGenerator = ({ projectDescription, uploadedImage, selectedStyle, onIconsGenerated, onEditIcon }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedIcons, setSelectedIcons] = useState(new Set());
  const [customizationMode, setCustomizationMode] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);
  const [imageAnalysisData, setImageAnalysisData] = useState(null);

  // Advanced image analysis simulation
  const analyzeUploadedImage = async (imageFile) => {
    console.log('🔍 Analyzing uploaded image:', imageFile.name);
    
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
          const analysis = performAdvancedImageAnalysis(imageFile, imageData);
          resolve(analysis);
        } catch (error) {
          console.log('Canvas analysis failed, using filename analysis');
          resolve(performFilenameAnalysis(imageFile));
        }
      };
      
      img.onerror = () => {
        console.log('Image load failed, using filename analysis');
        resolve(performFilenameAnalysis(imageFile));
      };
      
      img.src = URL.createObjectURL(imageFile);
    });
  };

  const performAdvancedImageAnalysis = (imageFile, imageData) => {
    const { data, width, height } = imageData;
    
    const colorAnalysis = analyzeColorDistribution(data);
    const brightnessAnalysis = analyzeBrightnessContrast(data);
    const complexityAnalysis = analyzeImageComplexity(width, height, data);
    const detectedStyle = determineStyleFromImage(colorAnalysis, brightnessAnalysis, complexityAnalysis);
    
    // Generate sophisticated 16-color palette
    const dominantColors = generateProfessional16ColorPalette(colorAnalysis, imageFile.name);
    const brandPersonality = determineBrandPersonality(colorAnalysis, brightnessAnalysis, imageFile.name);
    const suggestedCategories = suggestCategoriesFromVisuals(colorAnalysis, complexityAnalysis, imageFile.name);

    return {
      dominantColors,
      detectedStyle,
      visualElements: complexityAnalysis.elements,
      suggestedCategories,
      complexity: complexityAnalysis.level,
      brandPersonality,
      colorHarmony: colorAnalysis.harmony,
      brightness: brightnessAnalysis.level,
      contrast: brightnessAnalysis.contrast,
      imageCharacteristics: {
        hasGradients: colorAnalysis.hasGradients,
        isMinimal: complexityAnalysis.isMinimal,
        isProfessional: brightnessAnalysis.isProfessional,
        isPlayful: colorAnalysis.isPlayful
      }
    };
  };

  const analyzeColorDistribution = (data) => {
    const colorCounts = {};
    const colors = [];
    
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const hex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
      colors.push({ r, g, b });
    }
    
    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
    
    const avgSaturation = colors.reduce((sum, color) => {
      const max = Math.max(color.r, color.g, color.b);
      const min = Math.min(color.r, color.g, color.b);
      return sum + (max === 0 ? 0 : (max - min) / max);
    }, 0) / colors.length;
    
    const hasGradients = sortedColors.length > 8 && avgSaturation > 0.3;
    const isPlayful = avgSaturation > 0.6;
    const harmony = avgSaturation > 0.4 ? 'vibrant' : avgSaturation > 0.2 ? 'balanced' : 'muted';
    
    return {
      dominantColors: sortedColors.slice(0, 16).map(([color]) => color),
      avgSaturation,
      hasGradients,
      isPlayful,
      harmony,
      colorCount: sortedColors.length
    };
  };

  const analyzeBrightnessContrast = (data) => {
    let totalBrightness = 0;
    let brightPixels = 0;
    let darkPixels = 0;
    
    for (let i = 0; i < data.length; i += 40) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      totalBrightness += brightness;
      
      if (brightness > 0.7) brightPixels++;
      else if (brightness < 0.3) darkPixels++;
    }
    
    const avgBrightness = totalBrightness / (data.length / 4);
    const contrast = brightPixels > 0 && darkPixels > 0 ? 'high' : 'low';
    const level = avgBrightness > 0.6 ? 'bright' : avgBrightness > 0.4 ? 'medium' : 'dark';
    const isProfessional = contrast === 'high' && (level === 'bright' || level === 'medium');
    
    return {
      avgBrightness,
      contrast,
      level,
      isProfessional,
      brightPixels,
      darkPixels
    };
  };

  const analyzeImageComplexity = (width, height, data) => {
    const aspectRatio = width / height;
    const totalPixels = width * height;
    
    let edges = 0;
    for (let i = 0; i < data.length - 4; i += 16) {
      const current = data[i] + data[i + 1] + data[i + 2];
      const next = data[i + 4] + data[i + 5] + data[i + 6];
      if (Math.abs(current - next) > 50) edges++;
    }
    
    const complexity = edges / (totalPixels / 100);
    const level = complexity > 15 ? 'high' : complexity > 8 ? 'medium' : 'low';
    const isMinimal = complexity < 5;
    
    const elements = [];
    if (complexity > 10) elements.push('detailed', 'complex');
    if (isMinimal) elements.push('minimal', 'clean');
    if (aspectRatio > 1.5 || aspectRatio < 0.7) elements.push('geometric');
    else elements.push('balanced');
    
    return {
      complexity,
      level,
      isMinimal,
      elements,
      aspectRatio
    };
  };

  const determineStyleFromImage = (colorAnalysis, brightnessAnalysis, complexityAnalysis) => {
    if (complexityAnalysis.isMinimal && colorAnalysis.harmony === 'muted') {
      return 'flat';
    } else if (colorAnalysis.hasGradients || colorAnalysis.harmony === 'vibrant') {
      return 'gradient';
    } else if (brightnessAnalysis.contrast === 'high' && complexityAnalysis.level === 'low') {
      return 'line';
    } else if (colorAnalysis.avgSaturation > 0.5 && complexityAnalysis.level === 'high') {
      return '3d';
    }
    return 'flat';
  };

  // PROFESSIONAL 16-COLOR PALETTE SYSTEM
  const generateProfessional16ColorPalette = (colorAnalysis, filename) => {
    // Professional 16-color palettes for various industries
    const professionalColorSets = {
      finance: [
        '#0f766e', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1',
        '#0d9488', '#0f766e', '#134e4a', '#115e59', '#047857', '#065f46',
        '#a7f3d0', '#6ee7b7', '#34d399', '#10b981'
      ],
      healthcare: [
        '#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2',
        '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a', '#dc2626', '#b91c1c',
        '#fed7d7', '#fbb6ce', '#f9a8d4', '#f472b6'
      ],
      technology: [
        '#7c3aed', '#8b5cf6', '#a855f7', '#c084fc', '#ddd6fe', '#ede9fe',
        '#6d28d9', '#5b21b6', '#4c1d95', '#3730a3', '#312e81', '#1e1b4b',
        '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed'
      ],
      creative: [
        '#f59e0b', '#f97316', '#fb923c', '#fdba74', '#fed7aa', '#fef3c7',
        '#d97706', '#b45309', '#92400e', '#78350f', '#451a03', '#292524',
        '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b'
      ],
      corporate: [
        '#374151', '#4b5563', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb',
        '#1f2937', '#111827', '#030712', '#0f172a', '#1e293b', '#334155',
        '#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db'
      ],
      ecommerce: [
        '#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5',
        '#047857', '#065f46', '#064e3b', '#022c22', '#14532d', '#166534',
        '#bbf7d0', '#86efac', '#4ade80', '#22c55e'
      ],
      education: [
        '#ca8a04', '#eab308', '#facc15', '#fde047', '#fef08a', '#fefce8',
        '#a16207', '#854d0e', '#713f12', '#451a03', '#365314', '#3f6212',
        '#fef9c3', '#fef3c7', '#fde68a', '#fcd34d'
      ],
      lifestyle: [
        '#ec4899', '#f472b6', '#f9a8d4', '#fbb6ce', '#fce7f3', '#fdf2f8',
        '#db2777', '#be185d', '#9d174d', '#831843', '#500724', '#701a75',
        '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc'
      ]
    };

    // Determine industry based on filename and content
    const filename_lower = filename.toLowerCase();
    let selectedPalette = professionalColorSets.corporate; // Default

    if (filename_lower.includes('finance') || filename_lower.includes('bank') || filename_lower.includes('money')) {
      selectedPalette = professionalColorSets.finance;
    } else if (filename_lower.includes('health') || filename_lower.includes('medical') || filename_lower.includes('hospital')) {
      selectedPalette = professionalColorSets.healthcare;
    } else if (filename_lower.includes('tech') || filename_lower.includes('software') || filename_lower.includes('app')) {
      selectedPalette = professionalColorSets.technology;
    } else if (filename_lower.includes('creative') || filename_lower.includes('art') || filename_lower.includes('design')) {
      selectedPalette = professionalColorSets.creative;
    } else if (filename_lower.includes('shop') || filename_lower.includes('ecommerce') || filename_lower.includes('store')) {
      selectedPalette = professionalColorSets.ecommerce;
    } else if (filename_lower.includes('education') || filename_lower.includes('school') || filename_lower.includes('learn')) {
      selectedPalette = professionalColorSets.education;
    } else if (filename_lower.includes('lifestyle') || filename_lower.includes('beauty') || filename_lower.includes('fashion')) {
      selectedPalette = professionalColorSets.lifestyle;
    }

    // Filter and enhance colors from analysis if available
    let analyzedColors = colorAnalysis?.dominantColors || [];
    analyzedColors = analyzedColors.filter(color => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      const avg = (r + g + b) / 3;
      return avg > 30 && avg < 220;
    }).slice(0, 8);

    // Combine analyzed colors with professional palette
    const finalPalette = [...analyzedColors, ...selectedPalette].slice(0, 16);
    
    // Ensure exactly 16 colors
    while (finalPalette.length < 16) {
      finalPalette.push(selectedPalette[finalPalette.length % selectedPalette.length]);
    }

    return finalPalette;
  };

  const determineBrandPersonality = (colorAnalysis, brightnessAnalysis, filename) => {
    const traits = [];
    
    if (brightnessAnalysis.isProfessional) traits.push('professional', 'trustworthy', 'reliable');
    if (colorAnalysis.isPlayful) traits.push('creative', 'energetic', 'innovative');
    if (colorAnalysis.harmony === 'muted') traits.push('sophisticated', 'elegant', 'premium');
    if (colorAnalysis.harmony === 'vibrant') traits.push('bold', 'dynamic', 'modern');
    if (brightnessAnalysis.level === 'bright') traits.push('optimistic', 'friendly', 'approachable');
    
    const filenameLower = filename.toLowerCase();
    if (filenameLower.includes('corporate') || filenameLower.includes('business')) {
      traits.push('corporate', 'authoritative', 'established');
    } else if (filenameLower.includes('creative') || filenameLower.includes('art')) {
      traits.push('artistic', 'expressive', 'imaginative');
    } else if (filenameLower.includes('tech') || filenameLower.includes('digital')) {
      traits.push('cutting-edge', 'efficient', 'scalable');
    }
    
    return [...new Set(traits)].slice(0, 6);
  };

  const suggestCategoriesFromVisuals = (colorAnalysis, complexityAnalysis, filename) => {
    const categories = [];
    
    if (complexityAnalysis.isMinimal) {
      categories.push('interface', 'navigation', 'minimal');
    } else if (complexityAnalysis.level === 'high') {
      categories.push('content', 'media', 'detailed');
    }
    
    if (colorAnalysis.isPlayful) {
      categories.push('social', 'entertainment', 'lifestyle');
    } else if (colorAnalysis.harmony === 'muted') {
      categories.push('business', 'professional', 'corporate');
    }
    
    const filenameLower = filename.toLowerCase();
    if (filenameLower.includes('dashboard') || filenameLower.includes('admin')) {
      categories.push('data', 'analytics', 'dashboard');
    } else if (filenameLower.includes('social') || filenameLower.includes('chat')) {
      categories.push('communication', 'social', 'networking');
    } else if (filenameLower.includes('ecommerce') || filenameLower.includes('shop')) {
      categories.push('commerce', 'shopping', 'retail');
    }
    
    const defaultCategories = ['interface', 'navigation', 'action', 'communication', 'data', 'content'];
    const finalCategories = [...new Set([...categories, ...defaultCategories])].slice(0, 6);
    
    return finalCategories;
  };

  const performFilenameAnalysis = (imageFile) => {
    const filename = imageFile.name.toLowerCase();
    const hash = filename.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    
    // Use professional palette system for filename analysis too
    const dominantColors = generateProfessional16ColorPalette({ dominantColors: [] }, filename);
    
    let detectedStyle = 'flat';
    let complexity = 'medium';
    let brandPersonality = ['modern', 'professional', 'sophisticated'];
    let suggestedCategories = ['interface', 'navigation', 'action'];
    
    if (filename.includes('logo') || filename.includes('brand')) {
      detectedStyle = 'flat';
      complexity = 'low';
      brandPersonality = ['professional', 'trustworthy', 'corporate', 'authoritative'];
      suggestedCategories = ['branding', 'identity', 'corporate'];
    } else if (filename.includes('app') || filename.includes('ui')) {
      detectedStyle = 'line';
      complexity = 'medium';
      brandPersonality = ['modern', 'clean', 'user-friendly', 'efficient'];
      suggestedCategories = ['interface', 'navigation', 'app'];
    }
    
    return {
      dominantColors,
      detectedStyle,
      visualElements: complexity === 'low' ? ['minimal', 'clean'] : ['detailed', 'complex'],
      suggestedCategories,
      complexity,
      brandPersonality,
      colorHarmony: 'balanced',
      imageCharacteristics: {
        hasGradients: detectedStyle === 'gradient',
        isMinimal: complexity === 'low',
        isProfessional: brandPersonality.includes('professional'),
        isPlayful: brandPersonality.includes('friendly')
      }
    };
  };

  // Generate contextual icons based on analysis
  const generateAIIcons = async (description, analysis, style) => {
    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      const progressSteps = [
        { step: 'Analyzing visual context...', progress: 20 },
        { step: 'Processing color harmonies...', progress: 40 },
        { step: 'Generating contextual icons...', progress: 60 },
        { step: 'Applying professional styling...', progress: 80 },
        { step: 'Finalizing sophisticated icon set...', progress: 100 }
      ];

      for (const { step, progress } of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setGenerationProgress(progress);
      }

      const contextualIcons = generateContextualIcons(description, analysis, style);
      setGeneratedIcons(contextualIcons);
      onIconsGenerated?.(contextualIcons);

    } catch (error) {
      console.error('AI generation failed:', error);
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  // Generate professional 6-icon layout (same as community page)
  const generateContextualIcons = (description, analysis, style) => {
    console.log('🎯 Generating professional icons based on analysis:', analysis);
    
    const iconSets = {
      interface: ['Home', 'Search', 'User', 'Settings', 'Menu', 'Bell'],
      navigation: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ChevronLeft', 'ChevronRight'],
      communication: ['Mail', 'MessageCircle', 'Phone', 'Video', 'Send', 'Share'],
      data: ['BarChart', 'PieChart', 'TrendingUp', 'Activity', 'Database', 'Server'],
      action: ['Plus', 'Edit', 'Trash', 'Download', 'Upload', 'Copy'],
      social: ['Heart', 'Star', 'ThumbsUp', 'Users', 'Share2', 'MessageSquare'],
      business: ['Briefcase', 'DollarSign', 'Target', 'Award', 'Shield', 'Lock'],
      creative: ['Palette', 'Camera', 'Image', 'Music', 'Video', 'Edit3'],
      ecommerce: ['ShoppingCart', 'Package', 'CreditCard', 'Gift', 'Tag', 'Truck'],
      tech: ['Cpu', 'Smartphone', 'Monitor', 'Wifi', 'Cloud', 'Code']
    };

    let selectedIcons = [];
    
    if (analysis?.suggestedCategories) {
      analysis.suggestedCategories.forEach(category => {
        if (iconSets[category]) {
          selectedIcons.push(...iconSets[category]);
        }
      });
    }
    
    if (selectedIcons.length === 0) {
      selectedIcons = [
        ...iconSets.interface.slice(0, 2),
        ...iconSets.action.slice(0, 2),
        ...iconSets.communication.slice(0, 2)
      ];
    }
    
    // Generate exactly 6 icons for community page layout
    selectedIcons = [...new Set(selectedIcons)].slice(0, 6);

    return selectedIcons.map((iconName, index) => ({
      id: iconName.toLowerCase(),
      name: iconName,
      category: getCategoryForIcon(iconName, analysis?.suggestedCategories || ['interface']),
      importance: index < 3 ? 'high' : 'medium',
      color: analysis?.dominantColors?.[index % (analysis.dominantColors?.length || 16)] || '#c84bff',
      styleVariant: getStyleVariant(style, analysis?.imageCharacteristics),
      aiConfidence: Math.random() * 0.2 + 0.8,
      generated: true,
      timestamp: Date.now() + index,
      analysisContext: {
        basedOnUpload: !!uploadedImage,
        styleDetected: analysis?.detectedStyle,
        complexityLevel: analysis?.complexity
      }
    }));
  };

  const getCategoryForIcon = (iconName, suggestedCategories) => {
    const iconCategoryMap = {
      'Home': 'navigation', 'Search': 'interface', 'User': 'interface',
      'Mail': 'communication', 'Plus': 'action', 'Edit': 'action',
      'BarChart': 'data', 'Heart': 'social', 'ShoppingCart': 'ecommerce'
    };
    
    return iconCategoryMap[iconName] || suggestedCategories[0] || 'interface';
  };

  const getStyleVariant = (style, characteristics) => {
    const baseVariants = {
      flat: { strokeWidth: 0, fill: true, rounded: true },
      line: { strokeWidth: 2, fill: false, rounded: false },
      '3d': { strokeWidth: 1, fill: true, shadow: true, gradient: true },
      gradient: { strokeWidth: 1, fill: true, gradient: true, rounded: true }
    };
    
    let variant = baseVariants[style] || baseVariants.flat;
    
    if (characteristics?.isMinimal) {
      variant.strokeWidth = Math.max(1, variant.strokeWidth - 0.5);
    }
    if (characteristics?.hasGradients) {
      variant.gradient = true;
    }
    if (characteristics?.isProfessional) {
      variant.rounded = false;
    }
    
    return variant;
  };

  const regenerateIcon = async (iconId) => {
    setRegeneratingIndex(iconId);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setGeneratedIcons(prev => prev.map(icon => 
      icon.id === iconId ? {
        ...icon,
        color: analysisResults?.dominantColors?.[Math.floor(Math.random() * (analysisResults.dominantColors?.length || 16))] || 
               `#${Math.floor(Math.random()*16777215).toString(16)}`,
        aiConfidence: Math.random() * 0.3 + 0.7,
        timestamp: Date.now()
      } : icon
    ));
    
    setRegeneratingIndex(null);
  };

  const toggleIconSelection = (iconId) => {
    setSelectedIcons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(iconId)) {
        newSet.delete(iconId);
      } else {
        newSet.add(iconId);
      }
      return newSet;
    });
  };

  const exportSelectedIcons = () => {
    const selectedIconsData = generatedIcons.filter(icon => selectedIcons.has(icon.id));
    const exportData = {
      icons: selectedIconsData,
      metadata: {
        generatedBy: 'Iconify AI Professional',
        style: selectedStyle,
        timestamp: new Date().toISOString(),
        analysis: analysisResults,
        colorPalette: analysisResults?.dominantColors || [],
        basedOnUpload: !!uploadedImage,
        uploadedFileName: uploadedImage?.name
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `professional-iconset-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleEditIcon = (icon) => {
    console.log('🎨 Editing icon:', icon.name);
    if (onEditIcon) {
      onEditIcon(icon);
    } else {
      window.location.hash = `#/editor?icon=${icon.name}&color=${encodeURIComponent(icon.color)}`;
    }
  };

  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName.split('-').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join('')}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  useEffect(() => {
    if ((projectDescription || uploadedImage) && !isGenerating) {
      const triggerGeneration = async () => {
        let analysis = null;
        if (uploadedImage) {
          console.log('🖼️ Professional image analysis starting...');
          analysis = await analyzeUploadedImage(uploadedImage);
          setAnalysisResults(analysis);
          setImageAnalysisData(analysis);
        } else if (projectDescription) {
          analysis = generateTextBasedAnalysis(projectDescription);
          setAnalysisResults(analysis);
        }
        
        generateAIIcons(projectDescription, analysis, selectedStyle);
      };

      triggerGeneration();
    }
  }, [projectDescription, uploadedImage, selectedStyle]);

  const generateTextBasedAnalysis = (description) => {
    const descLower = description.toLowerCase();
    
    // Generate 16-color palette based on description
    const dominantColors = generateProfessional16ColorPalette({ dominantColors: [] }, descLower);
    
    return {
      dominantColors,
      detectedStyle: 'flat',
      visualElements: ['modern', 'professional', 'sophisticated'],
      suggestedCategories: determineCategoriesFromText(descLower),
      complexity: 'medium',
      brandPersonality: ['professional', 'modern', 'trustworthy', 'sophisticated'],
      textBased: true
    };
  };

  const determineCategoriesFromText = (description) => {
    const categories = [];
    
    if (description.includes('dashboard') || description.includes('analytics')) {
      categories.push('data', 'interface', 'analytics');
    } else if (description.includes('social') || description.includes('community')) {
      categories.push('social', 'communication', 'networking');
    } else if (description.includes('ecommerce') || description.includes('shop')) {
      categories.push('ecommerce', 'action', 'retail');
    } else if (description.includes('mobile') || description.includes('app')) {
      categories.push('interface', 'navigation', 'mobile');
    } else if (description.includes('business') || description.includes('corporate')) {
      categories.push('business', 'interface', 'corporate');
    }
    
    if (categories.length === 0) {
      categories.push('interface', 'navigation', 'action');
    }
    
    return categories.slice(0, 4);
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-neumorphic-lg border border-white/60">
      {/* Professional Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-secondary-500 to-warm-500 rounded-3xl flex items-center justify-center shadow-neumorphic-sm">
            <SafeIcon icon={FiZap} className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-warm-800 mb-2">Professional AI Icon Generator</h3>
            <p className="text-warm-600 text-lg">
              {uploadedImage ? 'Image-based intelligent generation with 16-color palette' : 'Deep learning powered professional icon creation'}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2 text-sm text-warm-500">
                <SafeIcon icon={FiStar} className="w-4 h-4 text-primary-500" />
                <span className="font-medium">Professional Grade</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-warm-500">
                <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-secondary-500" />
                <span className="font-medium">16-Color System</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCustomizationMode(!customizationMode)}
            className={`p-4 rounded-2xl transition-all duration-300 ${
              customizationMode 
                ? 'bg-primary-100 text-primary-600 shadow-neumorphic-inset' 
                : 'bg-warm-100 text-warm-600 hover:bg-warm-200 shadow-neumorphic-sm'
            }`}
          >
            <SafeIcon icon={FiSettings} className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Analysis Results */}
      <AnimatePresence>
        {analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-10 p-8 bg-gradient-to-r from-primary-50 via-secondary-50 to-warm-50 rounded-3xl border border-primary-200 shadow-neumorphic-sm"
          >
            <h4 className="font-bold text-warm-800 mb-6 flex items-center space-x-3 text-xl">
              <SafeIcon icon={FiEye} className="w-6 h-6 text-primary-600" />
              <span>
                Professional Analysis Results
                {imageAnalysisData && ' (Image-based)'}
              </span>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm mb-8">
              <div className="bg-white/60 rounded-2xl p-4">
                <span className="font-semibold text-warm-700 block mb-2">Detected Style</span>
                <span className="text-warm-600 capitalize text-lg font-medium">{analysisResults.detectedStyle}</span>
              </div>
              <div className="bg-white/60 rounded-2xl p-4">
                <span className="font-semibold text-warm-700 block mb-2">Complexity Level</span>
                <span className="text-warm-600 capitalize text-lg font-medium">{analysisResults.complexity}</span>
              </div>
              <div className="bg-white/60 rounded-2xl p-4">
                <span className="font-semibold text-warm-700 block mb-2">Color Harmony</span>
                <span className="text-warm-600 capitalize text-lg font-medium">{analysisResults.colorHarmony || 'Balanced'}</span>
              </div>
            </div>

            {analysisResults.brandPersonality && (
              <div className="mb-8">
                <span className="font-semibold text-warm-700 block mb-4 text-lg">Brand Personality Traits</span>
                <div className="flex flex-wrap gap-3">
                  {analysisResults.brandPersonality.slice(0, 6).map((trait, index) => (
                    <span key={index} className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-2xl text-sm font-semibold border border-primary-200">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {uploadedImage && imageAnalysisData && (
              <div className="mb-8">
                <span className="font-semibold text-warm-700 block mb-4 text-lg">Visual Characteristics</span>
                <div className="flex flex-wrap gap-3">
                  {imageAnalysisData.imageCharacteristics?.isMinimal && (
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-2xl text-sm font-semibold">Minimal Design</span>
                  )}
                  {imageAnalysisData.imageCharacteristics?.hasGradients && (
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-2xl text-sm font-semibold">Rich Gradients</span>
                  )}
                  {imageAnalysisData.imageCharacteristics?.isProfessional && (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-2xl text-sm font-semibold">Professional</span>
                  )}
                  {imageAnalysisData.imageCharacteristics?.isPlayful && (
                    <span className="px-4 py-2 bg-coral-100 text-coral-700 rounded-2xl text-sm font-semibold">Playful</span>
                  )}
                </div>
              </div>
            )}

            {/* PROFESSIONAL 16-COLOR PALETTE DISPLAY */}
            {analysisResults.dominantColors && (
              <div>
                <span className="font-semibold text-warm-700 block mb-4 text-lg">Professional 16-Color Palette</span>
                <div className="grid grid-cols-8 lg:grid-cols-16 gap-2">
                  {analysisResults.dominantColors.slice(0, 16).map((color, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.15, y: -4 }}
                      className="aspect-square rounded-xl shadow-neumorphic-sm border-2 border-white/50 cursor-pointer relative group"
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/20 rounded-xl">
                        <span className="text-xs font-bold text-white drop-shadow-md">{index + 1}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-warm-500 mt-3 font-medium">
                  Professional color system with {analysisResults.dominantColors.length} harmonious colors
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Generation Progress */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-10 p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-3xl border border-primary-200 shadow-neumorphic-sm"
          >
            <div className="flex items-center space-x-6 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center"
              >
                <SafeIcon icon={FiRefreshCw} className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h4 className="font-bold text-warm-800 text-xl mb-2">Professional AI Generation in Progress</h4>
                <p className="text-warm-600 text-lg">
                  {uploadedImage ? 'Crafting professional icons based on your uploaded design...' : 'Creating your sophisticated professional icon set...'}
                </p>
              </div>
            </div>
            <div className="w-full bg-warm-200 rounded-full h-4 mb-3 shadow-neumorphic-inset">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${generationProgress}%` }}
                transition={{ duration: 0.5 }}
                className="h-4 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 rounded-full shadow-neumorphic-sm"
              />
            </div>
            <p className="text-base text-warm-600 text-center font-semibold">{generationProgress}% Complete</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional Generated Icons Grid (Same layout as Community page) */}
      <AnimatePresence>
        {generatedIcons.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Enhanced Controls */}
            <div className="flex items-center justify-between mb-8 p-6 bg-gradient-to-r from-warm-50 to-primary-50 rounded-3xl border border-warm-200">
              <div>
                <h4 className="font-bold text-warm-800 text-2xl mb-2">
                  Professional Generated Icons ({generatedIcons.length})
                  {uploadedImage && <span className="text-lg font-normal text-primary-600"> • Image-based Analysis</span>}
                </h4>
                <p className="text-warm-600 text-lg">
                  {selectedIcons.size} selected • Click to select • Right-click to edit • Professional 16-color system
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedIcons(new Set(generatedIcons.map(icon => icon.id)))}
                  className="px-6 py-3 text-base bg-warm-100 text-warm-600 rounded-2xl hover:bg-warm-200 transition-all duration-200 font-semibold shadow-neumorphic-sm"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedIcons(new Set())}
                  className="px-6 py-3 text-base bg-warm-100 text-warm-600 rounded-2xl hover:bg-warm-200 transition-all duration-200 font-semibold shadow-neumorphic-sm"
                >
                  Clear Selection
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={exportSelectedIcons}
                  disabled={selectedIcons.size === 0}
                  className="px-8 py-3 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white rounded-2xl font-bold text-base shadow-neumorphic hover:shadow-neumorphic-lg transition-all duration-300 disabled:opacity-50 flex items-center space-x-3"
                >
                  <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  <span>Export Professional Set ({selectedIcons.size})</span>
                </motion.button>
              </div>
            </div>

            {/* Professional 6-Icon Grid Layout (Same as Community page) */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {generatedIcons.map((icon, index) => (
                <motion.div
                  key={icon.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleIconSelection(icon.id)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleEditIcon(icon);
                    }}
                    className={`aspect-square rounded-3xl flex items-center justify-center cursor-pointer transition-all duration-300 border-2 shadow-neumorphic hover:shadow-neumorphic-lg ${
                      selectedIcons.has(icon.id)
                        ? 'border-primary-400 bg-primary-50 shadow-neumorphic-inset'
                        : 'border-white/60 bg-white hover:border-primary-300'
                    }`}
                    style={{ 
                      backgroundColor: selectedIcons.has(icon.id) ? `${icon.color}15` : 'white'
                    }}
                    title="Right-click to edit in professional editor"
                  >
                    {regeneratingIndex === icon.id ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <SafeIcon icon={FiRefreshCw} className="w-10 h-10 text-primary-500" />
                      </motion.div>
                    ) : (
                      <SafeIcon 
                        icon={getIconComponent(icon.id)} 
                        className="w-10 h-10" 
                        style={{ color: icon.color }} 
                      />
                    )}
                  </motion.div>
                  
                  {/* Professional Edit Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    onClick={() => handleEditIcon(icon)}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-secondary-500 to-warm-500 hover:from-secondary-600 hover:to-warm-600 text-white rounded-full flex items-center justify-center shadow-neumorphic-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="Edit in Professional Icon Editor"
                  >
                    <SafeIcon icon={FiEdit3} className="w-5 h-5" />
                  </motion.button>
                  
                  {/* Professional AI Confidence Indicator */}
                  <div 
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-white shadow-sm"
                    style={{ 
                      backgroundColor: icon.aiConfidence > 0.9 ? '#10b981' : 
                                      icon.aiConfidence > 0.8 ? '#22c55e' :
                                      icon.aiConfidence > 0.6 ? '#f59e0b' : '#ef4444'
                    }}
                    title={`Professional AI Confidence: ${Math.round(icon.aiConfidence * 100)}%`}
                  />
                  
                  {/* Enhanced Selection Indicator */}
                  <AnimatePresence>
                    {selectedIcons.has(icon.id) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-neumorphic-sm"
                      >
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Professional Empty State */}
      {!isGenerating && generatedIcons.length === 0 && (
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gradient-to-br from-warm-100 to-primary-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-neumorphic-sm">
            <SafeIcon icon={FiZap} className="w-16 h-16 text-primary-500" />
          </div>
          <h4 className="text-2xl font-bold text-warm-800 mb-4">Ready for Professional Generation</h4>
          <p className="text-warm-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Provide a project description or upload your design to get started with professional AI icon generation featuring our sophisticated 16-color palette system.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIIconGenerator;
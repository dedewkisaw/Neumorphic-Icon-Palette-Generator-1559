import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiUpload, FiX, FiImage, FiFile, FiCheck, FiAlertCircle } = FiIcons;

const EnhancedFileUpload = ({ onFileUpload, onAnalysisComplete, disabled = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [analysisData, setAnalysisData] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setErrorMessage('');
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setUploadStatus('error');
      setErrorMessage('Please upload an image file (JPG, PNG, GIF, or SVG)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('error');
      setErrorMessage('File size must be less than 10MB');
      return;
    }

    setUploadStatus('uploading');
    setUploadedFile(file);

    try {
      // Create preview URL for images
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }

      // Simulate file processing and analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock AI analysis results
      const mockAnalysis = await analyzeDesignFile(file);
      setAnalysisData(mockAnalysis);
      setUploadStatus('success');

      // Notify parent components
      if (onFileUpload) {
        onFileUpload(file);
      }
      if (onAnalysisComplete) {
        onAnalysisComplete(mockAnalysis);
      }

      console.log('✅ File uploaded successfully:', file.name);

    } catch (error) {
      console.error('❌ File upload failed:', error);
      setUploadStatus('error');
      setErrorMessage('Upload failed. Please try again.');
    }
  };

  const analyzeDesignFile = async (file) => {
    // Simulate AI analysis based on file characteristics
    const mockAnalysis = {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      dominantColors: generateColorsFromFileName(file.name),
      detectedElements: detectElementsFromFile(file),
      suggestedStyle: suggestStyleFromFile(file),
      brandPersonality: generatePersonalityTraits(file.name),
      complexity: file.size > 1024 * 1024 ? 'high' : file.size > 512 * 1024 ? 'medium' : 'low',
      iconCategories: suggestIconCategories(file.name),
      confidence: Math.random() * 0.2 + 0.8, // 80-100% confidence
      timestamp: Date.now()
    };

    return mockAnalysis;
  };

  const generateColorsFromFileName = (fileName) => {
    // Generate colors based on file name hash
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];
    const hash = fileName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return colors.slice(0, 4).map((color, index) => {
      const variation = (hash + index * 50) % 100;
      return adjustColorBrightness(color, variation);
    });
  };

  const adjustColorBrightness = (color, variation) => {
    // Simple color variation based on hash
    const colors = [
      '#c84bff', '#f97316', '#14b8a6', '#ff5757', '#facc15', '#2dd4bf',
      '#d97aff', '#fb923c', '#5eead4', '#ff7a7a', '#fde047', '#99f6e4'
    ];
    return colors[variation % colors.length];
  };

  const detectElementsFromFile = (file) => {
    const elements = ['geometric', 'organic', 'minimal', 'detailed', 'abstract', 'realistic'];
    const fileName = file.name.toLowerCase();
    
    if (fileName.includes('logo') || fileName.includes('brand')) {
      return ['geometric', 'minimal', 'professional'];
    } else if (fileName.includes('app') || fileName.includes('ui')) {
      return ['minimal', 'modern', 'interface'];
    }
    
    return elements.slice(0, 3);
  };

  const suggestStyleFromFile = (file) => {
    const fileName = file.name.toLowerCase();
    if (fileName.includes('flat') || fileName.includes('minimal')) return 'flat';
    if (fileName.includes('line') || fileName.includes('outline')) return 'line';
    if (fileName.includes('3d') || fileName.includes('dimensional')) return '3d';
    if (fileName.includes('gradient') || fileName.includes('colorful')) return 'gradient';
    return 'flat';
  };

  const generatePersonalityTraits = (fileName) => {
    const traits = ['professional', 'creative', 'modern', 'trustworthy', 'innovative', 'accessible'];
    const fileName_lower = fileName.toLowerCase();
    
    if (fileName_lower.includes('corporate') || fileName_lower.includes('business')) {
      return ['professional', 'trustworthy', 'reliable'];
    } else if (fileName_lower.includes('creative') || fileName_lower.includes('art')) {
      return ['creative', 'innovative', 'expressive'];
    }
    
    return traits.slice(0, 3);
  };

  const suggestIconCategories = (fileName) => {
    const categories = ['interface', 'navigation', 'communication', 'data', 'content', 'action'];
    const fileName_lower = fileName.toLowerCase();
    
    if (fileName_lower.includes('dashboard') || fileName_lower.includes('admin')) {
      return ['data', 'interface', 'navigation'];
    } else if (fileName_lower.includes('social') || fileName_lower.includes('chat')) {
      return ['communication', 'social', 'interface'];
    }
    
    return categories.slice(0, 3);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setAnalysisData(null);
    setErrorMessage('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    console.log('🗑️ File removed');
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading': return FiUpload;
      case 'success': return FiCheck;
      case 'error': return FiAlertCircle;
      default: return FiUpload;
    }
  };

  const getStatusColor = () => {
    switch (uploadStatus) {
      case 'uploading': return 'text-primary-500';
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      default: return 'text-warm-400';
    }
  };

  const handleUploadAreaClick = (e) => {
    if (disabled) return;
    
    // Trigger file input click
    const fileInput = e.currentTarget.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${
          dragActive 
            ? 'border-primary-400 bg-primary-50/50' 
            : uploadStatus === 'success'
            ? 'border-green-400 bg-green-50/50'
            : uploadStatus === 'error'
            ? 'border-red-400 bg-red-50/50'
            : 'border-warm-300 hover:border-primary-400 hover:bg-primary-50/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleUploadAreaClick}
      >
        <input
          type="file"
          accept="image/*,.svg"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
          disabled={disabled}
          style={{ zIndex: -1 }}
        />
        
        <div className="relative z-0">
          <motion.div
            animate={{ 
              scale: uploadStatus === 'uploading' ? [1, 1.1, 1] : 1,
              rotate: uploadStatus === 'uploading' ? [0, 360] : 0
            }}
            transition={{ 
              duration: uploadStatus === 'uploading' ? 2 : 0.3,
              repeat: uploadStatus === 'uploading' ? Infinity : 0
            }}
            className={`w-12 h-12 mx-auto mb-4 ${getStatusColor()}`}
          >
            <SafeIcon icon={getStatusIcon()} className="w-12 h-12" />
          </motion.div>
          
          <div>
            {uploadStatus === 'idle' && (
              <>
                <p className="text-base text-warm-600 font-medium mb-2">
                  Drop your design here or click to browse
                </p>
                <p className="text-sm text-warm-400">
                  Supports: PNG, JPG, SVG • Max 10MB
                </p>
              </>
            )}
            
            {uploadStatus === 'uploading' && (
              <p className="text-base text-primary-600 font-medium">
                Analyzing your design...
              </p>
            )}
            
            {uploadStatus === 'success' && uploadedFile && (
              <div>
                <p className="text-base text-green-600 font-medium mb-2">
                  ✨ Analysis Complete!
                </p>
                <p className="text-sm text-warm-600">
                  {uploadedFile.name} • {(uploadedFile.size / 1024 / 1024).toFixed(2)}MB
                </p>
              </div>
            )}
            
            {uploadStatus === 'error' && (
              <div>
                <p className="text-base text-red-600 font-medium mb-2">
                  Upload failed
                </p>
                <p className="text-sm text-warm-600">
                  {errorMessage || 'Please check file type and size'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* File Preview & Analysis */}
      <AnimatePresence>
        {uploadedFile && uploadStatus === 'success' && analysisData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-green-50 via-primary-50 to-secondary-50 rounded-2xl p-6 border border-green-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                {previewUrl && (
                  <div className="w-16 h-16 bg-white rounded-xl shadow-neumorphic-sm overflow-hidden border border-white/50">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-warm-800 flex items-center space-x-2">
                    <SafeIcon icon={FiImage} className="w-5 h-5 text-green-600" />
                    <span>Design Analysis</span>
                  </h4>
                  <p className="text-sm text-warm-600">
                    AI confidence: {Math.round(analysisData.confidence * 100)}%
                  </p>
                </div>
              </div>
              
              <button
                onClick={removeFile}
                className="p-2 text-warm-400 hover:text-warm-600 hover:bg-white/50 rounded-xl transition-all duration-200"
                title="Remove file"
              >
                <SafeIcon icon={FiX} className="w-5 h-5" />
              </button>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-warm-700">Detected Style:</span>
                <span className="ml-2 text-warm-600 capitalize">{analysisData.suggestedStyle}</span>
              </div>
              <div>
                <span className="font-medium text-warm-700">Complexity:</span>
                <span className="ml-2 text-warm-600 capitalize">{analysisData.complexity}</span>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-warm-700">Suggested Categories:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysisData.iconCategories.map((category, index) => (
                    <span key={index} className="px-3 py-1 bg-white/80 text-warm-600 rounded-xl text-xs font-medium">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-warm-700">Color Palette:</span>
                <div className="flex space-x-2 mt-2">
                  {analysisData.dominantColors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-xl shadow-neumorphic-sm border-2 border-white"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedFileUpload;
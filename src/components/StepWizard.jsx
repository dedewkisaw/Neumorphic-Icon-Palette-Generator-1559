import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowLeft, FiCheck } from 'react-icons/fi';

const StepWizard = ({ children, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [stepData, setStepData] = useState({});

  const steps = React.Children.toArray(children);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(currentStep + 1);
    } else {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      onComplete?.();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex) => {
    // Only allow going to previous steps or the next immediate step
    if (stepIndex <= currentStep || completedSteps.has(stepIndex - 1)) {
      setCurrentStep(stepIndex);
    }
  };

  const handleStepData = (data) => {
    console.log(`📊 Step ${currentStep} data updated:`, data);
    setStepData(prev => ({
      ...prev,
      [currentStep]: data
    }));
  };

  const canProceed = () => {
    // Check if current step has required data
    const currentStepData = stepData[currentStep];
    
    switch (currentStep) {
      case 0: // Project description step
        const hasDescription = currentStepData?.description?.trim();
        console.log('🔍 Step 0 validation:', { hasDescription, currentStepData });
        return hasDescription;
      case 1: // Icon selection step
        const hasSelectedIcons = currentStepData?.selectedIcons?.length > 0;
        console.log('🔍 Step 1 validation:', { hasSelectedIcons, selectedCount: currentStepData?.selectedIcons?.length || 0, currentStepData });
        return hasSelectedIcons;
      case 2: // Customization step
        return true; // Always can complete customization
      default:
        return true;
    }
  };

  const getStepTitle = (index) => {
    const titles = ['Describe Project', 'Select Icons', 'Customize & Export'];
    return titles[index] || `Step ${index + 1}`;
  };

  const getStepDescription = (index) => {
    const descriptions = [
      'Tell us about your project',
      'Choose your favorite icons',
      'Fine-tune and download'
    ];
    return descriptions[index] || '';
  };

  return (
    <div className="w-full">
      {/* Enhanced Step Progress Indicator - Mobile Responsive */}
      <div className="flex items-center justify-center mb-8 sm:mb-12 lg:mb-16">
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.button
                  whileHover={{ scale: completedSteps.has(index) || index <= currentStep ? 1.05 : 1 }}
                  whileTap={{ scale: completedSteps.has(index) || index <= currentStep ? 0.95 : 1 }}
                  onClick={() => goToStep(index)}
                  disabled={index > currentStep && !completedSteps.has(index - 1)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl transition-all duration-300 border-2 backdrop-blur-lg shadow-neumorphic-sm relative ${
                    currentStep === index
                      ? 'bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white border-primary-400 shadow-neumorphic-lg'
                      : completedSteps.has(index)
                      ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white border-green-400 shadow-neumorphic'
                      : index <= currentStep
                      ? 'bg-white/90 text-warm-600 border-warm-300 hover:bg-warm-50 shadow-neumorphic cursor-pointer'
                      : 'bg-warm-100 text-warm-400 border-warm-200 cursor-not-allowed opacity-60'
                  }`}
                >
                  {completedSteps.has(index) ? (
                    <FiCheck className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                  ) : (
                    index + 1
                  )}
                  
                  {/* Active step pulse effect */}
                  {currentStep === index && (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                    />
                  )}
                </motion.button>

                {/* Step title and description - Mobile Responsive */}
                <div className="text-center mt-2 sm:mt-3 lg:mt-4 max-w-16 sm:max-w-24 lg:max-w-32">
                  <div className={`font-bold text-xs sm:text-sm lg:text-base ${
                    currentStep === index
                      ? 'text-primary-600'
                      : completedSteps.has(index)
                      ? 'text-green-600'
                      : 'text-warm-500'
                  }`}>
                    {getStepTitle(index)}
                  </div>
                  <div className="text-xs sm:text-sm text-warm-400 mt-1 hidden sm:block">
                    {getStepDescription(index)}
                  </div>
                </div>
              </div>

              {/* Connection line - Mobile Responsive */}
              {index < steps.length - 1 && (
                <div
                  className={`w-8 sm:w-12 lg:w-20 h-1 mx-2 sm:mx-4 lg:mx-6 mt-2 rounded-full transition-colors duration-300 ${
                    completedSteps.has(index) || currentStep > index
                      ? 'bg-gradient-to-r from-green-400 to-teal-400'
                      : 'bg-warm-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]"
        >
          {React.cloneElement(steps[currentStep], {
            onNext: nextStep,
            onPrev: prevStep,
            onData: handleStepData,
            projectData: stepData[0], // Pass project data to generation step
            selectedIcons: stepData[1], // Pass selected icons to customization step
            isFirst: currentStep === 0,
            isLast: currentStep === steps.length - 1,
            stepNumber: currentStep + 1,
            totalSteps: steps.length,
            canProceed: canProceed()
          })}
        </motion.div>
      </AnimatePresence>

      {/* MOBILE-OPTIMIZED Navigation Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 sm:mt-12 lg:mt-16 px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-0">
        {/* Previous Button - Mobile Responsive */}
        <motion.button
          whileHover={{ scale: currentStep > 0 ? 1.02 : 1 }}
          whileTap={{ scale: currentStep > 0 ? 0.98 : 1 }}
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base lg:text-lg transition-all duration-300 ${
            currentStep === 0
              ? 'bg-warm-100 text-warm-400 cursor-not-allowed opacity-50 border border-warm-200 shadow-neumorphic-inset'
              : 'bg-white/90 text-warm-600 border border-warm-300 hover:bg-warm-50 shadow-neumorphic hover:shadow-neumorphic-lg'
          }`}
        >
          <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Previous</span>
        </motion.button>

        {/* Step Counter - Mobile Responsive */}
        <div className="flex flex-col items-center order-first sm:order-none">
          <div className="text-warm-600 font-semibold text-base sm:text-lg">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="text-warm-500 text-xs sm:text-sm mt-1">
            {getStepTitle(currentStep)}
          </div>
        </div>

        {/* Next/Complete Button - Mobile Responsive */}
        <motion.button
          whileHover={{ scale: canProceed() ? 1.02 : 1 }}
          whileTap={{ scale: canProceed() ? 0.98 : 1 }}
          onClick={nextStep}
          disabled={!canProceed()}
          className={`w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base lg:text-lg transition-all duration-300 ${
            canProceed()
              ? 'bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 text-white shadow-neumorphic hover:shadow-neumorphic-lg hover:shadow-warm-glow'
              : 'bg-warm-200 text-warm-400 cursor-not-allowed opacity-50 shadow-neumorphic-inset'
          }`}
        >
          <span>{currentStep === steps.length - 1 ? 'Complete' : 'Continue'}</span>
          <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      {/* Progress Bar - Mobile Responsive */}
      <div className="mt-6 sm:mt-8 mx-4 sm:mx-6 lg:mx-8">
        <div className="w-full bg-warm-200 rounded-full h-2 shadow-neumorphic-inset">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-warm-500 rounded-full shadow-neumorphic-sm"
          />
        </div>
        <div className="flex justify-between text-xs sm:text-sm text-warm-500 mt-2">
          <span>Project Description</span>
          <span className="hidden sm:inline">Icon Selection</span>
          <span>Customization</span>
        </div>
      </div>
    </div>
  );
};

export default StepWizard;
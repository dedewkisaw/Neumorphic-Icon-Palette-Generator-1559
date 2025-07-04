import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit3, FiTrash2, FiDownload, FiFolder, FiCalendar } from 'react-icons/fi';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const ProjectsSection = ({ savedPalettes, setSavedPalettes }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  const getIconComponent = (iconName) => {
    const iconKey = `Fi${iconName}`;
    return FiIcons[iconKey] || FiIcons.FiCircle;
  };

  const deletePalette = (paletteId) => {
    setSavedPalettes(prev => prev.filter(palette => palette.id !== paletteId));
  };

  const exportPalette = (palette) => {
    const paletteData = {
      ...palette,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(paletteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}-project.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const createNewProject = () => {
    if (!newProjectName.trim()) return;

    const newProject = {
      id: Date.now(),
      name: newProjectName,
      description: newProjectDescription,
      icons: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setSavedPalettes(prev => [...prev, newProject]);
    setNewProjectName('');
    setNewProjectDescription('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Your Projects</h2>
          <p className="text-white/60">Manage your saved icon palettes and projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4" />
          <span>New Project</span>
        </motion.button>
      </div>

      {/* Projects Grid */}
      {savedPalettes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPalettes.map((palette, index) => (
            <motion.div
              key={palette.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/15 shadow-soft hover:bg-white/15 transition-all duration-300 group"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={FiFolder} className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{palette.name}</h3>
                    <p className="text-white/60 text-sm">{palette.icons?.length || 0} icons</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => exportPalette(palette)}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => deletePalette(palette.id)}
                    className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Icons Preview */}
              {palette.icons && palette.icons.length > 0 ? (
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {palette.icons.slice(0, 5).map((icon, iconIndex) => (
                    <div
                      key={iconIndex}
                      className="aspect-square bg-white/10 rounded-lg flex items-center justify-center"
                      style={{ color: icon.color }}
                    >
                      <SafeIcon 
                        icon={getIconComponent(icon.name)} 
                        className="w-4 h-4"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-16 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-white/40 text-sm">No icons yet</p>
                </div>
              )}

              {/* Project Info */}
              <div className="text-xs text-white/60 mb-4 flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiCalendar} className="w-3 h-3" />
                  <span>
                    {new Date(palette.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-white/10 text-white py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors text-sm font-medium">
                  Open Project
                </button>
                <button className="px-3 py-2 bg-white/10 text-white rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                  <SafeIcon icon={FiEdit3} className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiFolder} className="w-8 h-8 text-white/40" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-white/60 mb-6">Create your first project to start organizing your icon palettes</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Create First Project
          </motion.button>
        </div>
      )}

      {/* Create Project Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border border-white/15 shadow-soft"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Create New Project</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Project Name</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="My Awesome Project"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
                
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">Description (Optional)</label>
                  <textarea
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    placeholder="Brief description of your project..."
                    rows={3}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 border border-white/20 rounded-lg py-2 text-white hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewProject}
                  disabled={!newProjectName.trim()}
                  className="flex-1 bg-indigo-600 text-white rounded-lg py-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsSection;
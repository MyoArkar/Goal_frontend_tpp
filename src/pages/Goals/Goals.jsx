import React from 'react';
import { logger } from '../../utils/logger';
import { useTheme } from '../../contexts/ThemeContext';

const Goals = () => {
  logger.debug('Rendering Goals page');
  const { darkMode } = useTheme();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold transition-colors duration-theme
          ${darkMode ? 'text-dark-text-primary' : 'text-primary-900'}`}
        >
          My Goals
        </h1>
        <button className={`px-4 py-2 rounded-md transition-colors duration-theme
          ${darkMode 
            ? 'bg-info-dark hover:bg-info-light text-dark-text-primary' 
            : 'bg-info-light hover:bg-info-dark text-white'}`}
        >
          Add New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Goal Card */}
        <div className={`p-6 rounded-lg shadow-sm transition-colors duration-theme
          ${darkMode 
            ? 'bg-dark-bg-secondary border border-dark-border' 
            : 'bg-white border border-primary-100'}`}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-lg font-semibold transition-colors duration-theme
              ${darkMode ? 'text-dark-text-primary' : 'text-primary-900'}`}
            >
              Learn React
            </h3>
            <span className={`px-2 py-1 text-sm rounded transition-colors duration-theme
              ${darkMode 
                ? 'bg-success-dark/20 text-success-dark' 
                : 'bg-success-light/20 text-success-light'}`}
            >
              In Progress
            </span>
          </div>
          <p className={`mb-4 transition-colors duration-theme
            ${darkMode ? 'text-dark-text-secondary' : 'text-primary-600'}`}
          >
            Master React and its ecosystem including Redux, React Router, and Hooks.
          </p>
          <div className="space-y-3">
            <div>
              <p className={`text-sm transition-colors duration-theme
                ${darkMode ? 'text-dark-text-secondary' : 'text-primary-500'}`}
              >
                Progress
              </p>
              <div className={`w-full h-2.5 rounded-full transition-colors duration-theme
                ${darkMode ? 'bg-dark-bg-tertiary' : 'bg-primary-100'}`}
              >
                <div className={`h-2.5 rounded-full transition-colors duration-theme
                  ${darkMode ? 'bg-info-dark' : 'bg-info-light'}`} 
                  style={{ width: '45%' }}
                >
                </div>
              </div>
            </div>
            <div className={`flex justify-between text-sm transition-colors duration-theme
              ${darkMode ? 'text-dark-text-secondary' : 'text-primary-500'}`}
            >
              <span>Due Date: Dec 31, 2024</span>
              <span>45% Complete</span>
            </div>
          </div>
        </div>

        {/* Add Goal Card */}
        <div className={`rounded-lg p-6 flex items-center justify-center transition-colors duration-theme
          ${darkMode 
            ? 'border-2 border-dashed border-dark-border hover:border-dark-text-accent' 
            : 'border-2 border-dashed border-primary-300 hover:border-info-light'}`}
        >
          <button className={`transition-colors duration-theme
            ${darkMode 
              ? 'text-dark-text-secondary hover:text-dark-text-accent' 
              : 'text-primary-500 hover:text-info-light'}`}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="block mt-2">Add New Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Goals;

import React, { useState } from 'react';
import { logger } from '../../utils/logger';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Goals = () => {
  logger.debug('Rendering Goals page');
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);

  const navigate = useNavigate();
  const handleAddGoalClick = () => {
    navigate('/create-goal'); // Navigate to the Create Goal page
  };
  // Sample goals data - replace with actual data from your backend
  const goals = [
    {
      id: 1,
      title: 'Learn React',
      description: 'Master React and its ecosystem including Redux, React Router, and Hooks. Master React and its ecosystem including Redux, React Router, and Hooks. Master React and its ecosystem including Redux, React Router, and Hooks. Master React and its ecosystem including Redux, React Router, and Hooks. Master React and its ecosystem including Redux, React Router, and Hooks.',
      status: 'in-progress',
      progress: 45,
      dueDate: 'Dec 31, 2024'
    },
    {
      id: 2,
      title: 'Complete Portfolio',
      description: 'Build and deploy a professional portfolio website.',
      status: 'pending',
      progress: 0,
      dueDate: 'Jan 31, 2025'
    },
    {
      id: 3,
      title: 'Master TypeScript',
      description: 'Learn TypeScript and implement it in projects.',
      status: 'complete',
      progress: 100,
      dueDate: 'Nov 30, 2024'
    }
  ];

  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         goal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'in-progress' && goal.status === 'in-progress') ||
                      (activeTab === 'pending' && goal.status === 'pending') ||
                      (activeTab === 'complete' && goal.status === 'complete');
    return matchesSearch && matchesTab;
  });

  const getStatusStyle = (status) => {
    const baseClasses = 'px-2 py-1 text-sm rounded transition-colors duration-theme ';
    switch(status) {
      case 'complete':
        return baseClasses + (darkMode 
          ? 'bg-success-dark/20 text-success-dark' 
          : 'bg-success-light/20 text-success-light');
      case 'in-progress':
        return baseClasses + (darkMode 
          ? 'bg-info-dark/20 text-info-dark' 
          : 'bg-info-light/20 text-info-light');
      default:
        return baseClasses + (darkMode 
          ? 'bg-gray-600/20 text-gray-300' 
          : 'bg-gray-200 text-gray-600');
    }
  };

  const TabButton = ({ id, label, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`relative px-4 py-2 rounded-md transition-all duration-200 
        ${activeTab === id
          ? darkMode
            ? 'bg-info-dark/10 text-white font-medium'
            : 'bg-info-light/5 text-info-light font-medium'
          : darkMode
            ? 'text-dark-text-secondary hover:bg-dark-bg-secondary'
            : 'text-primary-600 hover:bg-gray-100'
        }
        ${activeTab === id ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current' : ''}`
      }
    >
      {label} {count !== undefined && <span className="ml-1 text-xs">({count})</span>}
    </button>
  );

  const Modal = ({ goal, onClose }) => {
    if (!goal) return null;

    return (
      <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/50">
        <div 
          className={`relative w-full max-w-2xl rounded-lg shadow-lg p-6 transition-colors duration-theme
            ${darkMode ? 'bg-dark-bg-secondary' : 'bg-white'}`}
        >
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-theme
              ${darkMode 
                ? 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-bg-primary' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex justify-between items-start mb-4">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-dark-text-primary' : 'text-primary-900'}`}>
              {goal.title}
            </h2>
            <span className={getStatusStyle(goal.status)}>
              {goal.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-dark-text-secondary' : 'text-primary-600'}`}>
                Description
              </h3>
              <p className={`text-base ${darkMode ? 'text-dark-text-primary' : 'text-primary-900'}`}>
                {goal.description}
              </p>
            </div>

            <div>
              <h3 className={`text-sm font-medium mb-2 ${darkMode ? 'text-dark-text-secondary' : 'text-primary-600'}`}>
                Progress
              </h3>
              <div className={`w-full h-2.5 rounded-full mb-2 transition-colors duration-theme
                ${darkMode ? 'bg-dark-bg-tertiary' : 'bg-primary-100'}`}
              >
                <div 
                  className={`h-2.5 rounded-full transition-colors duration-theme
                    ${darkMode ? 'bg-info-dark' : 'bg-info-light'}`} 
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className={darkMode ? 'text-dark-text-secondary' : 'text-primary-500'}>
                  Due: {goal.dueDate}
                </span>
                <span className={darkMode ? 'text-dark-text-secondary' : 'text-primary-500'}>
                  {goal.progress}% Complete
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-md transition-colors duration-theme
                  ${darkMode 
                    ? 'bg-dark-bg-tertiary hover:bg-dark-bg-primary text-dark-text-primary' 
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'}`}
              >
                Close
              </button>
              <button
                className={`px-4 py-2 rounded-md transition-colors duration-theme
                  ${darkMode 
                    ? 'bg-info-dark hover:bg-info-light text-dark-text-primary' 
                    : 'text-white bg-info-light hover:bg-info-dark'}`}
              >
                Edit Goal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <Modal goal={selectedGoal} onClose={() => setSelectedGoal(null)} />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold transition-colors duration-theme
          ${darkMode ? 'text-dark-text-primary' : 'text-primary-900'}`}
        >
          My Goals
        </h1>
        <button className={`px-4 py-2 rounded-md transition-colors duration-theme
          ${darkMode 
            ? 'bg-info-dark hover:bg-info-light text-dark-text-primary' 
            : 'text-white bg-info-light hover:bg-info-dark'}`}
          onClick={handleAddGoalClick}
        >
          Add New Goal
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className={`flex items-center p-2 rounded-lg transition-colors duration-theme
          ${darkMode 
            ? 'border bg-dark-bg-secondary border-dark-border' 
            : 'bg-white border border-gray-200'}`}
        >
          <svg className={`w-5 h-5 ${darkMode ? 'text-dark-text-secondary' : 'text-gray-400'}`} 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search goals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`ml-2 w-full bg-transparent outline-none transition-colors duration-theme
              ${darkMode ? 'text-dark-text-primary placeholder-dark-text-secondary' : 'placeholder-gray-500 text-gray-900'}`}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 space-x-2">
        <TabButton id="all" label="All" count={goals.length} />
        <TabButton 
          id="pending" 
          label="Pending" 
          count={goals.filter(g => g.status === 'pending').length} 
        />
        <TabButton 
          id="in-progress" 
          label="In Progress" 
          count={goals.filter(g => g.status === 'in-progress').length} 
        />
        <TabButton 
          id="complete" 
          label="Complete" 
          count={goals.filter(g => g.status === 'complete').length} 
        />
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGoals.map(goal => (
          <div 
            key={goal.id} 
            onClick={() => setSelectedGoal(goal)}
            className={`p-6 rounded-lg shadow-sm transition-colors duration-theme min-h-[280px] max-w-full flex flex-col cursor-pointer
              ${darkMode 
                ? 'border bg-dark-bg-secondary border-dark-border hover:bg-dark-bg-primary' 
                : 'bg-white border border-primary-100 hover:bg-gray-50'}`}
          >
            <div className="flex gap-4 justify-between items-start mb-4">
              <h3 className={`text-lg font-semibold transition-colors duration-theme truncate flex-1
                ${darkMode ? 'text-dark-text-primary' : 'text-primary-900'}`}
                title={goal.title}
              >
                {goal.title}
              </h3>
              <span className={`${getStatusStyle(goal.status)} whitespace-nowrap flex-shrink-0`}>
                {goal.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </div>
            <p className={`mb-4 transition-colors duration-theme line-clamp-3 flex-1
              ${darkMode ? 'text-dark-text-secondary' : 'text-primary-600'}`}
              title={goal.description}
            >
              {goal.description}
            </p>
            <div className="mt-auto space-y-3">
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
                    style={{ width: `${goal.progress}%` }}
                  >
                  </div>
                </div>
              </div>
              <div className={`flex justify-between text-sm transition-colors duration-theme
                ${darkMode ? 'text-dark-text-secondary' : 'text-primary-500'}`}
              >
                <span className="pr-2 truncate">Due: {goal.dueDate}</span>
                <span className="flex-shrink-0">{goal.progress}% Complete</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add Goal Card */}
        <div className={`rounded-lg p-6 flex items-center justify-center transition-colors duration-theme min-h-[280px]
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

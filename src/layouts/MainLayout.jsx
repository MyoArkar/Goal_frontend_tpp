import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { logger } from '../utils/logger';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';

const MainLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { darkMode } = useTheme();
  logger.debug('Rendering MainLayout');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    logger.debug(`Sidebar ${isSidebarCollapsed ? 'expanded' : 'collapsed'}`);
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex flex-col">
=======
    <div className="h-screen flex flex-col overflow-hidden">
>>>>>>> my_feature_branch
      <Header toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarCollapsed={isSidebarCollapsed} />

<<<<<<< HEAD
        {/* Main Content - Responsive width that adjusts with sidebar state */}
        <main 
          className={`flex-1 overflow-auto transition-colors duration-theme
=======
        {/* Main Content - Scrollable area */}
        <main 
          className={`flex-1 overflow-y-auto transition-colors duration-theme relative
>>>>>>> my_feature_branch
            ${darkMode ? 'bg-dark-bg-secondary' : 'bg-primary-50'}
            ${isSidebarCollapsed ? 'pl-0' : 'pl-0 lg:pl-0'}
          `}
        >
          <div className="h-full p-6 mx-auto max-w-7xl">
            <div className="w-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;

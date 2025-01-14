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
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarCollapsed={isSidebarCollapsed} />

        {/* Main Content - Responsive width that adjusts with sidebar state */}
        <main 
          className={`flex-1 overflow-auto transition-colors duration-theme
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

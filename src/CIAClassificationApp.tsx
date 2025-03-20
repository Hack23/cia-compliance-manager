import React, { useCallback, useEffect, useState } from 'react';
import AvailabilityImpactWidget from "./components/widgets/AvailabilityImpactWidget";
import BusinessImpactAnalysisWidget from "./components/widgets/BusinessImpactAnalysisWidget";
import ComplianceStatusWidget from "./components/widgets/ComplianceStatusWidget";
import ConfidentialityImpactWidget from "./components/widgets/ConfidentialityImpactWidget";
import CostEstimationWidget from "./components/widgets/CostEstimationWidget";
import IntegrityImpactWidget from "./components/widgets/IntegrityImpactWidget";
import SecurityLevelWidget from "./components/widgets/SecurityLevelWidget";
import SecurityResourcesWidget from "./components/widgets/SecurityResourcesWidget";
import SecuritySummaryWidget from "./components/widgets/SecuritySummaryWidget";
import SecurityVisualizationWidget from "./components/widgets/SecurityVisualizationWidget";
import TechnicalDetailsWidget from "./components/widgets/TechnicalDetailsWidget";
import ValueCreationWidget from "./components/widgets/ValueCreationWidget";
import { WIDGET_ICONS, WIDGET_TITLES } from "./constants/appConstants";
import { SecurityLevel } from './types/cia';

/**
 * Main application component for CIA Classification
 * 
 * ## Business Perspective
 * 
 * This component serves as the central state manager for security levels
 * across the application, ensuring consistent security posture visualization
 * and providing a unified user experience for security professionals. 🔒
 */
const CIAClassificationApp: React.FC = () => {
  // Use local state with persisted values from localStorage
  const defaultAvailabilityLevel = localStorage.getItem('availabilityLevel') as SecurityLevel || 'Moderate';
  const defaultIntegrityLevel = localStorage.getItem('integrityLevel') as SecurityLevel || 'Moderate';
  const defaultConfidentialityLevel = localStorage.getItem('confidentialityLevel') as SecurityLevel || 'Moderate';
  const defaultDarkMode = localStorage.getItem('darkMode') === 'true' || 
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  
  // Replace useLocalStorage with useState and manual localStorage handling
  const [availabilityLevel, setAvailabilityLevelState] = useState<SecurityLevel>(defaultAvailabilityLevel);
  const [integrityLevel, setIntegrityLevelState] = useState<SecurityLevel>(defaultIntegrityLevel);
  const [confidentialityLevel, setConfidentialityLevelState] = useState<SecurityLevel>(defaultConfidentialityLevel);
  const [darkMode, setDarkModeState] = useState<boolean>(defaultDarkMode);
  
  // Custom setters that also persist values to localStorage
  const setAvailabilityLevel = (level: SecurityLevel) => {
    localStorage.setItem('availabilityLevel', level);
    setAvailabilityLevelState(level);
  };
  
  const setIntegrityLevel = (level: SecurityLevel) => {
    localStorage.setItem('integrityLevel', level);
    setIntegrityLevelState(level);
  };
  
  const setConfidentiality = (level: SecurityLevel) => {
    localStorage.setItem('confidentialityLevel', level);
    setConfidentialityLevelState(level);
  };
  
  const setDarkMode = (value: boolean | ((prev: boolean) => boolean)) => {
    const newValue = typeof value === 'function' ? value(darkMode) : value;
    localStorage.setItem('darkMode', String(newValue));
    setDarkModeState(newValue);
  };
  
  // Log initial values for debugging
  useEffect(() => {
    console.log('CIA App Security Levels:', {
      availability: availabilityLevel,
      integrity: integrityLevel,
      confidentiality: confidentialityLevel
    });
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);
  
  // Create handler functions
  const handleAvailabilityChange = useCallback((level: SecurityLevel) => {
    console.log('CIAClassificationApp: Setting availability level to:', level);
    setAvailabilityLevel(level);
  }, []);

  const handleIntegrityChange = useCallback((level: SecurityLevel) => {
    console.log('CIAClassificationApp: Setting integrity level to:', level);
    setIntegrityLevel(level);
  }, []);

  const handleConfidentialityChange = useCallback((level: SecurityLevel) => {
    console.log('CIAClassificationApp: Setting confidentiality level to:', level);
    setConfidentiality(level);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Create a widget header component
  const WidgetHeader = ({ title, icon }: { title: string, icon: string }) => (
    <div className="widget-header border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
      <h3 className="widget-title font-medium text-gray-700 dark:text-gray-300 flex items-center">
        {icon && <span className="widget-icon mr-2">{icon}</span>}
        {title}
      </h3>
    </div>
  );


  return (
    <div className="app-container">
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} p-4 transition-colors duration-300`}>
        {/* App header with theme toggle */}
        <div className="app-title mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">CIA Compliance Manager</h1>
          <button 
            onClick={toggleDarkMode}
            className="theme-toggle px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        {/* Simple grid layout to replace Dashboard */}
        <div className="dashboard-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
             data-testid="dashboard-grid">
          
            <SecurityLevelWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
              onAvailabilityChange={handleAvailabilityChange}
              onIntegrityChange={handleIntegrityChange}
              onConfidentialityChange={handleConfidentialityChange}
            />


            <BusinessImpactAnalysisWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
            <SecuritySummaryWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          
            <ValueCreationWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          
            <CostEstimationWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          
            <ComplianceStatusWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />


           <ConfidentialityImpactWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />

            <IntegrityImpactWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />

           <AvailabilityImpactWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />

          
            <SecurityVisualizationWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          
            <SecurityResourcesWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          
            <TechnicalDetailsWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
        </div>
      </div>
    </div>
  );
};

export default CIAClassificationApp;
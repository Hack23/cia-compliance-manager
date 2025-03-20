import React, { useCallback, useEffect } from 'react';
import Dashboard, { DashboardWidget } from "./components/dashboard/Dashboard";
import AvailabilityImpactWidget from "./components/widgets/AvailabilityImpactWidget";
import BusinessImpactAnalysisWidget from "./components/widgets/BusinessImpactAnalysisWidget";
import CIAImpactSummaryWidget from "./components/widgets/CIAImpactSummaryWidget";
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
import useLocalStorage from './hooks/useLocalStorage';
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
  // Use localStorage hooks to persist values
  const [availabilityLevel, setAvailabilityLevel] = useLocalStorage<SecurityLevel>('availabilityLevel', 'Moderate');
  const [integrityLevel, setIntegrityLevel] = useLocalStorage<SecurityLevel>('integrityLevel', 'Moderate');
  const [confidentialityLevel, setConfidentiality] = useLocalStorage<SecurityLevel>('confidentialityLevel', 'Moderate');
  
  // Dark mode state
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', 
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  
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
  }, [setAvailabilityLevel]);

  const handleIntegrityChange = useCallback((level: SecurityLevel) => {
    console.log('CIAClassificationApp: Setting integrity level to:', level);
    setIntegrityLevel(level);
  }, [setIntegrityLevel]);

  const handleConfidentialityChange = useCallback((level: SecurityLevel) => {
    console.log('CIAClassificationApp: Setting confidentiality level to:', level);
    setConfidentiality(level);
  }, [setConfidentiality]);

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

  return (
    <div className="app-container">
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} p-4 transition-colors duration-300`}>
        {/* App header with theme toggle */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">CIA Compliance Manager</h1>
          <button 
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        {/* Dashboard with directly rendered widgets - Fix: Pass security level props to Dashboard */}
        <Dashboard
          availability={availabilityLevel}
          integrity={integrityLevel}
          confidentiality={confidentialityLevel}
        >
          {/* Security Level Configuration Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.SECURITY_LEVEL}
            icon={WIDGET_ICONS.SECURITY_LEVEL}
            testId="widget-security-level"
          >
            <SecurityLevelWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
              onAvailabilityChange={handleAvailabilityChange}
              onIntegrityChange={handleIntegrityChange}
              onConfidentialityChange={handleConfidentialityChange}
            />
          </DashboardWidget>
          
          {/* Business Impact Analysis Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.BUSINESS_IMPACT}
            icon={WIDGET_ICONS.BUSINESS_IMPACT}
            testId="widget-business-impact"
          >
            <BusinessImpactAnalysisWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Security Summary Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.SECURITY_SUMMARY}
            icon={WIDGET_ICONS.SECURITY_SUMMARY}
            testId="widget-security-summary"
          >
            <SecuritySummaryWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Value Creation Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.VALUE_CREATION}
            icon={WIDGET_ICONS.VALUE_CREATION}
            testId="widget-value-creation"
          >
            <ValueCreationWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Cost Estimation Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.COST_ESTIMATION}
            icon={WIDGET_ICONS.COST_ESTIMATION}
            testId="widget-cost-estimation"
          >
            <CostEstimationWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Compliance Status Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.COMPLIANCE_STATUS}
            icon={WIDGET_ICONS.COMPLIANCE_STATUS}
            testId="widget-compliance-status"
          >
            <ComplianceStatusWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* CIA Impact Summary Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.CIA_IMPACT_SUMMARY}
            icon={WIDGET_ICONS.CIA_IMPACT_SUMMARY}
            testId="widget-cia-impact-summary"
          >
            <CIAImpactSummaryWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Availability Impact Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.AVAILABILITY_IMPACT}
            icon={WIDGET_ICONS.AVAILABILITY_IMPACT}
            testId="widget-availability-impact"
          >
            <AvailabilityImpactWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Integrity Impact Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.INTEGRITY_IMPACT}
            icon={WIDGET_ICONS.INTEGRITY_IMPACT}
            testId="widget-integrity-impact"
          >
            <IntegrityImpactWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Confidentiality Impact Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.CONFIDENTIALITY_IMPACT}
            icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT}
            testId="widget-confidentiality-impact"
          >
            <ConfidentialityImpactWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Security Visualization Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.SECURITY_VISUALIZATION}
            icon={WIDGET_ICONS.SECURITY_VISUALIZATION}
            testId="widget-security-visualization"
          >
            <SecurityVisualizationWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Security Resources Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.SECURITY_RESOURCES}
            icon={WIDGET_ICONS.SECURITY_RESOURCES}
            testId="widget-security-resources"
          >
            <SecurityResourcesWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
          
          {/* Technical Details Widget */}
          <DashboardWidget 
            title={WIDGET_TITLES.TECHNICAL_DETAILS}
            icon={WIDGET_ICONS.TECHNICAL_DETAILS}
            testId="widget-technical-details"
          >
            <TechnicalDetailsWidget
              availabilityLevel={availabilityLevel}
              integrityLevel={integrityLevel}
              confidentialityLevel={confidentialityLevel}
            />
          </DashboardWidget>
        </Dashboard>
      </div>
    </div>
  );
};

export default CIAClassificationApp;
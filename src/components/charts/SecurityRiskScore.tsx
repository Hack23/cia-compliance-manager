import React from 'react';

interface SecurityRiskScoreProps {
  score: number;
  label: string;
  testId?: string;
}

/**
 * A visualization component for displaying a security risk score
 * 
 * ## Business Perspective
 * 
 * This component provides a visual indicator of a security risk score,
 * helping stakeholders quickly understand their current risk level. 📊
 */
export const SecurityRiskScore: React.FC<SecurityRiskScoreProps> = ({
  score,
  label,
  testId
}) => {
  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-blue-500";
    if (score >= 40) return "text-yellow-500";
    if (score >= 20) return "text-orange-500";
    return "text-red-500";
  };
  
  // Calculate angle for the gauge display
  const angle = (score / 100) * 180;
  
  return (
    <div 
      className="flex flex-col items-center justify-center"
      data-testid={testId}
    >
      <div className={`text-5xl font-bold mb-2 ${getColor()}`}>
        {score}%
      </div>
      <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
    </div>
  );
};

export default SecurityRiskScore;

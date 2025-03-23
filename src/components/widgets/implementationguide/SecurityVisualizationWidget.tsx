import {
  ArcElement,
  Chart,
  ChartConfiguration,
  Legend,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import React, { useEffect, useMemo, useRef } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { CHART_TEST_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";
import { SecurityRiskScore } from "../../charts/SecurityRiskScore";
import WidgetContainer from "../../common/WidgetContainer";

// Register the required chart.js components - fix: add RadialLinearScale and remove LinearScale
Chart.register(
  RadarController,
  ArcElement,
  PointElement,
  RadialLinearScale,
  LineElement,
  Tooltip,
  Legend
);

export interface SecurityVisualizationWidgetProps {
  /**
   * Selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * Selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Security Visualization Widget provides visual representation of security posture
 *
 * ## Business Perspective
 *
 * This widget visualizes the organization's security posture across the CIA triad,
 * helping security professionals and executives identify gaps and balance security
 * investments across confidentiality, integrity, and availability domains. 📊
 */
const SecurityVisualizationWidget: React.FC<
  SecurityVisualizationWidgetProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "security-visualization-widget",
}) => {
  // Reference to the canvas element
  const chartRef = useRef<HTMLCanvasElement>(null);
  // Reference to the Chart instance for cleanup
  const chartInstance = useRef<Chart | null>(null);

  // Get numerical values for security levels
  const availabilityValue = getSecurityLevelValue(availabilityLevel);
  const integrityValue = getSecurityLevelValue(integrityLevel);
  const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

  // Calculate the overall security score (0-100)
  const securityScore = useMemo(() => {
    const totalValue =
      availabilityValue + integrityValue + confidentialityValue;
    const maxPossibleValue = 12; // 3 components x maximum value of 4
    return Math.round((totalValue / maxPossibleValue) * 100);
  }, [availabilityValue, integrityValue, confidentialityValue]);

  // Calculate risk level based on security score
  const riskLevel = useMemo(() => {
    if (securityScore >= 80) return "Low Risk";
    if (securityScore >= 60) return "Moderate Risk";
    if (securityScore >= 40) return "Elevated Risk";
    if (securityScore >= 20) return "High Risk";
    return "Critical Risk";
  }, [securityScore]);

  // Create or update the chart when security levels change - add proper cleanup
  useEffect(() => {
    // Initialize Chart.js - fix: remove registerables which is undefined
    // Instead of Chart.register(...registerables);
    // The registration is already done at the top of the file

    // Handle test environment - this conditional prevents errors in test environment
    if (typeof window !== "undefined" && !window.ResizeObserver) {
      window.ResizeObserver = class MockResizeObserver {
        constructor(callback: ResizeObserverCallback) {}
        observe() {}
        unobserve() {}
        disconnect() {}
      };
    }

    if (!chartRef.current) return;

    // Clean up previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Prepare chart configuration
    const config: ChartConfiguration = {
      type: "radar",
      data: {
        labels: ["Availability", "Integrity", "Confidentiality"],
        datasets: [
          {
            label: "Current Security Levels",
            data: [
              (availabilityValue / 4) * 100,
              (integrityValue / 4) * 100,
              (confidentialityValue / 4) * 100,
            ],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "Target Security",
            data: [75, 75, 75], // Target is "High" level (75%)
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(255, 159, 64, 1)",
            pointBackgroundColor: "rgba(255, 159, 64, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255, 159, 64, 1)",
            borderDash: [5, 5],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          // Fix: Use 'r' property instead of LinearScale
          r: {
            angleLines: {
              display: true,
            },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw as number;
                const securityLevels = [
                  "None",
                  "Low",
                  "Moderate",
                  "High",
                  "Very High",
                ];
                const levelIndex = Math.round((value / 100) * 4);
                return `${context.dataset.label}: ${securityLevels[levelIndex]} (${value}%)`;
              },
            },
          },
        },
      },
    };

    // Create new chart instance
    chartInstance.current = new Chart(ctx, config);

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [availabilityValue, integrityValue, confidentialityValue]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_VISUALIZATION}
      icon={WIDGET_ICONS.SECURITY_VISUALIZATION}
      className={className}
      testId={testId}
    >
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center">
            <SecurityRiskScore
              score={securityScore}
              label={riskLevel}
              testId={`${testId}-risk-score`}
            />

            <div className="mt-4 grid grid-cols-3 w-full text-center">
              <div
                className="text-blue-600 dark:text-blue-400"
                data-testid={CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE}
              >
                <div className="text-sm mb-1">Availability</div>
                <div className="font-medium">{availabilityLevel}</div>
              </div>

              <div
                className="text-green-600 dark:text-green-400"
                data-testid={CHART_TEST_IDS.RADAR_INTEGRITY_VALUE}
              >
                <div className="text-sm mb-1">Integrity</div>
                <div className="font-medium">{integrityLevel}</div>
              </div>

              <div
                className="text-purple-600 dark:text-purple-400"
                data-testid={CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE}
              >
                <div className="text-sm mb-1">Confidentiality</div>
                <div className="font-medium">{confidentialityLevel}</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <div className="h-64 relative">
              <canvas
                ref={chartRef}
                data-testid={CHART_TEST_IDS.RADAR_CHART}
              ></canvas>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3">
            Security Posture Analysis
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p>
              This visualization shows your current security posture across the
              CIA triad (Confidentiality, Integrity, Availability) compared to a
              target "High" security level recommended for most business
              applications.
            </p>
            <p>
              Your overall security score is{" "}
              <span className="font-medium">{securityScore}%</span>, which
              indicates a <span className="font-medium">{riskLevel}</span>{" "}
              posture.
              {securityScore < 60 && (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  {" "}
                  Consider improving the areas with lower scores to enhance your
                  overall security posture.
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Export the component directly without HOC
export default SecurityVisualizationWidget;

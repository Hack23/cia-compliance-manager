import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { CHART_TEST_IDS } from "../../constants/testIds";

// Register Chart.js components at module level (intentional)
// This executes once when the module is first imported, which is the recommended
// approach for Chart.js registration. The check prevents duplicate registration
// in environments where the module might be imported multiple times (e.g., tests).
// Module-level registration is safe because:
// 1. Chart.js registration is global and idempotent
// 2. The overrides check ensures components are only registered once
// 3. Lazy loading of SecurityVisualizationWidget defers this until needed
const isRadarRegistered = Chart.overrides.radar !== undefined;
if (!isRadarRegistered) {
  Chart.register(
    RadarController,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    CategoryScale
  );
}

interface RadarChartProps {
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
  className?: string;
  testId?: string;
}

const RadarChart: React.FC<RadarChartProps> = ({
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  className = "",
  testId = CHART_TEST_IDS.RADAR_CHART,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<"radar", number[], string> | null>(
    null
  );
  // Add state to track render errors for testing
  const [renderError, setRenderError] = useState<string | null>(null);
  // Add state to track dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );

  // Remove unused state or rename to indicate it's unused
  const [_securityLevels] = useState({
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  });

  // Convert security levels to numerical values
  const mapLevelToValue = (level: string): number => {
    switch (level) {
      case "None":
        return 0;
      case "Basic":
      case "Low":
        return 1;
      case "Moderate":
        return 2;
      case "High":
        return 3;
      case "Very High":
        return 4;
      default:
        return 0;
    }
  };

  // Add effect to listen for theme changes
  useEffect(() => {
    // Create a MutationObserver to watch for changes to the document element's class list
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          const newDarkMode =
            document.documentElement.classList.contains("dark");
          // Only update state if the mode actually changed
          if (newDarkMode !== isDarkMode) {
            setIsDarkMode(newDarkMode);
          }
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, { attributes: true });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, [isDarkMode]);

  useEffect(() => {
    if (!chartRef.current) return;

    try {
      // Cleanup previous chart instance
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Add null checking for chart context
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) {
        setRenderError("Could not get canvas context");
        return;
      }

      const availabilityValue = mapLevelToValue(availabilityLevel);
      const integrityValue = mapLevelToValue(integrityLevel);
      const confidentialityValue = mapLevelToValue(confidentialityLevel);

      // Set chart colors based on theme - now using isDarkMode state
      const backgroundColor = isDarkMode
        ? "rgba(0, 204, 102, 0.2)"
        : "rgba(0, 102, 51, 0.2)";
      const borderColor = isDarkMode ? "#00cc66" : "#006633";
      const gridColor = isDarkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)";
      const textColor = isDarkMode ? "#f0f0f0" : "#222222";

      // Create chart
      chartInstanceRef.current = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["Availability", "Integrity", "Confidentiality"],
          datasets: [
            {
              label: "Security Profile",
              data: [availabilityValue, integrityValue, confidentialityValue],
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 2,
              pointBackgroundColor: borderColor,
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: borderColor,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            r: {
              angleLines: {
                color: gridColor,
              },
              grid: {
                color: gridColor,
              },
              pointLabels: {
                color: textColor,
                font: {
                  size: 12,
                },
              },
              min: 0,
              max: 4,
              ticks: {
                backdropColor: "transparent",
                color: textColor,
                z: 100,
                stepSize: 1,
                font: {
                  size: 10,
                },
                callback: function (value) {
                  const levels = [
                    "None",
                    "Basic",
                    "Moderate",
                    "High",
                    "Very High",
                  ];
                  return levels[value as number] || "";
                },
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                color: isDarkMode ? "#00cc66" : "#006633",
                font: {
                  family: "'Share Tech Mono', monospace",
                  size: 12,
                },
                boxWidth: 15,
                boxHeight: 2,
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const levels = [
                    "None",
                    "Basic",
                    "Moderate",
                    "High",
                    "Very High",
                  ];
                  const value = context.raw as number;
                  return `${context.label}: ${levels[value] || ""}`;
                },
              },
            },
          },
        },
      });

      // Handle resize events to ensure the chart remains responsive
      const resizeHandler = () => {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.resize();
        }
      };

      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
    } catch (error) {
      // Improved error handling with proper type checking
      setRenderError(error instanceof Error ? error.message : String(error));
    }
    return undefined; // Add explicit return
  }, [availabilityLevel, integrityLevel, confidentialityLevel, isDarkMode]); // Added isDarkMode as dependency

  // Apply className to container element if provided
  const containerClassName = className
    ? `radar-chart-container ${className}`.trim()
    : "radar-chart-container";

  return (
    <div className={containerClassName} data-testid={`${testId}-container`}>
      {renderError ? (
        <div data-testid={`${testId}-error`} className="error-message">
          Error loading chart: {renderError}
        </div>
      ) : (
        <div className="radar-values flex justify-between mb-2">
          <div>
            <strong>Availability:</strong>{" "}
            <span data-testid={CHART_TEST_IDS.RADAR_AVAILABILITY_VALUE}>
              {availabilityLevel || "None"}
            </span>
          </div>
          <div>
            <strong>Integrity:</strong>{" "}
            <span data-testid={CHART_TEST_IDS.RADAR_INTEGRITY_VALUE}>
              {integrityLevel || "None"}
            </span>
          </div>
          <div>
            <strong>Confidentiality:</strong>{" "}
            <span data-testid={CHART_TEST_IDS.RADAR_CONFIDENTIALITY_VALUE}>
              {confidentialityLevel || "None"}
            </span>
          </div>
        </div>
      )}
      <canvas ref={chartRef} data-testid={testId}></canvas>
    </div>
  );
};

export default RadarChart;

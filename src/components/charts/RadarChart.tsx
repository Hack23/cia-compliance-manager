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

/**
 * Props for the RadarChart component
 */
interface RadarChartProps {
  /** Current availability security level */
  availabilityLevel: string;
  /** Current integrity security level */
  integrityLevel: string;
  /** Current confidentiality security level */
  confidentialityLevel: string;
  /** Additional CSS class names */
  className?: string;
  /** Test ID for automated testing */
  testId?: string;
}

/**
 * Radar chart visualization of the CIA security triad
 *
 * ## Business Perspective
 *
 * Provides an intuitive visual representation of the security posture
 * across all three CIA triad dimensions, enabling at-a-glance assessment
 * of security balance and identifying areas needing improvement. 📊
 *
 * @example
 * ```tsx
 * <RadarChart
 *   availabilityLevel="High"
 *   integrityLevel="Moderate"
 *   confidentialityLevel="Very High"
 * />
 * ```
 */

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
  const [renderError, setRenderError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    document.documentElement.classList.contains("dark")
  );

  const [_securityLevels] = useState({
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  });

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

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          const newDarkMode =
            document.documentElement.classList.contains("dark");
          if (newDarkMode !== isDarkMode) {
            setIsDarkMode(newDarkMode);
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [isDarkMode]);

  useEffect(() => {
    if (!chartRef.current) return;

    try {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) {
        setRenderError("Could not get canvas context");
        return;
      }

      const availabilityValue = mapLevelToValue(availabilityLevel);
      const integrityValue = mapLevelToValue(integrityLevel);
      const confidentialityValue = mapLevelToValue(confidentialityLevel);

      const backgroundColor = isDarkMode
        ? "rgba(0, 204, 102, 0.2)"
        : "rgba(0, 102, 51, 0.2)";
      const borderColor = isDarkMode ? "#00cc66" : "#006633";
      const gridColor = isDarkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)";
      const textColor = isDarkMode ? "#f0f0f0" : "#222222";

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
      setRenderError(error instanceof Error ? error.message : String(error));
    }
    return undefined;
  }, [availabilityLevel, integrityLevel, confidentialityLevel, isDarkMode]);

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

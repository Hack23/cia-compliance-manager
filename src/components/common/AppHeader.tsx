import React from "react";
import { APP_NAME, APP_VERSION } from "../../constants/appConstants";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  testId?: string;
  toggleDarkMode?: () => void;
  darkMode?: boolean;
}

/**
 * Enhanced application header with improved visual design and original links
 */
const AppHeader: React.FC<AppHeaderProps> = ({
  title = APP_NAME,
  subtitle,
  testId = "app-header",
  toggleDarkMode,
  darkMode,
}) => {
  return (
    <header className="app-header" data-testid={testId}>
      <div className="app-header-brand">
        <img
          src="https://hack23.github.io/cia-compliance-manager/icon-192.png"
          alt="CIA Compliance Manager Logo"
          className="app-logo"
          data-testid="app-logo"
        />
        <div className="app-titles">
          <h1 className="app-title">{title}</h1>
          <div
            className="terminal-text text-xs flex items-center flex-wrap"
            style={{ color: "#22c55e" }}
          >
            <span
              className="inline-block mr-1"
              data-testid="app-indicator"
              style={{ color: "#22c55e", fontSize: "8px" }}
            >
              ■
            </span>
            <span
              className="mr-1 text-xxs"
              data-testid="app-version"
              style={{ color: "#22c55e" }}
            >
              v{APP_VERSION}
            </span>
            <span className="mx-1 text-xxs" style={{ color: "#22c55e" }}>
              •
            </span>
            <a
              href="https://github.com/Hack23/cia-compliance-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xxs hover:underline mr-1"
              data-testid="source-link"
              style={{ color: "#22c55e" }}
            >
              Source
            </a>
            <span className="mx-1 text-xxs" style={{ color: "#22c55e" }}>
              •
            </span>
            <a
              href="https://hack23.github.io/cia-compliance-manager/documentation.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xxs hover:underline mr-1"
              data-testid="docs-link"
              style={{ color: "#22c55e" }}
            >
              Doc
            </a>
            <span className="mx-1 text-xxs" style={{ color: "#22c55e" }}>
              •
            </span>
            <a
              href="https://hack23.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xxs hover:underline"
              data-testid="author-link"
              style={{ color: "#22c55e" }}
            >
              Hack23
            </a>
          </div>
        </div>
      </div>

      <div className="app-header-actions">
        {toggleDarkMode && (
          <button
            onClick={toggleDarkMode}
            className="theme-toggle"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;

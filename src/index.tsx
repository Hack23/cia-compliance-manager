import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/**
 * Entry point for the React application.
 * 
 * ## Technical Implementation
 * This file initializes the React application by rendering the `App` component into the root DOM element.
 * 
 * ## Future-Proofing
 * The use of React's `createRoot` method ensures compatibility with future versions of React and enables concurrent mode.
 * 
 * ## Performance
 * The application is wrapped in `React.StrictMode` to help identify potential performance issues and ensure best practices.
 * 
 * ## Maintainability
 * The structure of this file is simple and clear, making it easy to maintain and update as needed.
 * 
 * ## Integration
 * This file integrates the main `App` component with the HTML structure of the application, serving as the bridge between the React code and the DOM.
 */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

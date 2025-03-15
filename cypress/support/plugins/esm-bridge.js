/**
 * ESM Bridge - Helps bridge CommonJS and ESM modules
 * 
 * This module helps load CommonJS modules from ESM contexts
 * by providing a compatibility layer.
 */

/**
 * Load a CommonJS module from an ESM context
 * 
 * @param {string} modulePath Path to the CommonJS module
 * @returns {Promise<any>} The loaded module
 */
export async function loadCommonJSModule(modulePath) {
  try {
    // For Node.js environments where import with URL works
    const moduleURL = new URL(modulePath, import.meta.url).href;
    return await import(moduleURL);
  } catch (err) {
    console.error(`Error loading module ${modulePath}:`, err);
    return null;
  }
}

/**
 * Convert CommonJS tasks to ESM-compatible tasks
 * 
 * @param {Function} setupFn The setup function exported by a CommonJS module
 * @param {object} config The Cypress config object
 * @returns {object} Task object compatible with ESM
 */
export async function getTasksFromCommonJSModule(setupFn, config) {
  // Container for registering tasks
  const tasks = {};
  
  // Mock the 'on' function to capture task registrations
  const mockOn = (eventName, callback) => {
    if (eventName === 'task') {
      // Merge the tasks
      Object.assign(tasks, callback);
    }
  };
  
  // Call the setup function with our mock
  setupFn(mockOn, config);
  
  return tasks;
}

export default {
  loadCommonJSModule,
  getTasksFromCommonJSModule
};

const fs = require('fs');
const path = require('path');
const { junitMerger } = require('../support/plugins/junit-merger');
const PerformanceReporter = require('./performance-reporter');

/**
 * Cypress plugin configuration
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // Create results directory if it doesn't exist
  const resultsDir = path.join(process.cwd(), "cypress", "results");
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
    console.log(`Created results directory: ${resultsDir}`);
  }

  // Performance metrics directory
  const perfDir = path.join(resultsDir, 'performance');
  if (!fs.existsSync(perfDir)) {
    fs.mkdirSync(perfDir, { recursive: true });
  }

  // Initialize the JUnit merger plugin
  junitMerger(on, config);

  // Initialize performance reporter with custom thresholds if provided
  const performanceReporter = new PerformanceReporter({
    reportDir: path.join(process.cwd(), "cypress", "reports", "performance"),
    thresholds: {
      slow: config.env.performanceSlowThreshold || 300,
      critical: config.env.performanceCriticalThreshold || 1000
    }
  });
  
  performanceReporter.register(on);

  // Register tasks - return object to make tasks available
  const tasks = {
    resetJunitResults() {
      // Function implementation from the JUnit merger
      return junitMerger.resetJunitResults
        ? junitMerger.resetJunitResults()
        : null;
    },
    
    writePerformanceReport({ report, reason }) {
      try {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const filename = `perf-${report.testFile.replace(/\//g, '-')}-${timestamp}.json`;
        const filePath = path.join(perfDir, filename);

        const fileContent = JSON.stringify({
          ...report,
          timestamp,
          reason,
        }, null, 2);

        fs.writeFileSync(filePath, fileContent);
        console.log(`Performance report written to ${filePath}`);
        
        return { success: true, filename };
      } catch (error) {
        console.error('Error writing performance report:', error);
        return { success: false, error: error.message };
      }
    },

    // Log performance data for collection
    logPerformance(data) {
      try {
        const timestamp = new Date().toISOString();
        const logFile = path.join(perfDir, 'performance-log.jsonl');
        
        // Append to log file (one line per entry)
        const logEntry = JSON.stringify({ ...data, timestamp }) + '\n';
        fs.appendFileSync(logFile, logEntry);
        return true;
      } catch (error) {
        console.error('Error logging performance data:', error);
        return false;
      }
    },
  
    // List JUnit files for verification
    listJunitFiles() {
      const junitDir = path.join(__dirname, '..', 'results');
      if (!fs.existsSync(junitDir)) return [];
      
      return fs.readdirSync(junitDir)
        .filter(file => file.endsWith('.xml'))
        .map(file => path.join(junitDir, file));
    },
    
    // Reset JUnit results between runs
    resetJunitResults() {
      const junitDir = path.join(__dirname, '..', 'results');
      if (!fs.existsSync(junitDir)) {
        fs.mkdirSync(junitDir, { recursive: true });
        return { created: true };
      }
      
      // Clear existing XML files
      const xmlFiles = fs.readdirSync(junitDir)
        .filter(file => file.endsWith('.xml'));
      
      xmlFiles.forEach(file => {
        fs.unlinkSync(path.join(junitDir, file));
      });
      
      return { cleared: xmlFiles.length };
    },

    // Write file task for general file operations
    writeFile({ path: filePath, content }) {
      try {
        // Ensure directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // Write the file
        fs.writeFileSync(filePath, content);
        return { success: true, filePath };
      } catch (error) {
        console.error(`Error writing file to ${filePath}:`, error);
        return { success: false, error: error.message };
      }
    },

    // Read file task for general file operations
    readFile(filePath) {
      try {
        if (!fs.existsSync(filePath)) {
          return { success: false, error: `File not found: ${filePath}` };
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        return { success: true, content };
      } catch (error) {
        console.error(`Error reading file from ${filePath}:`, error);
        return { success: false, error: error.message };
      }
    },
    
    // List performance reports
    listPerformanceReports() {
      try {
        if (!fs.existsSync(perfDir)) {
          return { success: false, error: 'Performance directory not found', files: [] };
        }
        
        const files = fs.readdirSync(perfDir)
          .filter(file => file.endsWith('.json') && !file.endsWith('performance-log.jsonl'))
          .map(file => path.join(perfDir, file));
          
        return { success: true, files };
      } catch (error) {
        console.error('Error listing performance reports:', error);
        return { success: false, error: error.message, files: [] };
      }
    },

    // Ensure a directory exists
    ensureDir(dirPath) {
      try {
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
          return `Created directory: ${dirPath}`;
        }
        return `Directory already exists: ${dirPath}`;
      } catch (error) {
        console.error(`Error creating directory ${dirPath}:`, error);
        return `Error: ${error.message}`;
      }
    },
    
    // List files matching a glob pattern
    listFiles(pattern) {
      try {
        // If glob is not available, use a simple file listing
        try {
          const glob = require('glob');
          const files = glob.sync(pattern);
          return files;
        } catch (e) {
          // Fallback to simple file listing if glob is not available
          return fs.readdirSync(path.dirname(pattern))
            .filter(file => file.match(path.basename(pattern).replace('*', '.*')))
            .map(file => path.join(path.dirname(pattern), file));
        }
      } catch (error) {
        console.error(`Error listing files with pattern ${pattern}:`, error);
        return [];
      }
    },
    
    // Check if a file contains specific text
    fileContains({ path, text }) {
      try {
        if (!fs.existsSync(path)) {
          return { exists: false, contains: false };
        }
        
        const content = fs.readFileSync(path, 'utf8');
        return { 
          exists: true, 
          contains: content.includes(text),
          path
        };
      } catch (error) {
        console.error(`Error checking file ${path}:`, error);
        return { 
          exists: false, 
          contains: false, 
          error: error.message 
        };
      }
    }
  };

  // Register all tasks
  on('task', tasks);

  // Return the config
  return config;
};

// Add explicit ESM-compatible export
export default module.exports;

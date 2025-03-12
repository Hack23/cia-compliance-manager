const fs = require('fs');
const path = require('path');

/**
 * Performance reporting plugin for Cypress
 * 
 * This plugin handles aggregating performance metrics and generating reports
 */
class PerformanceReporter {
  constructor(options = {}) {
    this.options = {
      reportDir: 'cypress/reports/performance',
      jsonReportPath: 'performance-report.json',
      htmlReportPath: 'performance-dashboard.html',
      thresholds: {
        slow: 300,
        critical: 1000
      },
      ...options
    };
    
    // Ensure directory exists
    if (!fs.existsSync(this.options.reportDir)) {
      fs.mkdirSync(this.options.reportDir, { recursive: true });
    }
    
    this.metrics = [];
    this.reports = [];
  }
  
  /**
   * Register plugin tasks with Cypress
   */
  register(on) {
    // Register tasks for performance metrics
    on('task', {
      // Log individual performance metric
      recordPerformanceMetric: (metric) => {
        this.metrics.push({
          ...metric,
          timestamp: new Date().toISOString()
        });
        return true;
      },
      
      // Save a complete test performance report
      savePerformanceReport: (report) => {
        this.reports.push(report);
        return true;
      },
      
      // Generate the final performance report
      generatePerformanceReport: () => {
        return this.generateReport();
      }
    });
    
    // Register after:run hook to generate report
    on('after:run', () => {
      return this.generateReport();
    });
  }
  
  /**
   * Generate the final performance report
   */
  generateReport() {
    try {
      // Don't generate if no data
      if (this.reports.length === 0 && this.metrics.length === 0) {
        console.log('No performance data collected. Skipping report generation.');
        return { success: false, reason: 'No data' };
      }
      
      // Prepare data for report
      const reportData = {
        timestamp: new Date().toISOString(),
        testReports: this.reports,
        individualMetrics: this.metrics,
        summary: this.generateSummary()
      };
      
      // Save JSON report
      const jsonPath = path.join(this.options.reportDir, this.options.jsonReportPath);
      fs.writeFileSync(jsonPath, JSON.stringify(reportData, null, 2));
      
      // Generate HTML dashboard if we have dashboard generator in Node context
      try {
        const dashboardGenerator = require('../support/performance-dashboard');
        const htmlPath = path.join(this.options.reportDir, this.options.htmlReportPath);
        
        // Generate HTML report
        const html = dashboardGenerator.createPerformanceDashboard(this.reports, {
          title: 'CIA Compliance Manager Performance Report',
          thresholds: this.options.thresholds
        });
        
        fs.writeFileSync(htmlPath, html);
        console.log(`Performance HTML report generated at: ${htmlPath}`);
      } catch (err) {
        console.log('Could not generate HTML dashboard. Dashboard generator not available in Node context.');
        console.log(err);
      }
      
      console.log(`Performance JSON report generated at: ${jsonPath}`);
      return { 
        success: true, 
        reportPath: jsonPath,
        metricsCount: this.metrics.length,
        reportsCount: this.reports.length
      };
    } catch (error) {
      console.error('Error generating performance report:', error);
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Generate summary statistics
   */
  generateSummary() {
    // If no reports, return empty summary
    if (this.reports.length === 0) {
      return {
        testCount: 0,
        totalDuration: 0,
        operationsCount: 0,
        averageDuration: 0,
        slowOperations: 0,
        criticalOperations: 0
      };
    }
    
    // Calculate statistics from reports
    const totalTests = this.reports.length;
    const totalDuration = this.reports.reduce((sum, r) => sum + r.totalDuration, 0);
    const avgDuration = totalDuration / totalTests;
    
    // Get all metrics
    const allMetrics = this.reports.flatMap(r => r.metrics);
    const totalOperations = allMetrics.length;
    
    // Count slow and critical operations
    const slowOps = allMetrics.filter(m => 
      m.duration > this.options.thresholds.slow
    ).length;
    
    const criticalOps = allMetrics.filter(m => 
      m.duration > this.options.thresholds.critical
    ).length;
    
    // Calculate category statistics
    const categories = {};
    allMetrics.forEach(metric => {
      const category = metric.category || 'general';
      if (!categories[category]) {
        categories[category] = {
          count: 0,
          totalDuration: 0,
          slowOps: 0,
          criticalOps: 0
        };
      }
      
      categories[category].count++;
      categories[category].totalDuration += metric.duration;
      
      if (metric.duration > this.options.thresholds.slow) {
        categories[category].slowOps++;
      }
      
      if (metric.duration > this.options.thresholds.critical) {
        categories[category].criticalOps++;
      }
    });
    
    // Calculate averages for each category
    Object.keys(categories).forEach(cat => {
      categories[cat].avgDuration = 
        categories[cat].totalDuration / categories[cat].count;
    });
    
    return {
      testCount: totalTests,
      totalDuration,
      averageDuration: avgDuration,
      operationsCount: totalOperations,
      slowOperations: slowOps,
      criticalOperations: criticalOps,
      categories
    };
  }
}

module.exports = PerformanceReporter;

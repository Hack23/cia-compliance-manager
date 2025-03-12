/**
 * Performance Dashboard Generator
 * 
 * Creates interactive HTML dashboards for visualizing performance metrics
 * collected during test runs.
 */
import { PerformanceMetric, TestPerformanceReport } from './performance-reporter';

/**
 * Dashboard configuration options
 */
export interface DashboardOptions {
  title?: string;
  showWidgetPerformance?: boolean;
  showInteractionPerformance?: boolean;
  showLoadingPerformance?: boolean;
  thresholds?: {
    slow: number;
    critical: number;
  };
  outputPath?: string;
}

/**
 * Default configuration options
 */
const DEFAULT_OPTIONS: DashboardOptions = {
  title: 'CIA Compliance Manager Performance Dashboard',
  showWidgetPerformance: true,
  showInteractionPerformance: true,
  showLoadingPerformance: true,
  thresholds: {
    slow: 300,
    critical: 1000
  },
  outputPath: 'cypress/reports/performance/dashboard.html'
};

/**
 * Creates an HTML performance dashboard from collected metrics
 * 
 * @param reports Array of test performance reports to include
 * @param options Dashboard configuration options
 * @returns HTML string containing the dashboard
 */
export function createPerformanceDashboard(
  reports: TestPerformanceReport[],
  options: DashboardOptions = {}
): string {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const { title } = config;
  
  // Ensure thresholds is always defined by using default if needed
  const thresholds = config.thresholds || DEFAULT_OPTIONS.thresholds!;
  
  // Process and aggregate metrics
  const allMetrics = reports.flatMap(report => report.metrics);
  const testCount = reports.length;
  const totalDuration = reports.reduce((sum, r) => sum + r.totalDuration, 0);
  const avgTestDuration = totalDuration / testCount;
  
  // Group metrics by category
  const categorizedMetrics: Record<string, PerformanceMetric[]> = {};
  allMetrics.forEach(metric => {
    const category = metric.category || 'general';
    if (!categorizedMetrics[category]) {
      categorizedMetrics[category] = [];
    }
    categorizedMetrics[category].push(metric);
  });
  
  // Calculate category statistics
  const categoryStats = Object.entries(categorizedMetrics).map(([category, metrics]) => {
    const totalTime = metrics.reduce((sum, m) => sum + m.duration, 0);
    const avgTime = totalTime / metrics.length;
    const maxTime = Math.max(...metrics.map(m => m.duration));
    const slowOperations = metrics.filter(m => m.duration > thresholds.slow).length;
    const criticalOperations = metrics.filter(m => m.duration > thresholds.critical).length;
    
    return {
      category,
      operationCount: metrics.length,
      totalTime,
      avgTime,
      maxTime,
      slowOperations,
      criticalOperations
    };
  }).sort((a, b) => b.totalTime - a.totalTime);
  
  // Find top slowest operations
  const top10SlowestOps = [...allMetrics]
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 10);
  
  // Widget specific performance if enabled
  const widgetMetrics = config.showWidgetPerformance 
    ? allMetrics.filter(m => m.category === 'widget-rendering' || m.operation.includes('widget'))
    : [];
    
  const widgetData = widgetMetrics.reduce((acc, metric) => {
    // Extract widget name from operation string
    const match = metric.operation.match(/(?:render|widget)-([a-z0-9-]+)/i);
    const widgetName = match ? match[1] : 'unknown';
    
    if (!acc[widgetName]) {
      acc[widgetName] = {
        times: [],
        sum: 0,
        count: 0,
        max: 0
      };
    }
    
    acc[widgetName].times.push(metric.duration);
    acc[widgetName].sum += metric.duration;
    acc[widgetName].count += 1;
    acc[widgetName].max = Math.max(acc[widgetName].max, metric.duration);
    
    return acc;
  }, {} as Record<string, { times: number[], sum: number, count: number, max: number }>);
  
  const widgetStats = Object.entries(widgetData).map(([widget, data]) => ({
    widget,
    avgTime: data.sum / data.count,
    maxTime: data.max,
    measurements: data.count
  })).sort((a, b) => b.avgTime - a.avgTime);
  
  // Generate the HTML dashboard
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    :root {
      --primary-color: #4a6fdc;
      --secondary-color: #6c5ce7;
      --success-color: #26de81;
      --warning-color: #f7b731;
      --danger-color: #fc5c65;
      --light-color: #f5f6fa;
      --dark-color: #2d3436;
      --slow-threshold: ${thresholds.slow}ms;
      --critical-threshold: ${thresholds.critical}ms;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
    }
    
    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    header {
      background-color: var(--primary-color);
      color: white;
      padding: 1rem 2rem;
      margin-bottom: 2rem;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    
    h1 {
      margin: 0;
      font-size: 1.8rem;
    }
    
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .summary-card {
      background-color: white;
      border-radius: 4px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      text-align: center;
    }
    
    .summary-card h3 {
      margin-top: 0;
      font-size: 1rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .summary-card p {
      font-size: 2rem;
      font-weight: 700;
      margin: 0.5rem 0;
      color: var(--primary-color);
    }
    
    .chart-container {
      background-color: white;
      border-radius: 4px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      margin-bottom: 2rem;
    }
    
    .table-container {
      background-color: white;
      border-radius: 4px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.12);
      margin-bottom: 2rem;
      overflow-x: auto;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    table th, table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    table th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    
    .badge {
      display: inline-block;
      padding: 0.25rem 0.5rem;
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .badge-success { background-color: #e3fcef; color: var(--success-color); }
    .badge-warning { background-color: #fef2d0; color: var(--warning-color); }
    .badge-danger { background-color: #ffe5e5; color: var(--danger-color); }
    
    .performance-bar {
      height: 8px;
      background-color: #e9ecef;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }
    
    .performance-bar-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.5s ease;
    }
    
    /* Performance bar colors based on time */
    .performance-bar-good { background-color: var(--success-color); }
    .performance-bar-medium { background-color: var(--warning-color); }
    .performance-bar-poor { background-color: var(--danger-color); }
    
    /* Charts */
    .chart {
      min-height: 300px;
    }
    
    .bar-chart {
      display: flex;
      align-items: flex-end;
      height: 300px;
      margin-top: 1.5rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 1rem;
    }
    
    .bar-chart-bar {
      flex: 1;
      margin: 0 3px;
      background-color: var(--primary-color);
      min-width: 20px;
      position: relative;
      transition: height 0.5s ease;
      border-radius: 2px 2px 0 0;
    }
    
    .bar-chart-bar.slow { background-color: var(--warning-color); }
    .bar-chart-bar.critical { background-color: var(--danger-color); }
    
    .bar-chart-label {
      position: absolute;
      bottom: -24px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 0.7rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transform: rotate(-45deg);
      transform-origin: left;
    }
    
    .bar-chart-value {
      position: absolute;
      top: -20px;
      left: 0;
      right: 0;
      text-align: center;
      font-size: 0.7rem;
      font-weight: 600;
    }
    
    footer {
      text-align: center;
      color: #666;
      font-size: 0.8rem;
      margin-top: 3rem;
    }
  </style>
</head>
<body>
  <div class="dashboard">
    <header>
      <h1>${title}</h1>
      <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
    </header>
    
    <div class="summary">
      <div class="summary-card">
        <h3>Tests Executed</h3>
        <p>${testCount}</p>
      </div>
      <div class="summary-card">
        <h3>Total Duration</h3>
        <p>${(totalDuration / 1000).toFixed(2)}s</p>
      </div>
      <div class="summary-card">
        <h3>Operations Measured</h3>
        <p>${allMetrics.length}</p>
      </div>
      <div class="summary-card">
        <h3>Avg Test Duration</h3>
        <p>${(avgTestDuration / 1000).toFixed(2)}s</p>
      </div>
      <div class="summary-card">
        <h3>Slow Operations</h3>
        <p>${allMetrics.filter(m => m.duration > thresholds.slow).length}</p>
      </div>
    </div>
    
    <div class="chart-container">
      <h2>Performance by Category</h2>
      <div class="bar-chart">
        ${categoryStats.map(stat => {
          const barHeight = stat.totalTime / categoryStats[0].totalTime * 250;
          const barClass = stat.avgTime > thresholds.critical ? 'critical' : 
                          stat.avgTime > thresholds.slow ? 'slow' : '';
          
          return `
            <div class="bar-chart-bar ${barClass}" style="height: ${barHeight}px;">
              <div class="bar-chart-label">${stat.category}</div>
              <div class="bar-chart-value">${(stat.totalTime / 1000).toFixed(1)}s</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    
    <div class="table-container">
      <h2>Category Performance</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Operations</th>
            <th>Total Time</th>
            <th>Avg Time</th>
            <th>Max Time</th>
            <th>Slow Ops</th>
            <th>Critical Ops</th>
          </tr>
        </thead>
        <tbody>
          ${categoryStats.map(stat => {
            const avgClass = stat.avgTime > thresholds.critical ? 'badge-danger' : 
                            stat.avgTime > thresholds.slow ? 'badge-warning' : 'badge-success';
            
            return `
              <tr>
                <td>${stat.category}</td>
                <td>${stat.operationCount}</td>
                <td>${(stat.totalTime / 1000).toFixed(2)}s</td>
                <td><span class="badge ${avgClass}">${stat.avgTime.toFixed(1)}ms</span></td>
                <td>${stat.maxTime.toFixed(1)}ms</td>
                <td>${stat.slowOperations}</td>
                <td>${stat.criticalOperations}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
    
    <div class="table-container">
      <h2>Slowest Operations</h2>
      <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Duration</th>
            <th>Category</th>
            <th>Performance</th>
          </tr>
        </thead>
        <tbody>
          ${top10SlowestOps.map(op => {
            const barClass = op.duration > thresholds.critical ? 'performance-bar-poor' : 
                            op.duration > thresholds.slow ? 'performance-bar-medium' : 'performance-bar-good';
            
            // Calculate percentage based on critical threshold (capped at 100%)
            const percentage = Math.min(op.duration / thresholds.critical * 100, 100);
            
            return `
              <tr>
                <td>${op.operation}</td>
                <td>${op.duration.toFixed(1)}ms</td>
                <td>${op.category || 'general'}</td>
                <td>
                  <div class="performance-bar">
                    <div class="performance-bar-fill ${barClass}" style="width: ${percentage}%"></div>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
    
    ${config.showWidgetPerformance && widgetStats.length > 0 ? `
    <div class="chart-container">
      <h2>Widget Performance</h2>
      <div class="bar-chart">
        ${widgetStats.map(stat => {
          const maxWidgetTime = widgetStats[0].avgTime;
          const barHeight = (stat.avgTime / maxWidgetTime) * 250;
          const barClass = stat.avgTime > thresholds.critical ? 'critical' : 
                          stat.avgTime > thresholds.slow ? 'slow' : '';
          
          return `
            <div class="bar-chart-bar ${barClass}" style="height: ${barHeight}px;">
              <div class="bar-chart-label">${stat.widget}</div>
              <div class="bar-chart-value">${stat.avgTime.toFixed(1)}ms</div>
            </div>
          `;
        }).join('')}
      </div>
      <table style="margin-top: 2rem;">
        <thead>
          <tr>
            <th>Widget</th>
            <th>Avg Render Time</th>
            <th>Max Time</th>
            <th>Measurements</th>
            <th>Performance</th>
          </tr>
        </thead>
        <tbody>
          ${widgetStats.map(stat => {
            const barClass = stat.avgTime > thresholds.critical ? 'performance-bar-poor' : 
                            stat.avgTime > thresholds.slow ? 'performance-bar-medium' : 'performance-bar-good';
            
            // Calculate percentage based on critical threshold (capped at 100%)
            const percentage = Math.min(stat.avgTime / thresholds.critical * 100, 100);
            
            return `
              <tr>
                <td>${stat.widget}</td>
                <td>${stat.avgTime.toFixed(1)}ms</td>
                <td>${stat.maxTime.toFixed(1)}ms</td>
                <td>${stat.measurements}</td>
                <td>
                  <div class="performance-bar">
                    <div class="performance-bar-fill ${barClass}" style="width: ${percentage}%"></div>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
    ` : ''}
    
    <footer>
      <p>CIA Compliance Manager Performance Report | Generated with Cypress Performance Testing Framework</p>
    </footer>
  </div>
</body>
</html>
`;

  return html;
}

/**
 * Saves performance dashboard to a file
 * 
 * @param reports Test performance reports
 * @param options Dashboard options
 * @returns Promise that resolves when file is written
 */
export function savePerformanceDashboard(
  reports: TestPerformanceReport[],
  options: DashboardOptions = {}
): Promise<void> {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const html = createPerformanceDashboard(reports, config);
  
  // Ensure outputPath is always defined
  const outputPath = config.outputPath || DEFAULT_OPTIONS.outputPath;
  
  // In Cypress context, use task to write file
  if (typeof cy !== 'undefined') {
    return new Promise<void>((resolve, reject) => {
      cy.task('writeFile', {
        path: outputPath,
        content: html
      }).then(() => {
        resolve();
      });
    });
  }
  
  // In Node.js context, import fs and write directly
  return import('fs').then(fs => {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(outputPath!, html, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

export default {
  createPerformanceDashboard,
  savePerformanceDashboard
};

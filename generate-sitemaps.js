#!/usr/bin/env node

/**
 * Sitemap Generator for CIA Compliance Manager
 * Generates both sitemap.xml and sitemap.html from docs directory
 * For SEO optimization on ciacompliancemanager.com
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://ciacompliancemanager.com';
const DOCS_DIR = path.join(__dirname, 'docs');
const CURRENT_DATE = new Date().toISOString().split('T')[0];

// Priority and change frequency configuration
const CONFIG = {
  // Main pages - highest priority
  main: { priority: 1.0, changefreq: 'daily' },
  // API documentation
  api: { priority: 0.8, changefreq: 'weekly' },
  // Test results and coverage
  tests: { priority: 0.6, changefreq: 'weekly' },
  // Architecture documentation
  architecture: { priority: 0.7, changefreq: 'weekly' },
  // Markdown documentation
  markdown: { priority: 0.7, changefreq: 'weekly' },
  // Assets and resources
  assets: { priority: 0.4, changefreq: 'monthly' },
  // Default for other files
  default: { priority: 0.5, changefreq: 'monthly' },
};

// Category mapping based on file paths
const CATEGORIES = {
  'Main Pages': { pattern: /^\.\/(index|documentation|business-continuity|offline)\.html$/, config: CONFIG.main },
  'API Documentation': { pattern: /^\.\/api\//, config: CONFIG.api },
  'Test Coverage': { pattern: /^\.\/coverage\//, config: CONFIG.tests },
  'Test Results': { pattern: /^\.\/test-results\//, config: CONFIG.tests },
  'E2E Test Reports': { pattern: /^\.\/cypress\//, config: CONFIG.tests },
  'Architecture': { pattern: /^\.\/architecture\//, config: CONFIG.architecture },
  'Markdown Documentation': { pattern: /^\.\/markdown\//, config: CONFIG.markdown },
  'Dependencies': { pattern: /^\.\/dependencies\//, config: CONFIG.assets },
  'Diagrams': { pattern: /^\.\/diagrams\//, config: CONFIG.architecture },
};

// Files to exclude from sitemap
const EXCLUDE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /\.(json|txt|css|js|map|ico|svg|png|jpg|jpeg|gif|webp|mp3|wav|ogg)$/i,
  /^\.\/assets\//,  // Exclude asset files
  /^\.\/icons\//,   // Exclude icons
  /\/assets\//,     // Exclude assets in subdirectories
];

/**
 * Recursively find all files in a directory
 */
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    
    // Read file stats to check file type and handle potential errors
    let stat;
    try {
      stat = fs.lstatSync(filePath);
    } catch (error) {
      console.warn(`⚠️  Unable to read file stats: ${filePath}`);
      return;
    }

    // Skip symbolic links to avoid potential circular references
    if (stat.isSymbolicLink()) {
      return;
    }

    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (stat.isFile()) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Get relative path from docs directory
 */
function getRelativePath(filePath) {
  return './' + path.relative(DOCS_DIR, filePath).replace(/\\/g, '/');
}

/**
 * Check if file should be included
 */
function shouldInclude(relativePath) {
  // Must be HTML file
  if (!/\.html$/i.test(relativePath)) {
    return false;
  }

  // Check exclude patterns
  for (const pattern of EXCLUDE_PATTERNS) {
    if (pattern.test(relativePath)) {
      return false;
    }
  }

  return true;
}

/**
 * Get category and config for a file
 */
function getCategoryConfig(relativePath) {
  for (const [category, { pattern, config }] of Object.entries(CATEGORIES)) {
    if (pattern.test(relativePath)) {
      return { category, config };
    }
  }
  return { category: 'Other', config: CONFIG.default };
}

/**
 * Convert relative path to URL
 */
function pathToURL(relativePath) {
  // Remove leading ./
  let urlPath = relativePath.replace(/^\.\//, '');
  
  // Normalize Windows-style path separators to URL-style
  urlPath = urlPath.replace(/\\/g, '/');
  
  // For index.html at root, use root URL
  if (urlPath === 'index.html') {
    return BASE_URL;
  }

  // Use encodeURI for proper URL encoding that preserves path structure
  const encodedPath = encodeURI(urlPath);
  
  return `${BASE_URL}/${encodedPath}`;
}

/**
 * Escape special XML characters
 */
function escapeXML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Escape special HTML characters
 */
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate sitemap.xml
 */
function generateSitemapXML(entries) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Group by category for organized output
  const grouped = {};
  entries.forEach(entry => {
    if (!grouped[entry.category]) {
      grouped[entry.category] = [];
    }
    grouped[entry.category].push(entry);
  });

  // Sort categories by importance
  const categoryOrder = [
    'Main Pages',
    'API Documentation',
    'Architecture',
    'Markdown Documentation',
    'Test Coverage',
    'Test Results',
    'E2E Test Reports',
    'Diagrams',
    'Dependencies',
    'Other',
  ];

  categoryOrder.forEach(category => {
    if (grouped[category]) {
      xml += `\n  <!-- ${category} -->\n`;
      
      // Sort entries within category by URL
      grouped[category].sort((a, b) => a.url.localeCompare(b.url));
      
      grouped[category].forEach(entry => {
        xml += '  <url>\n';
        xml += `    <loc>${escapeXML(entry.url)}</loc>\n`;
        xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
        xml += `    <priority>${entry.priority}</priority>\n`;
        xml += '  </url>\n';
      });
    }
  });

  xml += '\n</urlset>\n';
  return xml;
}

/**
 * Generate sitemap.html
 */
function generateSitemapHTML(entries) {
  // Group by category
  const grouped = {};
  entries.forEach(entry => {
    if (!grouped[entry.category]) {
      grouped[entry.category] = [];
    }
    grouped[entry.category].push(entry);
  });

  // Sort categories
  const categoryOrder = [
    'Main Pages',
    'API Documentation',
    'Architecture',
    'Markdown Documentation',
    'Test Coverage',
    'Test Results',
    'E2E Test Reports',
    'Diagrams',
    'Dependencies',
    'Other',
  ];

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sitemap - CIA Compliance Manager</title>
  <meta name="description" content="Complete sitemap for CIA Compliance Manager - Enterprise-grade Compliance Assessment Platform">
  <meta name="keywords" content="CIA Compliance Manager, sitemap, documentation, API, security, compliance, NIST, ISO 27001">
  <link rel="canonical" href="https://ciacompliancemanager.com/sitemap.html">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --primary-blue: #0066cc;
      --secondary-blue: #4a90e2;
      --accent-teal: #00bcd4;
      --bg-dark: #0f172a;
      --bg-medium: #1e293b;
      --bg-light: #334155;
      --text-primary: #ffffff;
      --text-secondary: #cbd5e1;
      --border-color: #475569;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-medium) 100%);
      color: var(--text-primary);
      line-height: 1.6;
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    header {
      text-align: center;
      margin-bottom: 60px;
      padding: 40px 20px;
      background: var(--bg-medium);
      border: 2px solid var(--primary-blue);
      border-radius: 12px;
      box-shadow: 0 0 30px rgba(0, 102, 204, 0.3);
    }

    h1 {
      font-size: 3rem;
      color: var(--primary-blue);
      text-shadow: 0 0 20px rgba(0, 102, 204, 0.5);
      margin-bottom: 10px;
      font-weight: 700;
    }

    .subtitle {
      font-size: 1.5rem;
      color: var(--accent-teal);
      margin-bottom: 20px;
    }

    .description {
      color: var(--text-secondary);
      font-size: 1.1rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-top: 30px;
      flex-wrap: wrap;
    }

    .stat {
      background: var(--bg-light);
      padding: 15px 30px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
    }

    .stat-value {
      font-size: 2rem;
      color: var(--accent-teal);
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.9rem;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .category {
      margin-bottom: 50px;
    }

    .category-header {
      background: var(--bg-medium);
      padding: 20px 30px;
      border-left: 4px solid var(--primary-blue);
      border-radius: 8px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .category-header:hover {
      background: var(--bg-light);
      box-shadow: 0 0 20px rgba(0, 102, 204, 0.2);
    }

    .category-title {
      font-size: 1.5rem;
      color: var(--primary-blue);
      font-weight: 600;
    }

    .category-count {
      background: var(--primary-blue);
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .category-links {
      list-style: none;
      padding-left: 30px;
    }

    .category-links.collapsed {
      display: none;
    }

    .category-links li {
      padding: 12px 20px;
      background: var(--bg-light);
      margin-bottom: 8px;
      border-radius: 6px;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .category-links li:hover {
      background: var(--bg-medium);
      border-left-color: var(--accent-teal);
      transform: translateX(5px);
    }

    .category-links a {
      color: var(--text-primary);
      text-decoration: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .category-links a:hover {
      color: var(--accent-teal);
    }

    .link-url {
      flex: 1;
      word-break: break-all;
    }

    .link-meta {
      display: flex;
      gap: 15px;
      margin-left: 20px;
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .priority {
      background: var(--bg-dark);
      padding: 3px 10px;
      border-radius: 4px;
    }

    .changefreq {
      background: var(--bg-dark);
      padding: 3px 10px;
      border-radius: 4px;
    }

    footer {
      text-align: center;
      margin-top: 80px;
      padding: 30px;
      border-top: 2px solid var(--border-color);
      color: var(--text-secondary);
    }

    .toggle-all {
      text-align: center;
      margin-bottom: 30px;
    }

    .toggle-all button {
      background: var(--primary-blue);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .toggle-all button:hover {
      background: var(--secondary-blue);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 102, 204, 0.4);
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 1.2rem;
      }

      .stats {
        flex-direction: column;
        gap: 20px;
      }

      .link-meta {
        flex-direction: column;
        gap: 5px;
      }

      .category-header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>🔐 CIA Compliance Manager</h1>
      <div class="subtitle">Site Map</div>
      <p class="description">
        Enterprise-grade Compliance Assessment Platform - Complete documentation and resources
      </p>
      <div class="stats">
        <div class="stat">
          <div class="stat-value">${entries.length}</div>
          <div class="stat-label">Total Pages</div>
        </div>
        <div class="stat">
          <div class="stat-value">${Object.keys(grouped).length}</div>
          <div class="stat-label">Categories</div>
        </div>
        <div class="stat">
          <div class="stat-value">${CURRENT_DATE}</div>
          <div class="stat-label">Last Updated</div>
        </div>
      </div>
    </header>

    <div class="toggle-all">
      <button onclick="toggleAll()">Toggle All Categories</button>
    </div>

    <main>
`;

  categoryOrder.forEach(category => {
    if (grouped[category]) {
      const categoryEntries = grouped[category].sort((a, b) => a.url.localeCompare(b.url));
      
      html += `
      <section class="category">
        <div class="category-header" onclick="toggleCategory(this)">
          <h2 class="category-title">${escapeHTML(category)}</h2>
          <span class="category-count">${categoryEntries.length} pages</span>
        </div>
        <ul class="category-links">
`;

      categoryEntries.forEach(entry => {
        html += `
          <li>
            <a href="${escapeHTML(entry.url)}" target="_blank" rel="noopener noreferrer">
              <span class="link-url">${escapeHTML(entry.url)}</span>
              <span class="link-meta">
                <span class="priority">Priority: ${entry.priority}</span>
                <span class="changefreq">${entry.changefreq}</span>
              </span>
            </a>
          </li>
`;
      });

      html += `
        </ul>
      </section>
`;
    }
  });

  html += `
    </main>

    <footer>
      <p>Generated on ${CURRENT_DATE}</p>
      <p>CIA Compliance Manager &copy; ${CURRENT_DATE.split('-')[0]} Hack23 AB</p>
      <p><a href="${BASE_URL}" style="color: var(--accent-teal);">Return to Home</a></p>
    </footer>
  </div>

  <script>
    function toggleCategory(header) {
      const links = header.nextElementSibling;
      links.classList.toggle('collapsed');
    }

    function toggleAll() {
      const allLinks = document.querySelectorAll('.category-links');
      const anyCollapsed = Array.from(allLinks).some(links => links.classList.contains('collapsed'));
      
      allLinks.forEach(links => {
        if (anyCollapsed) {
          links.classList.remove('collapsed');
        } else {
          links.classList.add('collapsed');
        }
      });
    }
  </script>
</body>
</html>
`;

  return html;
}

/**
 * Main function
 */
function main() {
  console.log('🗺️  Generating sitemaps for CIA Compliance Manager...\n');

  // Check if docs directory exists
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`❌ Error: docs directory not found at ${DOCS_DIR}`);
    process.exit(1);
  }

  // Find all files
  console.log('📁 Scanning docs directory...');
  const allFiles = findFiles(DOCS_DIR);
  console.log(`   Found ${allFiles.length} total files`);

  // Process files
  const entries = [];
  allFiles.forEach(filePath => {
    const relativePath = getRelativePath(filePath);
    
    if (!shouldInclude(relativePath)) {
      return;
    }

    const { category, config } = getCategoryConfig(relativePath);
    const url = pathToURL(relativePath);

    entries.push({
      url,
      lastmod: CURRENT_DATE,
      changefreq: config.changefreq,
      priority: config.priority,
      category,
    });
  });

  console.log(`✅ Processed ${entries.length} HTML pages\n`);

  // Generate sitemap.xml
  console.log('📄 Generating sitemap.xml...');
  const sitemapXML = generateSitemapXML(entries);
  const xmlPath = path.join(DOCS_DIR, 'sitemap.xml');
  fs.writeFileSync(xmlPath, sitemapXML, 'utf8');
  console.log(`   ✅ Created ${xmlPath}`);

  // Generate sitemap.html
  console.log('📄 Generating sitemap.html...');
  const sitemapHTML = generateSitemapHTML(entries);
  const htmlPath = path.join(DOCS_DIR, 'sitemap.html');
  fs.writeFileSync(htmlPath, sitemapHTML, 'utf8');
  console.log(`   ✅ Created ${htmlPath}`);

  // Print summary by category
  console.log('\n📊 Summary by Category:');
  const categoryCounts = {};
  entries.forEach(entry => {
    categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1;
  });

  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count} pages`);
    });

  console.log('\n✨ Sitemap generation complete!');
  console.log(`📍 XML Sitemap: ${BASE_URL}/sitemap.xml`);
  console.log(`📍 HTML Sitemap: ${BASE_URL}/sitemap.html`);
}

// Run the script
main();

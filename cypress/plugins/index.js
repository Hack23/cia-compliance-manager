const fs = require("fs");
const path = require("path");

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Add custom tasks
  on("task", {
    // Task to write a file to the file system
    writeFile({ path: filePath, content }) {
      // Create directories if they don't exist
      const dirname = path.dirname(filePath);
      if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
      }

      // Write the file
      fs.writeFileSync(filePath, content);

      // Return true to signal success
      return true;
    },
  });

  return config;
};

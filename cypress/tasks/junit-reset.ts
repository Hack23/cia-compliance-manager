import fs from "fs-extra";
import path from "path";

/**
 * Legacy function maintained for backward compatibility
 * The new junit-reporter.ts handles this functionality now
 */
export const resetJunitResults = async () => {
  console.log(
    "Using legacy resetJunitResults - consider using cleanJunitReports from junit-reporter instead"
  );

  const junitReportDir = "cypress/results";
  try {
    // Ensure directory exists
    await fs.ensureDir(junitReportDir);

    // Look for any junit XML files
    const xmlFiles = fs
      .readdirSync(junitReportDir)
      .filter((file) => file.endsWith(".xml"))
      .map((file) => path.join(junitReportDir, file));

    if (xmlFiles.length > 0) {
      // Create a timestamped backup directory
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupDir = path.join(junitReportDir, `backup`);
      await fs.ensureDir(backupDir);

      // Move files to backup
      for (const file of xmlFiles) {
        const fileName = path.basename(file);
        await fs.copy(file, path.join(backupDir, fileName));
        await fs.unlink(file);
      }
    }

    return null;
  } catch (err) {
    console.error(`Failed to reset JUnit results: ${err}`);
    throw err;
  }
};

export default resetJunitResults;

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

    return null;
  } catch (err) {
    console.error(`Failed to reset JUnit results: ${err}`);
    throw err;
  }
};

export default resetJunitResults;

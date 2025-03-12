import * as fs from "fs";
import * as path from "path";

const RESULTS_DIR = path.join(process.cwd(), "cypress", "results");
const FINAL_JUNIT_PATH = path.join(RESULTS_DIR, "junit.xml");
const TEMP_RESULTS_PATH = path.join(RESULTS_DIR, "temp-results.json");

// Initialize accumulated results if they don't exist
const initialResults = {
  testsuites: {
    name: "Cypress Tests",
    time: 0,
    tests: 0,
    failures: 0,
    testsuites: [],
  },
};

/**
 * Reset JUnit results files and directories
 */
export function resetJunitResults(): null {
  try {
    // Ensure results directory exists
    if (!fs.existsSync(RESULTS_DIR)) {
      fs.mkdirSync(RESULTS_DIR, { recursive: true });
      console.log(`Created results directory: ${RESULTS_DIR}`);
    }

    // Reset temp results file
    if (fs.existsSync(TEMP_RESULTS_PATH)) {
      fs.unlinkSync(TEMP_RESULTS_PATH);
    }
    fs.writeFileSync(TEMP_RESULTS_PATH, JSON.stringify(initialResults));
    console.log(`Reset JUnit temp results: ${TEMP_RESULTS_PATH}`);

    // Reset main junit file
    if (fs.existsSync(FINAL_JUNIT_PATH)) {
      fs.unlinkSync(FINAL_JUNIT_PATH);
      console.log(`Removed old JUnit file: ${FINAL_JUNIT_PATH}`);
    }

    return null;
  } catch (error) {
    console.error("Error in resetJunitResults:", error);
    return null;
  }
}

export default resetJunitResults;

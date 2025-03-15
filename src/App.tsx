import "./App.css"; // Keep the import to avoid build errors
import CIAClassificationApp from "./CIAClassificationApp";
import { APP_TEST_IDS } from "./constants/testIds";

/**
 * Main App component
 * Acts as a simple wrapper around CIAClassificationApp to maintain backward compatibility
 */
function App() {
  return (
    <div className="app-root" data-testid={APP_TEST_IDS.APP_ROOT}>
      <div data-testid={APP_TEST_IDS.CIA_CLASSIFICATION_APP}>
        <CIAClassificationApp />
      </div>
    </div>
  );
}

export default App;

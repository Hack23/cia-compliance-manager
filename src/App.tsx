import "./App.css"; // Keep the import to avoid build errors
import CIAClassificationApp from "./application/CIAClassificationApp";
import { APP_TEST_IDS } from "./constants/testIds";

/**
 * Main App component
 * 
 * ## Business Perspective
 * 
 * ### Purpose
 * The `App` component serves as the main entry point of the application, ensuring backward compatibility by wrapping the `CIAClassificationApp` component. 🛡️
 * 
 * ### User Experience
 * By maintaining backward compatibility, the `App` component ensures a seamless user experience, reducing the need for retraining or adjustments for existing users. 🌟
 * 
 * ### Business Continuity
 * The `App` component's role in maintaining backward compatibility helps in minimizing disruptions during updates or migrations, ensuring business continuity. 🔄
 * 
 * ### Scalability
 * The `App` component's simple structure allows for easy scalability and future enhancements without affecting the core functionality. 📈
 * 
 * ### Security
 * By acting as a wrapper, the `App` component ensures that the security measures implemented in the `CIAClassificationApp` are consistently applied across the application. 🔒
 */
function App() {
  return (
    <div className="app-container" data-testid={APP_TEST_IDS.APP_CONTAINER}>
      <CIAClassificationApp />
    </div>
  );
}

export default App;

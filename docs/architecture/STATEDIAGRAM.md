# 🔄 CIA Compliance Manager State Diagrams

> **Version:** v1.0 | **Last Updated:** 2025-11-22 | **Status:** Production

This document illustrates the comprehensive state transitions and behavioral models of the CIA Compliance Manager application v1.0, showing how the system responds to user interactions, handles errors, and manages state across React 19.x components.

## 📚 Related Documentation

<div class="documentation-map">

| Document                                          | Focus           | Description                               |
| ------------------------------------------------- | --------------- | ----------------------------------------- |
| **[Architecture](ARCHITECTURE.md)**               | 🏗️ Architecture | C4 model showing system structure         |
| **[Process Flowcharts](FLOWCHART.md)**            | 🔄 Process      | Security assessment workflows             |
| **[System Architecture](SYSTEM_ARCHITECTURE.md)** | 🏛️ System       | Layered architecture and component details |
| **[Widget Analysis](WIDGET_ANALYSIS.md)**         | 🧩 Components   | Detailed widget component analysis        |
| **[Error Handling](../ERROR_HANDLING.md)**        | 🛡️ Errors       | Error handling patterns and components    |

</div>

## 🎯 State Management Overview

The CIA Compliance Manager implements a comprehensive state management architecture using:

- **React 19.x State Hooks**: `useState`, `useCallback`, `useEffect` for component-level state
- **Custom Hooks**: `useSecurityLevelState`, `useLocalStorage` for cross-cutting concerns
- **Error Boundaries**: React class components with `componentDidCatch` for error recovery
- **Suspense Boundaries**: React 19.x Suspense for lazy-loaded components
- **LocalStorage Persistence**: State persistence across browser sessions

### State Flow Architecture

```mermaid
graph LR
    A[User Action] --> B[Component State]
    B --> C[Custom Hook]
    C --> D[Service Layer]
    D --> E[Data Provider]
    E --> F[Local Storage]
    F --> E
    E --> D
    D --> C
    C --> B
    B --> G[UI Render]
    
    B -.Error.-> H[Error Boundary]
    H --> I[Error UI]
    I -.Retry.-> B
    
    style A fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    style B fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    style H fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    style I fill:#e67e22,stroke:#d35400,stroke-width:2px,color:white
```

## 🔍 Application Core States

The diagram below shows the main application states and transitions in v1.0, including error recovery paths:

```mermaid
stateDiagram-v2
    [*] --> Initializing
    
    state Initializing {
        [*] --> LoadingConfigurations
        LoadingConfigurations --> LoadingServices
        LoadingServices --> InitializingUI
        InitializingUI --> CheckingLocalStorage
        CheckingLocalStorage --> [*]
    }
    
    Initializing --> Ready: Initialization Complete
    Initializing --> InitializationError: Init Failed
    
    state InitializationError {
        [*] --> DisplayingError
        DisplayingError --> RetryingInit: User Retries
        DisplayingError --> FallbackMode: Use Defaults
    }
    
    RetryingInit --> Initializing
    FallbackMode --> Ready
    
    state Ready {
        [*] --> DefaultSecurityLevels
        DefaultSecurityLevels --> CustomSecurityLevels: User Adjusts Levels
        CustomSecurityLevels --> PersistingLevels: Auto-save
        PersistingLevels --> CustomSecurityLevels
    }
    
    Ready --> Assessing: User Triggers Assessment
    Ready --> Offline: Network Lost
    
    state Offline {
        [*] --> DisplayingOfflineMode
        DisplayingOfflineMode --> UsingCachedData
        UsingCachedData --> WaitingForConnection
    }
    
    Offline --> Ready: Connection Restored
    
    state Assessing {
        [*] --> CalculatingSecurityScore
        CalculatingSecurityScore --> EvaluatingBusinessImpact
        EvaluatingBusinessImpact --> MappingToCompliance
        MappingToCompliance --> GeneratingRecommendations
        GeneratingRecommendations --> [*]
    }
    
    Assessing --> Reviewing: Assessment Complete
    Assessing --> AssessmentError: Calculation Failed
    
    state AssessmentError {
        [*] --> DisplayingAssessmentError
        DisplayingAssessmentError --> RetryingAssessment: User Retries
    }
    
    RetryingAssessment --> Assessing
    AssessmentError --> Ready: Cancel
    
    state Reviewing {
        [*] --> ViewingResults
        ViewingResults --> ExploringDetails: User Explores Specific Areas
        ExploringDetails --> ViewingResults: Return to Overview
        ViewingResults --> ComparingScenarios: Compare Options
        ComparingScenarios --> ViewingResults
    }
    
    Reviewing --> Ready: User Adjusts Security Levels
    Reviewing --> Exporting: User Exports Results
    
    state Exporting {
        [*] --> PreparingExport
        PreparingExport --> GeneratingDocument
        GeneratingDocument --> [*]
    }
    
    Exporting --> Reviewing: Export Complete
    Exporting --> ExportError: Export Failed
    
    state ExportError {
        [*] --> DisplayingExportError
        DisplayingExportError --> RetryingExport: User Retries
    }
    
    RetryingExport --> Exporting
    ExportError --> Reviewing: Cancel
    
    classDef initial fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef process fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef review fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    classDef export fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    classDef error fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef offline fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:white
    
    class Initializing initial
    class Ready,Assessing process
    class Reviewing review
    class Exporting export
    class InitializationError,AssessmentError,ExportError error
    class Offline offline
```

**State Transition Triggers:**
- `Initialization Complete`: All services loaded, UI rendered
- `Init Failed`: Error during app startup (configuration, service initialization)
- `Network Lost`: Browser offline event detected
- `Connection Restored`: Browser online event detected
- `Calculation Failed`: Error in security score computation or business impact analysis
- `Export Failed`: Error generating or downloading export document

**Guard Conditions:**
- `CheckingLocalStorage`: Verifies localStorage availability and validity
- `PersistingLevels`: Only persists if localStorage is available
- `UsingCachedData`: Only if cached data exists and is valid

## 🎛️ SecurityLevelState Hook State Management

State diagram for centralized security level state using `useSecurityLevelState` custom hook:

```mermaid
stateDiagram-v2
    [*] --> Initializing: Hook Called
    
    state Initializing {
        [*] --> ApplyingInitialLevels
        ApplyingInitialLevels --> [*]
    }
    
    Initializing --> Ready: State Initialized
    
    state Ready {
        [*] --> Idle
        Idle --> UpdatingAvailability: setLevel('availability', level)
        Idle --> UpdatingIntegrity: setLevel('integrity', level)
        Idle --> UpdatingConfidentiality: setLevel('confidentiality', level)
        Idle --> ResettingAll: resetLevels(level)
        
        UpdatingAvailability --> Idle
        UpdatingIntegrity --> Idle
        UpdatingConfidentiality --> Idle
        ResettingAll --> Idle
    }
    
    Ready --> Unmounting: Component Unmounted
    
    state Unmounting {
        [*] --> CleaningUp
        CleaningUp --> [*]
    }
    
    Unmounting --> [*]
    
    classDef init fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef ready fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef update fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef unmount fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    
    class Initializing,ApplyingInitialLevels init
    class Ready,Idle ready
    class UpdatingAvailability,UpdatingIntegrity,UpdatingConfidentiality update
    class Unmounting unmount
```

**Hook API:**
```typescript
interface UseSecurityLevelStateReturn {
  levels: SecurityLevelState;        // Current levels
  setLevel: (component: CIAComponent, level: SecurityLevel) => void;  // Update single level
  resetLevels: (defaultLevel?: SecurityLevel) => void;  // Reset all levels
  getLevel: (component: CIAComponent) => SecurityLevel; // Get single level
}
```

> **Note:** The `useSecurityLevelState` hook manages in-memory state only. It does **not** persist to localStorage or handle cross-tab synchronization.

**State Update Flow:**
```
User Action → setLevel() → useState update → React re-render
```

**Application-Level Persistence & Sync:**

LocalStorage persistence and cross-tab synchronization are handled by the `useLocalStorage` hook at the application/component level (e.g., in `CIAClassificationApp.tsx`):

- LocalStorage persistence via `useLocalStorage` hook
- Browser `storage` event for cross-tab sync
- External changes validated before applying
- Infinite update loops prevented with event filtering

**Usage Example:**
```tsx
// In CIAClassificationApp.tsx (application level)
const [savedLevels, setSavedLevels] = useLocalStorage('securityLevels', defaultLevels);

// Initialize security level state with saved values
const { levels, setLevel } = useSecurityLevelState(savedLevels);

// Persist security levels to localStorage whenever they change
useEffect(() => {
  setSavedLevels(levels);
}, [levels, setSavedLevels]);

// Update single level (in-memory only)
setLevel('availability', 'Very High');

// useEffect above automatically persists to localStorage
```

## 🧩 Widget Component State Machine (v1.0)

Universal widget state machine showing standardized lifecycle for all assessment widgets:

```mermaid
stateDiagram-v2
    [*] --> Idle: Widget Mounted
    
    state Idle {
        [*] --> AwaitingInput
        AwaitingInput --> ValidatingProps: Props Received
        ValidatingProps --> AwaitingInput: Props Invalid
    }
    
    Idle --> Loading: Security Levels Changed
    Idle --> Loading: Initial Data Fetch
    
    state Loading {
        [*] --> InitiatingFetch
        InitiatingFetch --> FetchingData
        FetchingData --> ProcessingData
        ProcessingData --> ValidatingData
        ValidatingData --> RenderingResults
        RenderingResults --> [*]
    }
    
    Loading --> DisplayingResults: Data Loaded Successfully
    Loading --> Error: Data Fetch Failed
    Loading --> Error: Data Validation Failed
    Loading --> Error: Rendering Error
    
    state DisplayingResults {
        [*] --> ShowingPrimaryView
        ShowingPrimaryView --> ShowingDetailedView: User Requests Details
        ShowingDetailedView --> ShowingPrimaryView: User Returns to Summary
        ShowingPrimaryView --> HighlightingChanges: Props Updated
        HighlightingChanges --> ShowingPrimaryView: Animation Complete
    }
    
    state Error {
        [*] --> DeterminingErrorType
        DeterminingErrorType --> NetworkError: Network Issue
        DeterminingErrorType --> ValidationError: Data Invalid
        DeterminingErrorType --> RenderError: Component Error
        
        NetworkError --> DisplayingRetryOption
        ValidationError --> DisplayingFallback
        RenderError --> DisplayingErrorBoundary
        
        DisplayingRetryOption --> WaitingForRetry
        DisplayingFallback --> WaitingForReset
        DisplayingErrorBoundary --> WaitingForReset
    }
    
    Error --> Retrying: User Clicks Retry
    Error --> Idle: User Clicks Reset
    Error --> Idle: Error Boundary Reset
    
    state Retrying {
        [*] --> ResetErrorState
        ResetErrorState --> InitiatingRetry
        InitiatingRetry --> [*]
    }
    
    Retrying --> Loading: Retry Initiated
    Retrying --> Error: Retry Failed
    
    DisplayingResults --> Idle: Widget Reset
    DisplayingResults --> Loading: Security Levels Changed
    DisplayingResults --> Suspending: New Data Requested
    
    state Suspending {
        [*] --> ShowingFallback
        ShowingFallback --> WaitingForLazyLoad
        WaitingForLazyLoad --> [*]
    }
    
    Suspending --> DisplayingResults: Component Loaded
    Suspending --> Error: Lazy Load Failed
    
    DisplayingResults --> Unmounting: Component Unmounted
    Error --> Unmounting: Component Unmounted
    Idle --> Unmounting: Component Unmounted
    
    state Unmounting {
        [*] --> CleaningUpSubscriptions
        CleaningUpSubscriptions --> ClearingTimers
        ClearingTimers --> RemovingEventListeners
        RemovingEventListeners --> [*]
    }
    
    Unmounting --> [*]
    
    classDef idle fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:white
    classDef loading fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef display fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef error fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef suspense fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef unmount fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    
    class Idle idle
    class Loading,Retrying loading
    class DisplayingResults,ShowingPrimaryView,ShowingDetailedView display
    class Error,NetworkError,ValidationError,RenderError error
    class Suspending suspense
    class Unmounting unmount
```

**State Invariants:**
- **Idle**: Widget is mounted but not actively processing
- **Loading**: Async operation in progress, user sees loading indicator
- **DisplayingResults**: Valid data rendered, user can interact
- **Error**: Recoverable error state with retry/reset options
- **Suspending**: Lazy component loading (React 19.x Suspense)
- **Unmounting**: Component cleanup before removal

**Transition Events:**
- `Security Levels Changed`: Parent component updates CIA triad levels
- `Data Fetch Failed`: Network error, service unavailable, or timeout
- `Data Validation Failed`: Received data fails type guard validation
- `Rendering Error`: React rendering exception caught by error boundary
- `User Clicks Retry`: Manual retry button interaction
- `User Clicks Reset`: Reset widget to initial state
- `Component Unmounted`: React unmount lifecycle

## 🛡️ React Error Boundary State Transitions (v1.0)

State machine for `WidgetErrorBoundary` component implementing React Error Boundary pattern:

```mermaid
stateDiagram-v2
    [*] --> Monitoring: Error Boundary Mounted
    
    state Monitoring {
        [*] --> WatchingChildren
        WatchingChildren --> RenderingChildren
        RenderingChildren --> WatchingChildren
    }
    
    Monitoring --> ErrorCaught: Child Component Error
    
    state ErrorCaught {
        [*] --> CapturingError
        CapturingError --> LoggingError
        LoggingError --> InvokingCallback
        InvokingCallback --> UpdatingState
        UpdatingState --> [*]
    }
    
    ErrorCaught --> DisplayingError: getDerivedStateFromError
    
    state DisplayingError {
        [*] --> CheckingFallback
        CheckingFallback --> RenderingCustomFallback: Custom Fallback Provided
        CheckingFallback --> RenderingDefaultFallback: No Custom Fallback
        
        RenderingCustomFallback --> ShowingErrorUI
        RenderingDefaultFallback --> ShowingErrorMessage
        
        ShowingErrorMessage --> DisplayingRetryButton
        DisplayingRetryButton --> ShowingErrorUI
        ShowingErrorUI --> WaitingForUserAction
    }
    
    DisplayingError --> Resetting: User Clicks Retry
    DisplayingError --> PersistingError: User Ignores Error
    
    state Resetting {
        [*] --> ClearingErrorState
        ClearingErrorState --> ResettingChildren
        ResettingChildren --> [*]
    }
    
    Resetting --> Monitoring: Error State Cleared
    
    state PersistingError {
        [*] --> MaintainingErrorState
        MaintainingErrorState --> PreventingChildRender
    }
    
    PersistingError --> Resetting: Manual Reset Triggered
    PersistingError --> Unmounting: Boundary Unmounted
    
    Monitoring --> Unmounting: Component Unmounted
    DisplayingError --> Unmounting: Component Unmounted
    
    state Unmounting {
        [*] --> CleaningUpListeners
        CleaningUpListeners --> ClearingState
        ClearingState --> [*]
    }
    
    Unmounting --> [*]
    
    classDef monitoring fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef error fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef display fill:#e67e22,stroke:#d35400,stroke-width:2px,color:white
    classDef reset fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef unmount fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    
    class Monitoring,WatchingChildren monitoring
    class ErrorCaught,CapturingError,LoggingError error
    class DisplayingError,ShowingErrorUI,ShowingErrorMessage display
    class Resetting,ClearingErrorState reset
    class Unmounting unmount
```

**Error Boundary Lifecycle:**

1. **Monitoring**: Normal operation, rendering children
2. **ErrorCaught**: React calls `componentDidCatch` when child error occurs
3. **DisplayingError**: Shows fallback UI (custom or default with retry)
4. **Resetting**: User triggers retry, clearing error state
5. **PersistingError**: Error state maintained if user doesn't retry

**Error Types Handled:**
- ✅ **Rendering Errors**: Exceptions during component render
- ✅ **Lifecycle Errors**: Errors in lifecycle methods
- ✅ **Constructor Errors**: Errors in child component constructors
- ❌ **Event Handler Errors**: Not caught (use try-catch)
- ❌ **Async Errors**: Not caught (use try-catch)
- ❌ **SSR Errors**: Not caught (server-side rendering)

**Error Boundary Props:**
```typescript
interface WidgetErrorBoundaryProps {
  children: ReactNode;           // Components to protect
  fallback?: ReactNode;           // Custom error UI
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void; // Error callback
  widgetName?: string;            // Widget identification
  testId?: string;                // Testing identifier
}
```

**Integration Example:**
```tsx
<WidgetErrorBoundary 
  widgetName="Security Metrics"
  onError={(error, info) => logger.error('Widget error', { error, info })}
>
  <SecurityMetricsWidget {...props} />
</WidgetErrorBoundary>
```

**Cross-Reference:** See [Error Handling Documentation](../ERROR_HANDLING.md) for detailed patterns and best practices.

## 💤 React Suspense Boundary State (v1.0)

State machine for lazy-loaded components using React 19.x Suspense:

```mermaid
stateDiagram-v2
    [*] --> Pending: Lazy Component Requested
    
    state Pending {
        [*] --> InitiatingLazyLoad
        InitiatingLazyLoad --> DownloadingChunk
        DownloadingChunk --> ParsingModule
        ParsingModule --> ExecutingModule
        ExecutingModule --> [*]
    }
    
    Pending --> ShowingFallback: Suspense Triggered
    
    state ShowingFallback {
        [*] --> RenderingFallbackUI
        RenderingFallbackUI --> DisplayingLoadingIndicator
        DisplayingLoadingIndicator --> MaintainingLayout
        MaintainingLayout --> WaitingForResolution
    }
    
    ShowingFallback --> Resolved: Component Ready
    ShowingFallback --> Failed: Load Error
    
    state Resolved {
        [*] --> ReplacingFallback
        ReplacingFallback --> RenderingComponent
        RenderingComponent --> ComponentActive
        ComponentActive --> CachingForFuture
        CachingForFuture --> [*]
    }
    
    Resolved --> DisplayingComponent: Render Complete
    
    state Failed {
        [*] --> DeterminingErrorType
        DeterminingErrorType --> NetworkFailure: Network Error
        DeterminingErrorType --> ModuleFailure: Module Parse Error
        DeterminingErrorType --> TimeoutFailure: Load Timeout
        
        NetworkFailure --> ShowingErrorBoundary
        ModuleFailure --> ShowingErrorBoundary
        TimeoutFailure --> ShowingErrorBoundary
        
        ShowingErrorBoundary --> WaitingForRetry
    }
    
    Failed --> Retrying: User Retries
    Failed --> FallbackMode: Use Alternative
    
    state Retrying {
        [*] --> ClearingCache
        ClearingCache --> RetryingImport
        RetryingImport --> [*]
    }
    
    Retrying --> Pending: Retry Initiated
    Retrying --> Failed: Retry Failed
    
    state FallbackMode {
        [*] --> LoadingStaticFallback
        LoadingStaticFallback --> DisplayingStaticComponent
    }
    
    FallbackMode --> DisplayingComponent: Fallback Ready
    
    DisplayingComponent --> Unmounting: Component Unmounted
    Failed --> Unmounting: Boundary Unmounted
    
    state Unmounting {
        [*] --> CleaningUpSuspense
        CleaningUpSuspense --> [*]
    }
    
    Unmounting --> [*]
    
    classDef pending fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef fallback fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef resolved fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef failed fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef unmount fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    
    class Pending,InitiatingLazyLoad pending
    class ShowingFallback,DisplayingLoadingIndicator fallback
    class Resolved,ComponentActive resolved
    class Failed,NetworkFailure,ModuleFailure failed
    class Unmounting unmount
```

**Suspense Integration Pattern:**
```tsx
// Component with lazy loading
const SecurityVisualizationWidget = lazy(
  () => import('./SecurityVisualizationWidget')
);

// Wrapped with Suspense and Error Boundary
<WidgetErrorBoundary widgetName="Security Visualization">
  <Suspense fallback={
    <div className="widget-loading" role="status">
      Loading visualization...
    </div>
  }>
    <SecurityVisualizationWidget {...props} />
  </Suspense>
</WidgetErrorBoundary>
```

**Fallback UI Requirements:**
- Maintain consistent layout to prevent content shift
- Show loading indicator for user feedback
- Include accessibility attributes (role, aria-live)
- Style consistent with widget theme

**Performance Characteristics:**
- First load: Downloads and executes module (~100-500ms)
- Subsequent loads: Retrieved from browser cache (<10ms)
- Timeout threshold: 30 seconds before error
- Chunk size optimization: Separate vendor and app bundles

## 🔒 Confidentiality Component States

This diagram illustrates states related to confidentiality controls:

```mermaid
stateDiagram-v2
    [*] --> NoAccess
    
    NoAccess --> BasicAccess: Level Low
    BasicAccess --> StandardAccess: Level Moderate
    StandardAccess --> EnhancedAccess: Level High
    EnhancedAccess --> ZeroTrust: Level Very High
    
    ZeroTrust --> EnhancedAccess: Decrease Level
    EnhancedAccess --> StandardAccess: Decrease Level
    StandardAccess --> BasicAccess: Decrease Level
    BasicAccess --> NoAccess: Decrease Level
    
    state NoAccess {
        [*] --> PublicData
    }
    
    state BasicAccess {
        [*] --> SimpleAuthentication
    }
    
    state StandardAccess {
        [*] --> RoleBasedControl
        RoleBasedControl --> DataEncryption
    }
    
    state EnhancedAccess {
        [*] --> MFA
        MFA --> EndToEndEncryption
        EndToEndEncryption --> AuditLogging
    }
    
    state ZeroTrust {
        [*] --> ContinuousVerification
        ContinuousVerification --> JustInTimeAccess
        JustInTimeAccess --> LeastPrivilege
        LeastPrivilege --> ContextAwareAccess
    }
    
    classDef none fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:white
    classDef low fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef moderate fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    classDef high fill:#e67e22,stroke:#d35400,stroke-width:2px,color:white
    classDef veryhigh fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    
    class NoAccess,PublicData none
    class BasicAccess,SimpleAuthentication low
    class StandardAccess,RoleBasedControl,DataEncryption moderate
    class EnhancedAccess,MFA,EndToEndEncryption,AuditLogging high
    class ZeroTrust,ContinuousVerification,JustInTimeAccess,LeastPrivilege,ContextAwareAccess veryhigh
```

## ✓ Integrity Component States

State machine for form inputs with validation (e.g., SecurityLevelWidget dropdowns):

```mermaid
stateDiagram-v2
    [*] --> Pristine: Form Initialized
    
    state Pristine {
        [*] --> Untouched
        Untouched --> ShowingPlaceholder
    }
    
    Pristine --> Touched: User Focuses Field
    
    state Touched {
        [*] --> Active
        Active --> AcceptingInput: User Types
        AcceptingInput --> ValidatingInput
        ValidatingInput --> Active: Validation Pending
    }
    
    Touched --> Validating: User Blurs Field
    Touched --> Validating: Submit Attempted
    
    state Validating {
        [*] --> CheckingRequired
        CheckingRequired --> CheckingFormat: Field Not Empty
        CheckingRequired --> ValidationFailed: Required Field Empty
        
        CheckingFormat --> CheckingConstraints: Format Valid
        CheckingFormat --> ValidationFailed: Invalid Format
        
        CheckingConstraints --> CheckingBusinessRules: Constraints Met
        CheckingConstraints --> ValidationFailed: Constraints Violated
        
        CheckingBusinessRules --> ValidationPassed: Rules Satisfied
        CheckingBusinessRules --> ValidationFailed: Rules Violated
    }
    
    Validating --> Valid: Validation Passed
    Validating --> Invalid: Validation Failed
    
    state Valid {
        [*] --> ShowingSuccess
        ShowingSuccess --> DisplayingValue
        DisplayingValue --> EnableSubmit
    }
    
    state Invalid {
        [*] --> ShowingError
        ShowingError --> DisplayingErrorMessage
        DisplayingErrorMessage --> DisableSubmit
        DisableSubmit --> HighlightingField
    }
    
    Valid --> Touched: User Edits Valid Field
    Invalid --> Touched: User Edits Invalid Field
    
    Valid --> Submitting: Form Submit Triggered
    
    state Submitting {
        [*] --> RevalidatingAll
        RevalidatingAll --> CheckingAllFields
        CheckingAllFields --> PreparingData: All Valid
        CheckingAllFields --> SubmitBlocked: Any Invalid
        PreparingData --> SendingData
        SendingData --> [*]
    }
    
    Submitting --> Submitted: Submit Successful
    Submitting --> SubmitError: Submit Failed
    Submitting --> Invalid: Validation Failed
    
    state Submitted {
        [*] --> ShowingSuccessMessage
        ShowingSuccessMessage --> ClearingForm
        ClearingForm --> DisablingForm
    }
    
    state SubmitError {
        [*] --> ShowingSubmitError
        ShowingSubmitError --> DisplayingRetry
        DisplayingRetry --> EnableRetry
    }
    
    SubmitError --> Touched: User Clicks Retry
    Submitted --> Pristine: Form Reset
    
    Valid --> Disabled: Form Disabled
    Invalid --> Disabled: Form Disabled
    
    state Disabled {
        [*] --> GreyedOut
        GreyedOut --> PreventingInput
    }
    
    Disabled --> Pristine: Form Enabled
    
    classDef pristine fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:white
    classDef touched fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef valid fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef invalid fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef submit fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef disabled fill:#7f8c8d,stroke:#5f6c7d,stroke-width:2px,color:white
    
    class Pristine,Untouched pristine
    class Touched,Active,AcceptingInput touched
    class Valid,ShowingSuccess valid
    class Invalid,ShowingError,HighlightingField invalid
    class Submitting,SendingData submit
    class Disabled,PreventingInput disabled
```

**Validation Rules:**

1. **Required Validation**: Field must have a value
2. **Format Validation**: Value matches expected pattern (e.g., security level enum)
3. **Constraint Validation**: Value meets min/max requirements
4. **Business Rules**: Domain-specific validation (e.g., integrity >= confidentiality for certain scenarios)

**Error Message Patterns:**
```typescript
interface ValidationError {
  field: string;
  type: 'required' | 'format' | 'constraint' | 'business';
  message: string;
  severity: 'error' | 'warning';
}
```

**Validation Timing:**
- **On Blur**: Validate when user leaves field (non-intrusive)
- **On Submit**: Re-validate all fields before submission
- **Real-time**: Optional for complex constraints (debounced 300ms)

**Accessibility:**
- `aria-invalid` attribute on invalid fields
- `aria-describedby` linking to error messages
- `role="alert"` on error messages for screen readers
- Focus management: Move focus to first error on submit

## 🧩 Widget Interaction States

This diagram shows the state transitions resulting from interactions between widgets:

```mermaid
stateDiagram-v2
    state SecurityLevelWidget {
        [*] --> Ready
        Ready --> Configuring: User Changes Security Level
        Configuring --> Validating: Validate Selection
        Validating --> Propagating: Valid Selection
        Validating --> Ready: Invalid Selection
        Propagating --> Notifying: Update Hook State
        Notifying --> Ready: All Widgets Notified
    }
    
    state AssessmentWidgets {
        [*] --> Idle
        Idle --> Loading: Receive New Security Levels
        Loading --> Processing: Fetch Service Data
        Processing --> Rendering: Calculate Metrics
        Rendering --> Displaying: Render Complete
        Displaying --> Idle: Reset or Await Changes
        Displaying --> Loading: New Levels Received
    }
    
    SecurityLevelWidget --> AssessmentWidgets: Security Levels Changed Event
    
    note right of SecurityLevelWidget
        Central state management via
        useSecurityLevelState hook
        with localStorage persistence
    end note
    
    note right of AssessmentWidgets
        11 widgets subscribe to
        security level changes:
        - Business Impact
        - Security Summary
        - Value Creation
        - Cost Estimation
        - Compliance Status
        - CIA Impact (3x)
        - Technical Details
        - Security Visualization
        - Security Resources
    end note
    
    classDef slw fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef aw fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    
    class SecurityLevelWidget slw
    class AssessmentWidgets aw
```

**Event Propagation Flow:**
1. User changes security level in SecurityLevelWidget
2. Widget calls `setLevel()` from useSecurityLevelState hook
3. Hook updates internal state only (not localStorage)
4. React re-renders CIAClassificationApp
5. App's useEffect triggers and updates localStorage via useLocalStorage
6. All 11 assessment widgets receive updated props
7. Each widget independently fetches/processes data for new levels
8. UI updates across all widgets simultaneously

## 🌐 Offline/Online State Handling

State machine for network connectivity management:

```mermaid
stateDiagram-v2
    [*] --> CheckingConnectivity: App Initialized
    
    state CheckingConnectivity {
        [*] --> TestingConnection
        TestingConnection --> DetectingNavigatorOnline
        DetectingNavigatorOnline --> [*]
    }
    
    CheckingConnectivity --> Online: Connection Available
    CheckingConnectivity --> Offline: No Connection
    
    state Online {
        [*] --> FullFunctionality
        FullFunctionality --> FetchingRemoteData
        FetchingRemoteData --> UpdatingCache
        UpdatingCache --> FullFunctionality
    }
    
    Online --> Offline: Connection Lost
    
    state Offline {
        [*] --> DisplayingOfflineBanner
        DisplayingOfflineBanner --> UsingCachedData
        UsingCachedData --> DisablingRemoteFeatures
        DisablingRemoteFeatures --> PollingForConnection
        PollingForConnection --> WaitingForReconnect
    }
    
    Offline --> Online: Connection Restored
    
    state Offline.UsingCachedData {
        [*] --> CheckingCacheValidity
        CheckingCacheValidity --> ServingFromCache: Valid Cache
        CheckingCacheValidity --> ShowingUnavailable: No Cache
    }
    
    classDef online fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef offline fill:#e67e22,stroke:#d35400,stroke-width:2px,color:white
    classDef checking fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    
    class Online,FullFunctionality online
    class Offline,DisplayingOfflineBanner offline
    class CheckingConnectivity checking
```

**Offline Capabilities:**
- ✅ Display cached security assessments
- ✅ Modify security levels (saved to localStorage)
- ✅ View historical data
- ❌ Export to external services
- ❌ Fetch updated compliance data
- ❌ Load remote resources

**Recovery Strategy:**
- Automatic reconnection on `online` event
- Sync localStorage changes when connection restored
- Show reconnection banner with timestamp
- Retry failed requests with exponential backoff

## 🔒 Security Level Selection States

This diagram illustrates the state transitions during security level configuration (legacy v0.8.x pattern, maintained for reference):

```mermaid
stateDiagram-v2
    [*] --> DefaultProfile: Initial Load
    
    state DefaultProfile {
        [*] --> ModerateSecurityLevels
    }
    
    DefaultProfile --> EditingProfile: User Selects Security Levels
    
    state EditingProfile {
        [*] --> SelectingConfidentiality
        SelectingConfidentiality --> SelectingIntegrity: Next
        SelectingIntegrity --> SelectingAvailability: Next
        SelectingAvailability --> ReviewingSelections: Complete
        
        SelectingConfidentiality --> ReviewingSelections: Skip
        SelectingIntegrity --> ReviewingSelections: Skip
        
        ReviewingSelections --> SelectingConfidentiality: Edit Confidentiality
        ReviewingSelections --> SelectingIntegrity: Edit Integrity
        ReviewingSelections --> SelectingAvailability: Edit Availability
    }
    
    EditingProfile --> ProfileSelected: User Confirms Selections
    
    state ProfileSelected {
        [*] --> LoadingProfileDetails
        LoadingProfileDetails --> DisplayingProfileDetails
    }
    
    ProfileSelected --> EditingProfile: User Modifies Security Levels
    
    classDef defaultState fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef editing fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef selected fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef confidentiality fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    classDef integrity fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef availability fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    
    class DefaultProfile defaultState
    class EditingProfile editing
    class ProfileSelected selected
    class SelectingConfidentiality confidentiality
    class SelectingIntegrity integrity
    class SelectingAvailability availability
```

**Note:** In v1.0, security level selection is handled inline within SecurityLevelWidget using standard form controls. This diagram represents the conceptual workflow, not a multi-page wizard.

## 📊 Summary: v1.0 State Management Architecture

### State Transition Inventory

| State Category | States | Transitions | Error Recovery | Persistence |
|----------------|--------|-------------|----------------|-------------|
| **Application Core** | 10 | 15 | ✅ Retry paths | ❌ None |
| **Widget Lifecycle** | 8 | 18 | ✅ Error boundary | ❌ None |
| **Error Boundary** | 5 | 8 | ✅ Reset/retry | ❌ None |
| **Security Levels** | 6 | 12 | ✅ Validation | ✅ localStorage |
| **Suspense** | 7 | 10 | ✅ Fallback mode | ✅ Browser cache |
| **Form Validation** | 8 | 15 | ✅ Re-validation | ❌ None |
| **Offline/Online** | 4 | 6 | ✅ Auto-reconnect | ✅ Cache API |
| **CIA Components** | 15 | 20 | ❌ None (static) | ❌ None |

**Total:** 63 distinct states, 104 state transitions

### React 19.x Integration

**Hooks Used:**
- `useState`: Component-level state (all widgets)
- `useEffect`: Side effects, subscriptions, cleanup
- `useCallback`: Memoized event handlers
- `useMemo`: Performance optimization (not shown in diagrams)
- `lazy()`: Code splitting for SecurityVisualizationWidget
- Custom hooks: `useSecurityLevelState`, `useLocalStorage`, `useCIAContentService`

**Error Handling:**
- Class component `WidgetErrorBoundary` for React error catching
- Try-catch in event handlers and async operations
- Type guards for runtime validation
- Graceful degradation with fallback UI

**Performance Patterns:**
- Lazy loading reduces initial bundle size by ~30%
- localStorage reduces repeated calculations
- Memoization prevents unnecessary re-renders
- Suspense shows loading states without layout shift

### State Machine Properties

**Determinism:** All state machines are deterministic - given a current state and event, next state is always the same.

**Completeness:** Every state has defined transitions for all possible events, including error conditions.

**Recoverability:** All error states have recovery paths (retry, reset, or fallback).

**Persistence:** Security levels and dark mode preferences persist across sessions.

**Observability:** All state transitions are logged via centralized logger for debugging.

### Cross-References

- **[Process Flowcharts](FLOWCHART.md)**: Data flow and process sequences
- **[Error Handling](../ERROR_HANDLING.md)**: Error patterns and components
- **[Widget Analysis](WIDGET_ANALYSIS.md)**: Individual widget specifications
- **[Architecture](ARCHITECTURE.md)**: C4 model and system context

### Compliance Mapping

**ISO 27001:**
- **A.14.1 (Security in Development)**: State behavior documented ✅
- **A.12.1 (Operational Procedures)**: Error recovery paths defined ✅

**NIST CSF 2.0:**
- **PR.IP-1**: State management in development lifecycle ✅
- **DE.CM-1**: System behavior monitoring enabled ✅

**CIS Controls v8.1:**
- **16.1**: Application behavior defined and documented ✅
- **16.10**: Error handling and recovery specified ✅

### Maintenance Notes

**Updating State Diagrams:**
1. Update Mermaid diagram syntax
2. Update state transition tables
3. Update cross-references
4. Verify guard conditions and invariants
5. Test diagram rendering in documentation

**Adding New States:**
1. Identify trigger events
2. Define guard conditions
3. Document error recovery
4. Add to state inventory table
5. Update cross-references

**Review Cycle:**
- Review after major feature releases
- Update when state management patterns change
- Validate against actual implementation quarterly

---

These comprehensive state diagrams provide a complete view of the CIA Compliance Manager v1.0 behavioral model, illustrating how the application transitions between states in response to user interactions, handles errors gracefully, manages async operations with Suspense, and persists critical state across sessions. The diagrams serve as authoritative documentation for developers, testers, and security auditors understanding system behavior.

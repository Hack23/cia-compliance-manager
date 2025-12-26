# Service Layer Architecture

## 📋 Overview

The CIA Compliance Manager service layer provides a well-architected, type-safe foundation for business logic, security assessments, compliance checking, and business impact analysis. This document describes the service layer architecture, patterns, and best practices.

## 🎯 Design Principles

### SOLID Principles

1. **Single Responsibility Principle (SRP)**
   - Each service has a focused, well-defined responsibility
   - `CIAContentService`: CIA triad content and ROI calculations
   - `ComplianceService`: Compliance framework mapping and status
   - `BusinessImpactService`: Business impact analysis
   - `SecurityMetricsService`: Security scoring and metrics
   - `TechnicalImplementationService`: Technical guidance
   - `SecurityResourceService`: Security resources and references

2. **Open/Closed Principle (OCP)**
   - Services are open for extension through inheritance
   - `BaseService` provides extensible common functionality
   - New services can extend BaseService without modification

3. **Liskov Substitution Principle (LSP)**
   - All services implement consistent interfaces
   - Service implementations are interchangeable through interfaces

4. **Interface Segregation Principle (ISP)**
   - Service interfaces are focused and specific
   - Consumers depend only on methods they use

5. **Dependency Inversion Principle (DIP)**
   - Services depend on abstractions (interfaces) not concretions
   - Data providers are injected through interfaces

### Type Safety

- **Strict TypeScript**: All services use explicit types
- **No `any` Types**: Strict type checking enforced
- **Interface Contracts**: Clear service contracts via TypeScript interfaces
- **Type Guards**: Runtime type validation for external inputs

### Error Handling

- **Standardized Errors**: Custom `ServiceError` class with error codes
- **Error Context**: Detailed context for debugging
- **Graceful Degradation**: Services return safe defaults on errors
- **Comprehensive Logging**: All errors are logged with context

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Service Layer                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐         ┌──────────────────────┐          │
│  │ BaseService  │◄────────│ IBaseService         │          │
│  │              │         │ (Interface)          │          │
│  │  - validate()│         │  - validate()        │          │
│  │  - handleError()│      │  - handleError()     │          │
│  │  - utilities │         └──────────────────────┘          │
│  └──────┬───────┘                                            │
│         │                                                    │
│         │ extends                                            │
│         ├─────────┬─────────┬──────────┬─────────┐          │
│         ▼         ▼         ▼          ▼         ▼          │
│  ┌──────────┐ ┌────────┐ ┌─────────┐ ┌──────┐ ┌────────┐  │
│  │   CIA    │ │Compli- │ │Business │ │ Tech │ │Security│  │
│  │ Content  │ │  ance  │ │ Impact  │ │Impl. │ │Resource│  │
│  │ Service  │ │Service │ │ Service │ │Service│ │Service │  │
│  └──────────┘ └────────┘ └─────────┘ └──────┘ └────────┘  │
│                                                               │
└───────────────────────────┬───────────────────────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │  Data Providers       │
                  │  - CIA Options        │
                  │  - ROI Estimates      │
                  │  - Framework Data     │
                  └──────────────────────┘
```

## 📦 Service Components

### BaseService

**Purpose**: Provides common functionality for all services

**Key Features**:
- Error handling with `ServiceError`
- Input validation methods
- Security level validation
- Component type validation
- Common utility methods (formatting, logging)
- Data provider integration

**Interface**: `IBaseService`

```typescript
export interface IBaseService {
  readonly name: string;
  validate(input: unknown): boolean;
  handleError(error: Error): ServiceError;
}
```

### CIAContentService

**Purpose**: Central hub for CIA triad content, ROI calculations, and security metrics

**Key Features**:
- CIA component details retrieval
- ROI calculation and estimates
- Business impact analysis integration
- Technical implementation details
- Security metrics calculation
- Compliance status checking

**Interface**: `ICIAContentService`

**Dependencies**:
- BusinessImpactService
- ComplianceServiceAdapter
- SecurityMetricsService
- TechnicalImplementationService
- SecurityResourceService

### ComplianceService

**Purpose**: Compliance framework mapping and gap analysis

**Key Features**:
- Framework requirement mapping
- Compliance status calculation
- Gap analysis
- Remediation step generation
- Framework descriptions

**Interface**: `IComplianceService`

**Supported Frameworks**:
- NIST 800-53
- ISO 27001
- NIST CSF
- GDPR
- HIPAA
- SOC2
- PCI DSS
- FedRAMP (Moderate/High)
- CMMC Level 3
- SOX
- CCPA

### BusinessImpactService

**Purpose**: Business impact analysis and risk assessment

**Key Features**:
- Financial impact calculation
- Operational impact assessment
- Reputational risk analysis
- Business impact level calculation
- Category icon mapping

**Interface**: `IBusinessImpactService`

### SecurityMetricsService

**Purpose**: Security scoring and metrics

**Key Features**:
- Security score calculation (0-100)
- Component metrics
- Impact metrics
- Protection level descriptions
- Security icons

**Interface**: `ISecurityMetricsService`

### TechnicalImplementationService

**Purpose**: Technical implementation guidance

**Key Features**:
- Implementation details
- Technical recommendations
- Implementation time estimates
- Technical descriptions

**Interface**: `ITechnicalImplementationService`

### SecurityResourceService

**Purpose**: Security resources and reference materials

**Key Features**:
- Resource links and references
- Value points for security levels
- Best practice documentation

**Interface**: `ISecurityResourceService`

### ComplianceServiceAdapter

**Purpose**: Adapter pattern for compliance service integration

**Key Features**:
- Adapts ComplianceService interface
- Provides backward compatibility
- Simplifies service consumption

## 🔒 Error Handling

### ServiceError Class

```typescript
export class ServiceError extends Error {
  public readonly code: ServiceErrorCode;
  public readonly context: ErrorContext;
  public readonly cause?: Error;
  public readonly timestamp: Date;
}
```

### Error Codes

| Category | Code Range | Examples |
|----------|------------|----------|
| Validation | 1000-1999 | VALIDATION_ERROR, INVALID_SECURITY_LEVEL |
| Data Access | 2000-2999 | DATA_NOT_FOUND, DATA_PROVIDER_ERROR |
| Business Logic | 3000-3999 | CALCULATION_ERROR, COMPLIANCE_CHECK_ERROR |
| System | 4000-4999 | INTERNAL_ERROR, UNEXPECTED_ERROR |

### Error Handling Pattern

```typescript
try {
  // Service operation
  const result = service.calculateROI(level, cost);
  return result;
} catch (error) {
  // Handle error consistently
  const serviceError = service.handleError(error as Error);
  logger.error(serviceError.getFormattedMessage());
  
  // Return safe default or rethrow
  return defaultValue;
}
```

## 📝 Input Validation

### Validation Pattern

All public service methods should validate inputs:

```typescript
public getComponentDetails(
  component: CIAComponentType,
  level: SecurityLevel
): CIADetails | undefined {
  // Validate inputs
  this.validateComponent(component);
  this.validateSecurityLevel(level);
  
  // Business logic
  const options = this.getCIAOptions(component);
  return options[level];
}
```

### Validation Methods

- `validate(input)`: Basic validation (override in subclasses)
- `validateWithDetails(input)`: Detailed validation results
- `validateSecurityLevel(level)`: Security level validation
- `validateComponent(component)`: Component type validation

## 🧪 Testing Strategy

### Unit Testing

- **Coverage Target**: 80%+ line coverage, 70%+ branch coverage
- **Test Structure**: Vitest with React Testing Library
- **Mock Strategy**: Mock data providers, not service implementations
- **Focus**: Business logic, error handling, edge cases

### Test File Organization

```
src/services/
├── BaseService.ts
├── BaseService.test.ts
├── BaseService.additional.test.ts
├── ciaContentService.ts
├── ciaContentService.test.ts
├── ciaContentService.calculateRoi.test.ts
├── ciaContentService.implementation.test.ts
└── ...
```

### Test Categories

1. **Basic Functionality Tests** (`.test.ts`)
   - Happy path scenarios
   - Basic method functionality
   - Return value validation

2. **Additional Tests** (`.additional.test.ts`)
   - Edge cases
   - Error scenarios
   - Integration points

3. **Feature-Specific Tests** (`.feature.test.ts`)
   - Complex feature validation
   - Multi-method scenarios
   - Business rule verification

## 🔄 Service Dependencies

```
CIAContentService
├── BusinessImpactService
├── ComplianceServiceAdapter
│   └── ComplianceService
├── SecurityMetricsService
├── TechnicalImplementationService
└── SecurityResourceService
```

### Dependency Injection

Services use constructor injection for dependencies:

```typescript
export class CIAContentService extends BaseService {
  private businessImpactService: BusinessImpactService;
  private complianceService: ComplianceServiceAdapter;
  
  constructor(dataProvider?: CIADataProvider) {
    super(dataProvider || defaultDataProvider);
    this.businessImpactService = new BusinessImpactService(this.dataProvider);
    this.complianceService = new ComplianceServiceAdapter(this.dataProvider);
  }
}
```

## 📊 Data Flow

```
┌─────────────┐
│   Widget    │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ CIAContentService│
└──────┬───────────┘
       │
       ├─────────┬────────────┬───────────────┐
       ▼         ▼            ▼               ▼
┌───────────┐ ┌─────────┐ ┌──────────┐ ┌──────────┐
│ Business  │ │Compliance│ │ Security │ │Technical │
│  Impact   │ │ Service │ │ Metrics  │ │   Impl   │
└─────┬─────┘ └────┬────┘ └────┬─────┘ └────┬─────┘
      │            │            │             │
      └────────────┴────────────┴─────────────┘
                     │
                     ▼
              ┌─────────────┐
              │Data Provider│
              └─────────────┘
```

## 🎨 Design Patterns

### Factory Pattern

Service factories for consistent instantiation:

```typescript
export function createCIAContentService(
  dataProvider?: CIADataProvider
): CIAContentService {
  return new CIAContentService(dataProvider);
}
```

### Adapter Pattern

`ComplianceServiceAdapter` adapts `ComplianceService` for easier consumption:

```typescript
export class ComplianceServiceAdapter extends BaseService {
  private complianceService: ComplianceService;
  
  public getComplianceStatus(...) {
    return this.complianceService.getComplianceStatus(...);
  }
}
```

### Strategy Pattern

Services implement strategies for different security components:

```typescript
protected getCIAOptions(component: CIAComponentType) {
  switch (component) {
    case 'availability':
      return this.dataProvider.availabilityOptions;
    case 'integrity':
      return this.dataProvider.integrityOptions;
    case 'confidentiality':
      return this.dataProvider.confidentialityOptions;
  }
}
```

### Facade Pattern

`CIAContentService` provides a facade over multiple services:

```typescript
public getBusinessImpact(...) {
  return this.businessImpactService.getBusinessImpact(...);
}

public getComplianceStatus(...) {
  return this.complianceService.getComplianceStatus(...);
}
```

## 📐 Code Quality Metrics

### Complexity Targets

- **Cyclomatic Complexity**: < 10 per method
- **Cognitive Complexity**: < 15 per method
- **Method Length**: < 50 lines
- **Class Size**: < 500 lines

### Current Status

- **Total Services**: 7 core services
- **Total Lines**: ~6,000 lines
- **Test Coverage**: 80%+ (meets target)
- **Test Files**: 15+ test files

## 🚀 Best Practices

### 1. Type Safety

✅ **Do**: Use explicit types
```typescript
public calculateRoi(level: SecurityLevel, cost: number): ROIMetrics {
  // Implementation
}
```

❌ **Don't**: Use `any` types
```typescript
public calculateRoi(level: any, cost: any): any {
  // Implementation
}
```

### 2. Error Handling

✅ **Do**: Use ServiceError with context
```typescript
throw createValidationError(
  'Invalid security level',
  { service: this.name, level, method: 'calculateRoi' }
);
```

❌ **Don't**: Throw raw errors
```typescript
throw new Error('Invalid security level');
```

### 3. Input Validation

✅ **Do**: Validate all inputs
```typescript
public getComponentDetails(component: CIAComponentType, level: SecurityLevel) {
  this.validateComponent(component);
  this.validateSecurityLevel(level);
  // Implementation
}
```

❌ **Don't**: Trust inputs without validation
```typescript
public getComponentDetails(component: CIAComponentType, level: SecurityLevel) {
  // Direct access without validation
  return this.data[component][level];
}
```

### 4. Documentation

✅ **Do**: Add comprehensive JSDoc
```typescript
/**
 * Calculate ROI for a security implementation
 *
 * @param level - Security level to calculate ROI for
 * @param implementationCost - Cost of implementation in USD
 * @returns ROI metrics with value, percentage, and description
 * @throws ServiceError if level is invalid or cost is negative
 */
public calculateRoi(level: SecurityLevel, implementationCost: number): ROIMetrics
```

❌ **Don't**: Leave methods undocumented
```typescript
public calculateRoi(level, cost) {
  // No documentation
}
```

### 5. Logging

✅ **Do**: Log with context
```typescript
this.logOperation('error', 'Calculation failed', {
  method: 'calculateRoi',
  level,
  cost,
  error: error.message
});
```

❌ **Don't**: Log without context
```typescript
console.error('Calculation failed');
```

## 🔧 Maintenance Guidelines

### Adding a New Service

1. Create service class extending `BaseService`
2. Define service interface in `src/types/services.ts`
3. Implement interface methods with validation
4. Add comprehensive tests (80%+ coverage)
5. Update service exports in `src/services/index.ts`
6. Document in this architecture guide

### Modifying Existing Services

1. Ensure backward compatibility
2. Update tests first (TDD approach)
3. Update JSDoc documentation
4. Run full test suite
5. Update architecture documentation if needed

### Deprecating Services

1. Mark as `@deprecated` in JSDoc
2. Provide migration path in documentation
3. Add deprecation warnings
4. Maintain for 2 minor versions
5. Remove in next major version

## 📚 Related Documentation

- **Type Definitions**: `src/types/services.ts`
- **Error Types**: `src/services/errors.ts`
- **Service Exports**: `src/services/index.ts`
- **Unit Test Plan**: `docs/UnitTestPlan.md`
- **Code Quality Standards**: `docs/CODE_QUALITY_ANALYSIS.md`

## 🎯 Future Enhancements

### Planned Improvements

1. **Async Service Operations**
   - Add async data loading
   - Implement caching layer
   - Add progress callbacks

2. **Service Composition**
   - Composable service decorators
   - Plugin architecture
   - Dynamic service loading

3. **Enhanced Validation**
   - JSON Schema validation
   - Custom validation rules
   - Validation middleware

4. **Performance Optimization**
   - Memoization for expensive calculations
   - Lazy loading of services
   - Result caching

5. **Observability**
   - Metrics collection
   - Performance monitoring
   - Distributed tracing

---

**Document Control:**  
**Version**: 1.0.0  
**Last Updated**: 2024-12-26  
**Author**: CIA Compliance Manager Team  
**Status**: Active

# 📋 Architecture Documentation Contribution Guidelines

This document provides guidelines for contributing to the CIA Compliance Manager's architecture documentation to maintain consistency, readability, and quality across all documentation.

## 📚 Documentation Structure

The architecture documentation follows a structured approach:

1. **Current Architecture Documents** - Present state of the system
2. **Future Architecture Documents** - Vision and roadmap for evolution
3. **Shared Documentation Elements** - Common components across documents

## 🎨 Style Guidelines

### 📊 Diagram Consistency

All architecture diagrams should follow these guidelines:

#### 🎯 Color Scheme

Use this enhanced color palette across all diagrams:

| Element Type           | Hex Color  | Usage                                  |
|------------------------|------------|-----------------------------------------|
| 🔒 Confidentiality     | `#8e44ad`  | Data protection, access control         |
| ✓ Integrity           | `#27ae60`  | Data validation, verification           |
| ⏱️ Availability        | `#2980b9`  | System uptime, reliability              |
| 🏛️ Core Architecture   | `#34495e`  | Primary system components               |
| 🧩 UI Components       | `#e74c3c`  | Interface elements, widgets             |
| ⚙️ Services            | `#3498db`  | Service layer, business logic           |
| 💼 Business Elements   | `#f1c40f`  | Business impact, value creation         |
| 🔄 Process Elements    | `#f39c12`  | Workflows, processes, activities        |
| 🧰 Utilities           | `#1abc9c`  | Helper functions, tools                 |
| ⚠️ Critical Items      | `#c0392b`  | High-priority or security-critical      |
| ✅ Success States      | `#2ecc71`  | Completion, successful outcomes         |
| 📊 Data Elements       | `#9b59b6`  | Information, storage, data flows        |

#### 📝 Text Formatting

- **Headers:** Use sentence case with emoji prefixes for section headers
- **Lists:** Use parallel structure and start action items with verbs
- **Terminology:** Be consistent with technical terms across documents
- **Acronyms:** Define acronyms on first use in each document

#### 📊 Diagram Best Practices

1. **Always include a title** that clearly describes the diagram's purpose
2. **Add a legend or class definitions** when using multiple colors/styles
3. **Keep diagram complexity manageable** (limit nodes to ~15-20 per diagram)
4. **Use consistent direction** (typically top-to-bottom or left-to-right)
5. **Balance visual elements** for aesthetic appeal and readability
6. **Use standardized shapes** for similar elements across diagrams
7. **Apply consistent colors** according to the project color scheme
8. **Highlight key elements** through size, position, or color emphasis

### 🧩 Mermaid Diagram Templates

#### Flowchart Template

```mermaid
flowchart TD
    A([Start]) --> B{Decision?}
    B -->|Yes| C[Process Step 1]
    B -->|No| D[Process Step 2]
    C --> E([End])
    D --> E

    %% Style definitions with enhanced colors
    classDef start fill:#2980b9,stroke:#2471a3,stroke-width:2px,color:white,rx:25
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef decision fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef end fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:white,rx:25

    %% Apply styles
    class A start
    class B decision
    class C,D process
    class E end
```

#### C4 Diagram Template

```mermaid
C4Context
  title System Context Diagram

  Person(user, "User", "System user description")
  System(system, "CIA Compliance Manager", "System description")
  System_Ext(externalSystem, "External System", "External system description")

  Rel(user, system, "Uses")
  Rel(system, externalSystem, "Gets data from")

  %% Style definitions with enhanced colors
  UpdateElementStyle(user, $fontColor="white", $bgColor="#e74c3c", $borderColor="#c0392b")
  UpdateElementStyle(system, $fontColor="white", $bgColor="#34495e", $borderColor="#2c3e50")
  UpdateElementStyle(externalSystem, $fontColor="white", $bgColor="#3498db", $borderColor="#2980b9")
```

#### State Diagram Template

```mermaid
stateDiagram-v2
    [*] --> StateA
    
    StateA --> StateB: Transition trigger
    StateB --> StateC: Another trigger
    StateC --> [*]: End condition
    
    state StateB {
        [*] --> SubState1
        SubState1 --> SubState2: Sub-transition
        SubState2 --> [*]
    }
    
    %% Style definitions with enhanced colors
    classDef defaultState fill:#34495e,stroke:#2c3e50,color:white
    classDef activeState fill:#3498db,stroke:#2980b9,color:white
    classDef terminalState fill:#2ecc71,stroke:#27ae60,color:white
    
    class StateA defaultState
    class StateB activeState
    class StateC terminalState
    class SubState1,SubState2 activeState
```

#### CIA Triad Visualization Template

```mermaid
flowchart TD
    subgraph CIA["CIA Security Triad"]
        direction LR
        C[Confidentiality<br>🔒] --- I[Integrity<br>✓]
        I --- A[Availability<br>⏱️]
        A --- C
    end
    
    %% Style definitions with enhanced colors
    classDef confidentiality fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    classDef integrity fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef availability fill:#2980b9,stroke:#2471a3,stroke-width:2px,color:white
    
    class C confidentiality
    class I integrity
    class A availability
```

#### Widget Relationship Template

```mermaid
flowchart TD
    SLW[Security Level<br>Widget] --> SSW[Security Summary<br>Widget]
    SLW --> BIAW[Business Impact<br>Widget]
    SLW --> CIW[Confidentiality<br>Impact Widget]
    SLW --> IIW[Integrity<br>Impact Widget]
    SLW --> AIW[Availability<br>Impact Widget]
    
    %% Style definitions with enhanced colors
    classDef control fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef confidentiality fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    classDef integrity fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef availability fill:#2980b9,stroke:#2471a3,stroke-width:2px,color:white
    classDef business fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    
    class SLW,SSW control
    class CIW confidentiality
    class IIW integrity
    class AIW availability
    class BIAW business
```

### 🔤 File Naming Conventions

1. Use UPPERCASE for all markdown files (e.g., `ARCHITECTURE.md`)
2. Use underscores for multi-word file names (e.g., `FUTURE_DATA_MODEL.md`)
3. Prefix future state documents with `FUTURE_` (e.g., `FUTURE_ARCHITECTURE.md`)
4. Use consistent file extensions (.md for Markdown, .svg for vector graphics)
5. Group related files with consistent prefixes

## 📝 Documentation Structure Template

Each architecture document should follow this standard structure:

```markdown
<!-- filepath: /path/to/document.md -->
# 🎯 Document Title

Brief introduction explaining the document's purpose (1-2 paragraphs).

## 📚 Related Documentation

<div class="documentation-map">

| Document | Focus | Description |
|----------|-------|-------------|
| [Link to Doc 1](path/to/doc1.md) | Focus 1 | Brief description |
| [Link to Doc 2](path/to/doc2.md) | Focus 2 | Brief description |

</div>

## 📋 Section 1 Title

Section content with appropriate diagrams and explanations.

```mermaid
// Diagram goes here
```

### 📊 Subsection 1.1 Title

Subsection content.

## 🔄 Section 2 Title

Additional section content.

## 📝 Summary

Brief summary of key points (optional for shorter documents).
```

## 🔄 Review Process

All documentation changes undergo these review steps:

1. **Self-review** - Check against style guide and contribution guidelines
2. **Peer review** - Another team member reviews for technical accuracy
3. **Documentation lead review** - Ensures consistency with existing docs
4. **Final approval** - Merge after addressing all feedback

## 📋 Change Management

When updating architecture documentation:

1. **Create an issue** describing the needed documentation changes
2. **Reference requirements** that drive documentation updates
3. **Update all related documents** to maintain consistency
4. **Create cross-references** between related documents
5. **Update diagrams** to reflect the current architecture

By following these contribution guidelines, we ensure that our architecture documentation remains consistent, accurate, and valuable to all stakeholders.


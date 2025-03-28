# 🎨 Architecture Documentation Style Guide

This style guide provides standards and best practices for creating consistent, readable, and visually appealing architecture documentation for the CIA Compliance Manager project.

## 📚 General Documentation Principles

- **Clear, concise language** - Use straightforward language and avoid unnecessary jargon
- **Progressive disclosure** - Start with high-level concepts before diving into details
- **Consistent terminology** - Use the same terms throughout all documentation
- **Visual + text** - Always complement diagrams with explanatory text
- **Audience awareness** - Consider both technical and non-technical readers

## 🎯 Document Structure

### Standard Document Sections

1. **Title** - Clear, descriptive title with emoji prefix
2. **Introduction** - Brief overview of the document's purpose (1-2 paragraphs)
3. **Related Documentation** - Table of related architecture documents
4. **Main Content** - Organized into logical sections with clear headers
5. **Visual Elements** - Diagrams, tables, and other visuals to support content
6. **Explanatory Text** - Context and explanation for each visual element
7. **Conclusion/Summary** - When appropriate for longer documents

### Header Hierarchy

- **Level 1 (#)** - Document title with emoji prefix
- **Level 2 (##)** - Major sections with emoji prefix
- **Level 3 (###)** - Subsections with optional emoji prefix
- **Level 4 (####)** - Minor subsections, typically without emoji

## 🎨 Visual Design Elements

### 🎭 Emoji Usage

Use consistent emoji prefixes for common section types:

| Section Type | Emoji | Example |
|--------------|-------|---------|
| Architecture | 🏛️ | 🏛️ System Architecture |
| Security | 🔒 | 🔒 Security Controls |
| Process | 🔄 | 🔄 Assessment Workflow |
| Data | 📊 | 📊 Data Model |
| Business | 💼 | 💼 Business Impact |
| Integration | 🔌 | 🔌 External Systems |
| Users | 👥 | 👥 User Roles |
| Technical | 🔧 | 🔧 Implementation Details |
| DevOps | 🚀 | 🚀 Deployment Process |
| Status | ✅ | ✅ Current Status |

### 🎨 Color Palette

Use this standardized color palette for all diagrams:

```mermaid
graph TD
    subgraph "Standard Color Palette"
        A1[Core Components<br>#a0c8e0]
        A2[Process Elements<br>#ffda9e]
        A3[Critical Items<br>#ff6666]
        A4[Success States<br>#c8e6c9]
        A5[Data Elements<br>#d1c4e9]
        A6[External Systems<br>#bbdefb]
    end
    
    style A1 fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    style A2 fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    style A3 fill:#ff6666,stroke:#333,stroke-width:1px,color:white
    style A4 fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    style A5 fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    style A6 fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
```

#### Secondary Colors

```mermaid
graph TD
    subgraph "Extended Color Palette"
        B1[Light Blue<br>#bbdefb]
        B2[Medium Blue<br>#a0c8e0]
        B3[Dark Blue<br>#86b5d9]
        B4[Light Purple<br>#d1c4e9]
        B5[Medium Purple<br>#9575cd]
        B6[Light Green<br>#c8e6c9]
        B7[Medium Green<br>#81c784]
        B8[Light Orange<br>#ffda9e]
        B9[Medium Orange<br>#ffb74d]
        B10[Light Red<br>#ffccbc]
        B11[Medium Red<br>#ff8a65]
    end
    
    style B1 fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    style B2 fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    style B3 fill:#86b5d9,stroke:#333,stroke-width:1px,color:black
    style B4 fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    style B5 fill:#9575cd,stroke:#333,stroke-width:1px,color:black
    style B6 fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    style B7 fill:#81c784,stroke:#333,stroke-width:1px,color:black
    style B8 fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    style B9 fill:#ffb74d,stroke:#333,stroke-width:1px,color:black
    style B10 fill:#ffccbc,stroke:#333,stroke-width:1px,color:black
    style B11 fill:#ff8a65,stroke:#333,stroke-width:1px,color:black
```

### 🖼️ Diagram Styles

#### C4 Diagrams

For C4 model diagrams, use these styling guidelines:

```mermaid
C4Context
  title Example C4 Context Diagram Styling

  Person(user, "User", "Description of user")
  System(system, "System", "Description of system")
  System_Ext(external, "External System", "Description of external system")

  Rel(user, system, "Uses")
  Rel(system, external, "Integrates with")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  UpdateElementStyle(user, $fontColor="#333333", $bgColor="#bbdefb", $borderColor="#86b5d9")
  UpdateElementStyle(system, $fontColor="#333333", $bgColor="#a0c8e0", $borderColor="#86b5d9")
  UpdateElementStyle(external, $fontColor="#333333", $bgColor="#d1c4e9", $borderColor="#9575cd")
```

#### Flowcharts

For process flowcharts, use these styling guidelines:

```mermaid
flowchart TD
    A[Start Process] --> B{Decision Point}
    B -->|Option 1| C[Process Step 1]
    B -->|Option 2| D[Process Step 2]
    C --> E[End Process]
    D --> E

    classDef start fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef decision fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef end fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black

    class A start
    class B decision
    class C,D process
    class E end
```

#### State Diagrams

For state diagrams, use these styling guidelines:

```mermaid
stateDiagram-v2
    [*] --> Idle
    
    Idle --> Processing: Event Received
    Processing --> Success: Process Complete
    Processing --> Error: Process Failed
    Success --> Idle: Reset
    Error --> Idle: Reset
    
    state Processing {
        [*] --> Validating
        Validating --> Computing
        Computing --> Saving
        Saving --> [*]
    }
```

#### Entity Relationship Diagrams

For data models, use these styling guidelines:

```mermaid
erDiagram
    ENTITY1 {
        string id PK
        string name
        date createdAt
    }
    
    ENTITY2 {
        string id PK
        string entity1Id FK
        string attribute
    }
    
    ENTITY1 ||--o{ ENTITY2 : "has"
```

## 📝 Text Formatting

### Bold and Italic

- Use **bold** for emphasis on important concepts
- Use *italic* for introducing new terms
- Use ***bold italic*** sparingly for very high emphasis

### Code Formatting

- Use `inline code` for code references, file names, and technical identifiers
- Use code blocks with language specification for longer code samples

```typescript
// Example of a properly formatted code block
interface SecurityProfile {
  confidentiality: number;
  integrity: number;
  availability: number;
  getOverallScore(): number;
}
```

### Lists

- Use bulleted lists for unordered items
- Use numbered lists for sequential steps or prioritized items
- Maintain parallel structure in list items

### Tables

- Include headers for all tables
- Align column content appropriately (left for text, right for numbers)
- Use consistent formatting within tables

## 🌐 Cross-References

### Document References

When referencing other architecture documents:

- Use the exact document title
- Make the reference a hyperlink to the document
- Provide context for why you're referencing the document

Example: For more information on deployment processes, see the [CI/CD Workflows](WORKFLOWS.md) documentation.

### Diagram References

When referencing diagrams within or across documents:

- Refer to diagrams by their exact titles
- Specify the document if referencing a diagram in another document
- Briefly explain the diagram's relevance

## 📊 Diagram Best Practices

### General Diagram Guidelines

1. **Keep diagrams focused** on a single concept or relationship set
2. **Provide clear titles** that explain the diagram's purpose
3. **Include legends** when using multiple colors, shapes, or line styles
4. **Add contextual information** in the surrounding text
5. **Balance detail level** – show enough detail to be useful without overwhelming
6. **Use consistent orientation** (typically top-to-bottom or left-to-right)
7. **Group related elements** visually
8. **Highlight critical paths** or elements

### Diagram-Specific Guidelines

#### C4 Model Diagrams

- Follow the standard C4 model hierarchy (Context → Container → Component → Code)
- Clearly indicate system boundaries
- Show external dependencies and integrations
- Use consistent shapes for system types

#### Process Flowcharts

- Start with a clear beginning and end
- Use standard flowchart symbols consistently
- Label decision points with questions
- Show all possible paths
- Use color to indicate process types or outcomes

#### State Diagrams

- Label all transitions between states
- Use substates for complex state logic
- Indicate the initial and final states clearly
- Group related states visually

## 📏 Style Enforcement

To ensure consistency across all architecture documentation:

1. **Documentation reviews** should check for style compliance
2. **Templates and examples** are provided for common document types
3. **Automation tools** can be used to check for basic style issues
4. **Diagram reviews** should focus on clarity, consistency, and compliance with style guide

By following these style guidelines, we ensure that all architecture documentation for the CIA Compliance Manager is consistent, readable, and visually appealing, making it more accessible and useful for all stakeholders.

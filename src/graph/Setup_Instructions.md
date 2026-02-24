# Graph Viewer Module - Complete Setup & Usage Guide

## 📦 Package Contents

This is a **complete, production-ready** React graph visualization module powered by yFiles for HTML. Everything you need is included:

### ✅ What's Included
- **Graph Viewer Component** - Fully-featured, interactive graph visualization
- **yFiles Library** - `yfiles-26.0.3.tgz` bundled in `assets/` folder
- **Pre-configured License** - Valid yFiles license already set up
- **UI Components** - `ControlPanel` and `InfoPanel` for interactive controls
- **Example Component** - `GraphLoadingExample.tsx` with complete implementation
- **TypeScript Support** - Full type definitions for all APIs
- **Layout Algorithms** - 5 different layouts (Hierarchic, Tree, Circular, Orthogonal, Organic)
- **Web Workers** - Non-blocking layout calculations for performance

### 🎯 No Additional Downloads Required
You **don't need to**:
- ❌ Purchase yFiles separately
- ❌ Obtain a license key
- ❌ Download additional libraries
- ❌ Configure complex setups

Everything is ready to use out of the box!

---

## 🚀 Quick Installation (3 Steps)

### Step 1: Extract and Place the Module

After unzipping the package, place the entire `graph` folder into your project's `src` directory:

```
your-project/
├── src/
│   ├── graph/              ← Place the extracted folder here
│   │   ├── assets/
│   │   ├── components/
|   |   |-- constants/
|   |   |-- data/
│   │   ├── lib/
│   │   ├── types/
│   │   ├── index.ts
│   │   ├── StandaloneGraphViewer.tsx
│   │   ├── GraphLoadingExample.tsx
│   │   └── Setup_Instructions.md
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── ...
```

### Step 2: Update package.json

Add these dependencies to your project's `package.json`:

```json
{
  "dependencies": {
    "@yfiles/yfiles": "./src/graph/assets/yfiles-26.0.3.tgz",
    "@babel/standalone": "^7.29.1",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

**Important:**
- The path `./src/graph/assets/yfiles-26.0.3.tgz` must point to the bundled yFiles package
- React 18+ is required for concurrent features
- If React is already installed, just add the other two dependencies

### Step 3: Install Dependencies

Run the installation command:

```bash
npm install
```

**What this does:**
- Installs yFiles from the local `.tgz` file
- Installs `@babel/standalone` for JSX compilation in graph nodes
- Resolves all peer dependencies

### ✅ Verification

After installation, verify everything is set up:

```bash
# Check if yFiles is installed
npm list @yfiles/yfiles

# Should show: @yfiles/yfiles@26.0.3
```

---

## 💻 Basic Usage Examples

### Minimal Example (5 Lines of Code)

The simplest way to get started:

```tsx
import { StandaloneGraphViewer } from './graph';

function App() {
  const graphData = {
    nodes: [
      { id: "1", name: "Parent" },
      { id: "2", name: "Child" }
    ],
    edges: [
      { fromNode: "1", toNode: "2", percentage: 100 }
    ]
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <StandaloneGraphViewer data={graphData} />
    </div>
  );
}
```

**Result:** A fully interactive graph with pan, zoom, and selection capabilities.

### Simple Example with Custom Data

```tsx
import { StandaloneGraphViewer, BusinessType } from './graph';

function App() {
  const graphData = {
    nodes: [
      {
        id: "1",
        name: "Parent Company",
        businessType: BusinessType.Ultimate_Parent_Entity,
        entityCode: "PC-001",
        incorporationJurisdiction: "United States"
      },
      {
        id: "2",
        name: "Subsidiary A",
        businessType: BusinessType.Company,
        entityCode: "SUB-A",
        incorporationJurisdiction: "Delaware"
      },
      {
        id: "3",
        name: "Subsidiary B",
        businessType: BusinessType.Company,
        entityCode: "SUB-B",
        incorporationJurisdiction: "UK"
      }
    ],
    edges: [
      { fromNode: "1", toNode: "2", percentage: 100 },
      { fromNode: "1", toNode: "3", percentage: 75 }
    ]
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <StandaloneGraphViewer data={graphData} />
    </div>
  );
}
```

### With Layout and Orientation Options

```tsx
import { 
  StandaloneGraphViewer, 
  Graph_Layout, 
  GraphOrientation,
  BusinessType 
} from './graph';

function App() {
  const graphData = {
    nodes: [
      { id: "1", name: "CEO", businessType: BusinessType.Ultimate_Parent_Entity },
      { id: "2", name: "CTO", businessType: BusinessType.Company },
      { id: "3", name: "CFO", businessType: BusinessType.Company }
    ],
    edges: [
      { fromNode: "1", toNode: "2", percentage: 100 },
      { fromNode: "1", toNode: "3", percentage: 100 }
    ]
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <StandaloneGraphViewer
        data={graphData}
        layout={Graph_Layout.Hierarchic}
        orientation={GraphOrientation.Top_to_Bottom}
        style={{ 
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
      />
    </div>
  );
}
```

### Production-Ready Example with All Features

For a complete example with loading states, error handling, and interactive controls, see **`GraphLoadingExample.tsx`** in the module folder. You can use it directly:

```tsx
import { GraphLoadingExample } from './graph';

function App() {
  return <GraphLoadingExample />;
}
```

---

## 🎛️ Interactive Controls (ControlPanel & InfoPanel)

The module includes built-in UI components for interactive graph control.

### ControlPanel - Layout & Orientation Controls

Add dropdown controls to let users change the layout algorithm and orientation:

```tsx
import { 
  StandaloneGraphViewer, 
  ControlPanel, 
  InfoPanel,
  Graph_Layout, 
  GraphOrientation
} from './graph';
import { useState } from 'react';

function InteractiveGraph() {
  const graphData = {
    nodes: [
      { id: "1", name: "Parent" },
      { id: "2", name: "Child" }
    ],
    edges: [
      { fromNode: "1", toNode: "2", percentage: 100 }
    ]
  };
  const [layout, setLayout] = useState(Graph_Layout.Hierarchic);
  const [orientation, setOrientation] = useState(GraphOrientation.Top_to_Bottom);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      {/* Control Panel - Shows layout/orientation dropdowns */}
      <ControlPanel
        layout={layout}
        orientation={orientation}
        onLayoutChange={setLayout}
        onOrientationChange={setOrientation}
      />
      
      {/* Graph Viewer - Updates when layout/orientation changes */}
      <div style={{ flex: 1 }}>
        <StandaloneGraphViewer
          data={graphData}
          layout={layout}
          orientation={orientation}
        />
      </div>
      
      {/* Info Panel - Shows node/edge statistics */}
      <InfoPanel
        nodeCount={graphData.nodes.length}
        edgeCount={graphData.edges.length}
      />
    </div>
  );
}
```

**Features:**
- ✅ Dropdown to select layout algorithm
- ✅ Dropdown to select orientation (for hierarchic/tree layouts)
- ✅ Auto-updates graph when selections change
- ✅ Clean, professional UI styling
- ✅ Responsive design

### ControlPanel API

```typescript
interface ControlPanelProps {
  layout: string;                              // Current active layout
  orientation: string;                         // Current active orientation
  onLayoutChange: (layout: string) => void;    // Called when user selects new layout
  onOrientationChange: (orientation: string) => void; // Called when user selects new orientation
}
```

### Available Layout Algorithms

| Layout | Constant | Best For | Supports Orientation |
|--------|----------|----------|---------------------|
| **Hierarchic** | `Graph_Layout.Hierarchic` | Organizational charts, workflows, dependencies | ✅ Yes |
| **Tree** | `Graph_Layout.Tree` | Tree structures, taxonomies | ✅ Yes |
| **Circular** | `Graph_Layout.Circular` | Cyclic relationships, networks | ❌ No |
| **Orthogonal** | `Graph_Layout.Orthogonal` | Circuit diagrams, grid-based layouts | ❌ No |
| **Organic** | `Graph_Layout.Organic` | Natural clustering, social networks | ❌ No |

### Available Orientations

**Applies to:** Hierarchic and Tree layouts only

| Orientation | Constant | Flow Direction |
|-------------|----------|----------------|
| **Top to Bottom** | `GraphOrientation.Top_to_Bottom` | ⬇️ Flows downward |
| **Bottom to Top** | `GraphOrientation.Bottom_to_Top` | ⬆️ Flows upward |
| **Left to Right** | `GraphOrientation.Left_to_Right` | ➡️ Flows rightward |
| **Right to Left** | `GraphOrientation.Right_to_Left` | ⬅️ Flows leftward |

### InfoPanel API

```typescript
interface InfoPanelProps {
  nodeCount: number;  // Total number of nodes in the graph
  edgeCount: number;  // Total number of edges in the graph
}
```

**Displays:**
- 📊 Node count
- 🔗 Edge count
- 💡 Interaction hints (drag to pan, scroll to zoom, click to select)

---

## 📊 Data Structure Reference

### Overview

The graph component accepts data in a simple structure with **nodes** and **edges**:

```typescript
interface NodeWithEdge {
  nodes: NodeType[];  // Array of nodes
  edges: EdgeType[];  // Array of edges connecting nodes
}
```

### NodeType - Complete Definition

```typescript
interface NodeType {
  // Required Fields
  id: string;                           // Unique identifier (REQUIRED)
  
  // Display Fields
  name?: string;                        // Display name
  
  // Business/Entity Fields
  businessType?: string;                // Entity type (use BusinessType constants)
  entityCode?: string;                  // Entity code/identifier
  incorporationJurisdiction?: string;   // Where entity is incorporated
  subNational?: string;                 // Sub-national jurisdiction
  
  // Classification Fields
  sicCode?: string;                     // Standard Industrial Classification
  taxCharList?: string;                 // Tax characteristics
  taxResidenceJurisdiction?: string;    // Tax residence location
  
  // Additional Fields
  databaseId?: string;                  // Database reference ID
  heatAmount?: number;                  // Heat map value
  filterd?: boolean;                    // Whether node is filtered
}
```

### EdgeType - Complete Definition

```typescript
interface EdgeType {
  // Required Fields
  fromNode: string;     // Source node ID (REQUIRED, must exist in nodes array)
  toNode: string;       // Target node ID (REQUIRED, must exist in nodes array)
  percentage: number;   // Ownership/connection percentage (REQUIRED)
  
  // Optional Fields
  id?: string;          // Edge identifier
  filterd?: boolean;    // Whether edge is filtered
}
```

### BusinessType Constants

Use these predefined constants for the `businessType` field:

```typescript
import { BusinessType } from './graph';

BusinessType.Ultimate_Parent_Entity  // "Ultimate Parent Entity (UPE)"
BusinessType.Company                 // "Company"
BusinessType.Branch_Site_Service_PE  // "Branch/Site/Service PE"
BusinessType.Exempt_PE               // "Exempt PE"
BusinessType.Digital_PE              // "Digital PE"
BusinessType.Finance_Branch          // "Finance Branch"
BusinessType.Pass_Through_Entity     // "Pass-Through Entity"
BusinessType.Trust_or_similar_body   // "Trust or similar body"
```


### Data Validation Rules

**Critical Rules:**
1. ✅ **Node IDs must be unique** - No two nodes can have the same `id`
2. ✅ **Edge references must be valid** - `fromNode` and `toNode` must reference existing node IDs
3. ✅ **Percentage is required** - All edges must have a `percentage` value
4. ✅ **IDs are required** - All nodes must have an `id` field

**Best Practices:**
- Use meaningful IDs (e.g., "company_001" instead of "1")
- Always include `name` for better visualization
- Use `BusinessType` constants for consistency
- Include `entityCode` for reference tracking
- Validate data before passing to component

### Type-Safe Data Creation

Using TypeScript for type safety:

```typescript
import type { NodeWithEdge, NodeType, EdgeType } from './graph';
import { BusinessType } from './graph';

// Type-safe node creation
const nodes: NodeType[] = [
  { 
    id: "1", 
    name: "Company A",
    businessType: BusinessType.Company  // TypeScript validates this
  }
];

// Type-safe edge creation
const edges: EdgeType[] = [
  { fromNode: "1", toNode: "2", percentage: 100 }
];

// Type-safe complete data
const graphData: NodeWithEdge = { nodes, edges };
```

---

## 🎨 Advanced Customization

### Custom Layout Configuration

Fine-tune layout algorithms with custom settings:

```tsx
import { getDefaultLayoutControll, Graph_Layout } from './graph';

// Get default settings
const defaultSettings = getDefaultLayoutControll();

// Customize for your needs
const customLayoutControll = {
  ...defaultSettings,
  
  // Hierarchic layout settings
  nodeToNodeDistance: 80,           // Space between nodes (default: 60)
  minimumLayerDistance: 100,        // Space between layers (default: 80)
  edgeToEdgeDistance: 20,           // Space between edges
  nodeToEdgeDistance: 30,           // Space from nodes to edges
  
  // Visual settings
  integratedEdgeLabeling: true,     // Labels integrated into edges
  automaticEdgeGrouping: true,      // Group parallel edges
  labelingEnabled: true             // Enable all labeling
};

<StandaloneGraphViewer
  data={data}
  layout={Graph_Layout.Hierarchic}
  layoutControll={customLayoutControll}
/>
```

### Layout-Specific Settings

```tsx
const customLayoutControll = {
  ...getDefaultLayoutControll(),
  
  // For Organic layout
  preferredEdgeLength: 120,         // Preferred edge length
  compactnessFactor: 0.5,           // How compact the layout is (0-1)
  
  // For Orthogonal layout
  gridSpacing: 50,                  // Grid cell size
  
  // For Circular layout
  nodeDistance: 100                 // Distance between nodes
};
```

---

## 📁 Module Structure & File Descriptions

```
graph/
├── assets/
│   ├── license.json                    # yFiles license (already configured)
│   └── yfiles-26.0.3.tgz              # yFiles library package
│
├── components/
│   ├── ControlPanel.tsx                # UI controls for layout/orientation
│   ├── InfoPanel.tsx                   # Display node/edge statistics
│   └── index.ts                        # Component exports
│
├── constants/
│   └── entityConstants.ts              # Business entity type definitions
│
├── data/
│   ├── defaultLayoutControll.ts        # Default layout configuration
│   └── index.ts                        # Data exports
│
├── lib/
│   ├── chart-utils.ts                  # Utility functions for charts
│   ├── CollectionUtils.ts              # Collection manipulation helpers
│   ├── GraphBuilder.ts                 # Main graph construction logic
│   ├── GraphBuilderUtils.ts            # Helper functions for graph building
│   ├── GraphTable.ts                   # Table-based node rendering
│   ├── jsx-compiler.ts                 # Compiles JSX for node content
│   ├── Layout.ts                       # Layout algorithm implementations
│   ├── Layout.worker.ts                # Web Worker for layout calculations
│   ├── LayoutUtils.ts                  # Layout helper functions
│   ├── LayoutWorkerFactory.ts          # Manages layout worker instances
│   ├── loadGraph.ts                    # Main graph loading orchestration
│   ├── Projection.ts                   # Graph projection utilities
│   ├── ReactComponentHtmlNodeStyle.ts  # HTML-based React node rendering
│   ├── ReactComponentSvgNodeStyle.ts   # SVG-based React node rendering
│   ├── SetLayout.ts                    # Applies layout to graph
│   ├── SvgText.ts                      # SVG text rendering utilities
│   ├── ViewUi.ts                       # View and UI management
│   └── yFilesLicense.ts                # License loader
│
├── types/
│   ├── constant.ts                     # Constant type definitions and enums
│   └── type.ts                         # Core TypeScript type definitions
│
├── index.ts                            # Main module entry point (all exports)
├── StandaloneGraphViewer.tsx           # Main graph viewer component
├── GraphLoadingExample.tsx             # Complete usage example
└── Setup_Instructions.md               # This file
```

### Key File Descriptions

#### Core Files
- **`index.ts`** - Main entry point. Import everything from here.
- **`StandaloneGraphViewer.tsx`** - The main graph component. Handles rendering, lifecycle, and cleanup.
- **`GraphLoadingExample.tsx`** - Production-ready example with loading states and error handling.

#### Graph Building (lib/)
- **`GraphBuilder.ts`** - Converts your data into yFiles graph objects. This is where nodes and edges are created.
- **`loadGraph.ts`** - Orchestrates the entire graph loading process: builds graph → applies layout → renders.
- **`Layout.ts`** & **`SetLayout.ts`** - Implements different layout algorithms (hierarchic, tree, circular, etc.).
- **`Layout.worker.ts`** - Runs layout calculations in a Web Worker to keep UI responsive.

#### Node Rendering (lib/)
- **`ReactComponentHtmlNodeStyle.ts`** - Renders nodes as HTML elements with React components.
- **`ReactComponentSvgNodeStyle.ts`** - Renders nodes as SVG elements with React components.
- **`GraphTable.ts`** - Special node style that displays data in table format.
- **`jsx-compiler.ts`** - Compiles JSX code for dynamic node content.

#### Types (types/)
- **`type.ts`** - All TypeScript interfaces: `NodeType`, `EdgeType`, `NodeWithEdge`, `LayoutControll`, etc.
- **`constant.ts`** - Enums and constants: `Graph_Layout`, `GraphOrientation`, `Shape`, `ViewMode`, etc.

#### Configuration (data/ & constants/)
- **`defaultLayoutControll.ts`** - Default settings for each layout algorithm.
- **`entityConstants.ts`** - Predefined business entity types, colors, and shapes.

#### UI Components (components/)
- **`ControlPanel.tsx`** - Dropdown controls for changing layout and orientation.
- **`InfoPanel.tsx`** - Status bar showing node/edge counts and interaction hints.

---

## 📚 Complete API Reference

### StandaloneGraphViewer Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `NodeWithEdge` | ✅ Yes | - | Graph data containing nodes and edges arrays |
| `layout` | `string` | ❌ No | `Graph_Layout.Hierarchic` | Layout algorithm to use |
| `orientation` | `string` | ❌ No | `GraphOrientation.Top_to_Bottom` | Graph flow direction |
| `layoutControll` | `LayoutControll` | ❌ No | `getDefaultLayoutControll()` | Custom layout configuration |
| `className` | `string` | ❌ No | `''` | CSS class name for container |
| `style` | `React.CSSProperties` | ❌ No | `{}` | Inline styles for container |

**TypeScript Interface:**
```typescript
interface StandaloneGraphViewerProps {
  data: NodeWithEdge;              // Required: Graph data
  layout?: string;                 // Optional: Layout algorithm
  orientation?: string;            // Optional: Graph orientation
  layoutControll?: LayoutControll; // Optional: Custom layout settings
  className?: string;              // Optional: CSS class
  style?: React.CSSProperties;     // Optional: Inline styles
}
```

---

### ControlPanel Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `selectedLayout` | `string` | ✅ Yes | - | Currently selected layout |
| `selectedOrientation` | `string` | ✅ Yes | - | Currently selected orientation |
| `onLayoutChange` | `(layout: string) => void` | ✅ Yes | - | Callback when layout changes |
| `onOrientationChange` | `(orientation: string) => void` | ✅ Yes | - | Callback when orientation changes |
| `onApply` | `() => void` | ✅ Yes | - | Callback when Apply button is clicked |

**Example:**
```typescript
<ControlPanel
  selectedLayout={layout}
  selectedOrientation={orientation}
  onLayoutChange={setLayout}
  onOrientationChange={setOrientation}
  onApply={handleApply}
/>
```

---

### InfoPanel Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `nodeCount` | `number` | ✅ Yes | - | Total number of nodes |
| `edgeCount` | `number` | ✅ Yes | - | Total number of edges |
| `selectedNodesCount` | `number` | ❌ No | `0` | Number of selected nodes |
| `selectedEdgesCount` | `number` | ❌ No | `0` | Number of selected edges |

**Example:**
```typescript
<InfoPanel
  nodeCount={data.nodes.length}
  edgeCount={data.edges.length}
  selectedNodesCount={0}
  selectedEdgesCount={0}
/>
```

---

### Exported Module Members

```typescript
// ═══════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════
export { StandaloneGraphViewer }    // Main graph viewer
export { ControlPanel }             // Layout control UI
export { InfoPanel }                // Graph statistics UI
export { GraphLoadingExample }      // Complete usage example

// ═══════════════════════════════════════════════
// TYPES & INTERFACES
// ═══════════════════════════════════════════════
export type { 
  NodeType,           // Node data structure
  EdgeType,           // Edge data structure
  NodeWithEdge,       // Combined graph data
  LayoutControll,     // Layout configuration
  ShapeColor,         // Node color options
  TableBodyColor      // Table styling
}

// ═══════════════════════════════════════════════
// CONSTANTS & ENUMS
// ═══════════════════════════════════════════════
export { 
  Graph_Layout,       // 'Hierarchic' | 'Tree' | 'Organic' | 'Orthogonal' | 'Circular' | 'Radial' | 'BallonLayout'
  GraphOrientation,   // 'Top_to_Bottom' | 'Bottom_to_Top' | 'Left_to_Right' | 'Right_to_Left'
  GraphPreset,        // Graph preset configurations
  Shape,              // Node shape options
  ViewMode,           // View mode options
  BusinessType        // 'Ultimate_Parent_Entity' | 'Company' | 'Branch_Site_Service_PE' | etc.
}

// ═══════════════════════════════════════════════
// UTILITIES & DATA
// ═══════════════════════════════════════════════
export { 
  getDefaultLayoutControll   // Returns default layout settings
}
```

---

### Layout Options (Graph_Layout)

| Layout | Best For | Characteristics |
|--------|----------|----------------|
| `Hierarchic` | Organizational charts, workflows | Top-down hierarchy, clear levels |
| `Tree` | Family trees, file systems | Tree structure, parent-child relationships |
| `Organic` | Social networks, knowledge graphs | Natural, force-directed layout |
| `Orthogonal` | Technical diagrams, circuit boards | Right-angle edges, grid-based |
| `Circular` | Cycle detection, process flows | Nodes arranged in circles |
| `Radial` | Network topology, star patterns | Radial arrangement from center |
| `BallonLayout` | Hierarchical networks | Balloon-like nested circles |

---

### Orientation Options (GraphOrientation)

| Orientation | Visual Flow | Use Case |
|-------------|-------------|----------|
| `Top_to_Bottom` | ⬇️ Downward | Default, most common |
| `Bottom_to_Top` | ⬆️ Upward | Hierarchies from base up |
| `Left_to_Right` | ➡️ Rightward | Wide screens, timelines |
| `Right_to_Left` | ⬅️ Leftward | RTL languages, reverse chronology |

---

## 🆘 Support & Resources

### 📚 Documentation

- **This Guide** - Complete setup and usage instructions
- **Type Definitions** - `src/graph/types/type.ts` - All TypeScript interfaces
- **Constants** - `src/graph/constants/entityConstants.ts` - BusinessType values
- **Data Mapping** - `src/graph/lib/apiGraphDataMapper.ts` - API response to graph data
- **Default Layouts** - `src/graph/data/defaultLayoutControll.ts` - Layout configurations

### 💡 Example Files

| File | Purpose | What It Shows |
|------|---------|---------------|
| `GraphLoadingExample.tsx` | Production-ready example | Loading states, error handling, ControlPanel/InfoPanel integration |
| `apiGraphDataMapper.ts` | API data mapping | Converts API response to NodeType/EdgeType format |
| `StandaloneGraphViewer.tsx` | Component source | Implementation details for customization |

### 🔗 Quick Reference Links

- **Import Statement:** `import { StandaloneGraphViewer, ControlPanel, InfoPanel, BusinessType } from './graph'`
- **Type Import:** `import type { NodeType, EdgeType, NodeWithEdge, LayoutControll } from './graph'`
- **Layout Defaults:** `import { getDefaultLayoutControll } from './graph'`

### ⚡ Key Files to Check When Troubleshooting

1. **component not rendering** → Check container dimensions
2. **Import errors** → Verify `src/graph/index.ts` exists
3. **Type errors** → Review `src/graph/types/type.ts`
4. **Layout issues** → Check `src/graph/data/defaultLayoutControll.ts`
5. **License warnings** → Verify `src/graph/assets/license.json` exists

---

## 🚀 Next Steps

### Immediate Actions
1. **Complete Installation** - Follow the Quick Start Checklist above
2. **Test with API Data** - Use your API response mapped with `processCompanyChartApiResponse`
3. **Review Example** - Study `GraphLoadingExample.tsx` for patterns
4. **Read Type Definitions** - Understand NodeType and EdgeType structures

### Integration with Your Project
1. **Identify Data Source** - API, database, static files?
2. **Map Data Structure** - Transform to NodeType/EdgeType format
3. **Choose Layout** - Which algorithm fits your data best?
4. **Implement UI** - Add controls and information displays
5. **Test & Iterate** - Refine based on user feedback

---

**Note:** The yFiles license is property-specific and should not be redistributed outside your organization.

---

## 🎉 You're Ready to Build!

Everything is set up and ready to use. Start by:

1. **Testing the installation** - Fetch API data and render with `StandaloneGraphViewer`
2. **Reviewing examples** - Check `GraphLoadingExample.tsx`
3. **Building your integration** - Transform your data and connect

---

*For technical support or questions about this module, refer to the examples and documentation above, or consult your development team lead.*

---

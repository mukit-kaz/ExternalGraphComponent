import { useState, useEffect } from 'react';
import {
  StandaloneGraphViewer,
  ControlPanel,
  InfoPanel,
  Graph_Layout,
  GraphOrientation,
  type NodeWithEdge,
  BusinessType,
} from './index';

/**
 * GraphLoadingExample - A complete example demonstrating:
 * - Data fetching with loading states
 * - Layout and orientation controls
 * - Error handling
 * - Dynamic data updates
 * - Best practices for using the graph viewer
 */

export function GraphLoadingExample() {
  // State management
  const [data, setData] = useState<NodeWithEdge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [layout, setLayout] = useState(Graph_Layout.Hierarchic);
  const [orientation, setOrientation] = useState(GraphOrientation.Top_to_Bottom);

  // Simulate fetching data from API
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // In a real application, you would fetch from your API:
        // const response = await fetch('/api/graph-data');
        // const apiData = await response.json();

        // For this example, we'll create sample data
        const sampleData: NodeWithEdge = {
          nodes: [
            {
              id: '1',
              name: 'Global Holdings Corp',
              businessType: BusinessType.Ultimate_Parent_Entity,
              entityCode: 'GHC-001',
              incorporationJurisdiction: 'United States',
            },
            {
              id: '2',
              name: 'Tech Solutions Inc',
              businessType: BusinessType.Company,
              entityCode: 'TSI-002',
              incorporationJurisdiction: 'Delaware, USA',
            },
            {
              id: '3',
              name: 'Finance Services Ltd',
              businessType: BusinessType.Company,
              entityCode: 'FSL-003',
              incorporationJurisdiction: 'United Kingdom',
            },
            {
              id: '4',
              name: 'Manufacturing Co',
              businessType: BusinessType.Company,
              entityCode: 'MFC-004',
              incorporationJurisdiction: 'Germany',
            },
            {
              id: '5',
              name: 'Asia Pacific Branch',
              businessType: BusinessType.Branch_Site_Service_PE,
              entityCode: 'APB-005',
              incorporationJurisdiction: 'Singapore',
            },
            {
              id: '6',
              name: 'European Finance Branch',
              businessType: BusinessType.Finance_Branch,
              entityCode: 'EFB-006',
              incorporationJurisdiction: 'Luxembourg',
            },
            {
              id: '7',
              name: 'Investment Trust',
              businessType: BusinessType.Pass_Through_Entity,
              entityCode: 'INV-007',
              incorporationJurisdiction: 'Cayman Islands',
            },
          ],
          edges: [
            {
              id: 'e1',
              fromNode: '1',
              toNode: '2',
              percentage: 100,
            },
            {
              id: 'e2',
              fromNode: '1',
              toNode: '3',
              percentage: 75,
            },
            {
              id: 'e3',
              fromNode: '1',
              toNode: '4',
              percentage: 51,
            },
            {
              id: 'e4',
              fromNode: '2',
              toNode: '5',
              percentage: 100,
            },
            {
              id: 'e5',
              fromNode: '3',
              toNode: '6',
              percentage: 100,
            },
            {
              id: 'e6',
              fromNode: '4',
              toNode: '7',
              percentage: 50,
            },
            {
              id: 'e7',
              fromNode: '3',
              toNode: '7',
              percentage: 50,
            },
          ],
        };

        setData(sampleData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load graph data');
        console.error('Error loading graph:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGraphData();
  }, []); // Empty dependency array means this runs once on mount

  // Handle layout change
  const handleLayoutChange = (newLayout: string) => {
    setLayout(newLayout);
  };

  // Handle orientation change
  const handleOrientationChange = (newOrientation: string) => {
    setOrientation(newOrientation);
  };

  // Render loading state
  if (loading) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              border: '5px solid #e9ecef',
              borderTop: '5px solid #007bff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px',
            }}
          />
          <p style={{ fontSize: '18px', color: '#6c757d' }}>Loading graph data...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
            maxWidth: '400px',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              color: '#dc3545',
              marginBottom: '20px',
            }}
          >
            ⚠️
          </div>
          <h2 style={{ color: '#dc3545', marginBottom: '10px' }}>Error Loading Graph</h2>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render empty state
  if (!data || data.nodes.length === 0) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>📊</div>
          <h2 style={{ color: '#6c757d', marginBottom: '10px' }}>No Graph Data</h2>
          <p style={{ color: '#adb5bd' }}>No nodes or edges available to display.</p>
        </div>
      </div>
    );
  }

  // Render the graph with controls
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '16px 24px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #dee2e6',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '24px', color: '#212529' }}>
          Corporate Ownership Structure
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#6c757d' }}>
          Interactive graph visualization with dynamic controls
        </p>
      </div>

      {/* Control Panel */}
      <ControlPanel
        layout={layout}
        orientation={orientation}
        onLayoutChange={handleLayoutChange}
        onOrientationChange={handleOrientationChange}
      />

      {/* Graph Viewer */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <StandaloneGraphViewer
          data={data}
          layout={layout}
          orientation={orientation}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffff',
          }}
        />
      </div>

      {/* Info Panel */}
      <InfoPanel nodeCount={data.nodes.length} edgeCount={data.edges.length} />
    </div>
  );
}

export default GraphLoadingExample;


// ==================== USAGE EXAMPLES ====================

/**
 * EXAMPLE 1: Basic Usage (Minimal Setup)
 * 
 * import { GraphLoadingExample } from './graph/GraphLoadingExample';
 * 
 * function App() {
 *   return <GraphLoadingExample />;
 * }
 */

/**
 * EXAMPLE 2: With Your Own Data
 * 
 * import { useState } from 'react';
 * import { StandaloneGraphViewer, BusinessType } from './graph';
 * import type { NodeWithEdge } from './graph';
 * 
 * function MyGraph() {
 *   const [data] = useState<NodeWithEdge>({
 *     nodes: [
 *       { 
 *         id: '1', 
 *         name: 'Parent Company',
 *         businessType: BusinessType.Company,
 *         entityCode: 'PC-001',
 *         incorporationJurisdiction: 'United States'
 *       },
 *       { 
 *         id: '2', 
 *         name: 'Subsidiary',
 *         businessType: BusinessType.Company,
 *         entityCode: 'SUB-002',
 *         incorporationJurisdiction: 'Delaware, USA'
 *       }
 *     ],
 *     edges: [
 *       { fromNode: '1', toNode: '2', percentage: 100 }
 *     ]
 *   });
 * 
 *   return (
 *     <div style={{ width: '100%', height: '600px' }}>
 *       <StandaloneGraphViewer data={data} />
 *     </div>
 *   );
 * }
 */

/**
 * EXAMPLE 3: Fetching from Real API
 * 
 * import { useState, useEffect } from 'react';
 * import { StandaloneGraphViewer, BusinessType } from './graph';
 * import type { NodeWithEdge } from './graph';
 * 
 * function APIGraph() {
 *   const [data, setData] = useState<NodeWithEdge | null>(null);
 * 
 *   useEffect(() => {
 *     fetch('https://api.example.com/graph')
 *       .then(res => res.json())
 *       .then(apiData => {
 *         // Transform your API data to match NodeWithEdge structure
 *         const graphData: NodeWithEdge = {
 *           nodes: apiData.items.map(item => ({
 *             id: item.id,
 *             name: item.name,
 *             businessType: item.businessType || BusinessType.Company,
 *             entityCode: item.entityCode,
 *             incorporationJurisdiction: item.jurisdiction
 *           })),
 *           edges: apiData.relationships.map(rel => ({
 *             id: rel.id,
 *             fromNode: rel.source,
 *             toNode: rel.target,
 *             percentage: rel.ownership || 100
 *           }))
 *         };
 *         setData(graphData);
 *       });
 *   }, []);
 * 
 *   if (!data) return <div>Loading...</div>;
 * 
 *   return (
 *     <div style={{ width: '100%', height: '600px' }}>
 *       <StandaloneGraphViewer data={data} />
 *     </div>
 *   );
 * }
 */

/**
 * EXAMPLE 4: With All Controls and Features
 * 
 * This is what the GraphLoadingExample component above demonstrates.
 * It includes:
 * - Loading states
 * - Error handling
 * - Control Panel for layout/orientation
 * - Info Panel for statistics
 * - Proper styling and layout
 * - Best practices for state management
 */

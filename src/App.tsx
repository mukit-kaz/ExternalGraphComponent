import { useState } from 'react'
import { 
  StandaloneGraphViewer, 
  dummyGraphData,
  Graph_Layout,
  GraphOrientation,
  getDefaultLayoutControll,
  type NodeWithEdge,
} from './graph'
import { ControlPanel, InfoPanel } from './graph/components'

function App() {
  const [graphData] = useState<NodeWithEdge>(dummyGraphData)
  const [layout, setLayout] = useState(Graph_Layout.Hierarchic)
  const [orientation, setOrientation] = useState(GraphOrientation.Top_to_Bottom)
  const customConfig = getDefaultLayoutControll()

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      <ControlPanel 
        layout={layout}
        orientation={orientation}
        onLayoutChange={setLayout}
        onOrientationChange={setOrientation}
      />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <StandaloneGraphViewer
          data={graphData}
          layout={layout}
          orientation={orientation}
          layoutControll={customConfig}
        />
      </div>

      <InfoPanel 
        nodeCount={graphData.nodes.length}
        edgeCount={graphData.edges.length}
      />
    </div>
  )
}

export default App

import './App.css'
import ExternalOrgchartComponent from './components/ExternalOrgchartComponent'
import { dummyOrgchartConfig } from './data/dummyOrgchartData'
import type { ExternalNodeType, LayoutType } from './types/ExternalOrgchartTypes'

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ExternalOrgchartComponent
        config={dummyOrgchartConfig}
        callbacks={{
          onNodeClick: (node: ExternalNodeType) => console.log('Node clicked:', node),
          onLayoutChange: (layout: LayoutType) => console.log('Layout changed:', layout),
        }}
      />
    </div>
  )
}

export default App

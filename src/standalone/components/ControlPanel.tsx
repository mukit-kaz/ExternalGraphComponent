import { Graph_Layout, GraphOrientation } from '../'

interface ControlPanelProps {
  layout: string
  orientation: string
  onLayoutChange: (layout: string) => void
  onOrientationChange: (orientation: string) => void
}

export function ControlPanel({ 
  layout, 
  orientation, 
  onLayoutChange, 
  onOrientationChange 
}: ControlPanelProps) {
  return (
    <div style={{ 
      padding: '12px 16px', 
      backgroundColor: '#f8f9fa', 
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#212529' }}>
        Corporate Structure Graph
      </h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label style={{ fontSize: '14px', color: '#495057' }}>Layout:</label>
        <select 
          value={layout} 
          onChange={(e) => onLayoutChange(e.target.value)}
          style={{ 
            padding: '6px 10px', 
            fontSize: '14px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            backgroundColor: 'white',
            color: '#212529',
            cursor: 'pointer'
          }}
        >
          <option value={Graph_Layout.Hierarchic} style={{ backgroundColor: 'white', color: '#212529' }}>Hierarchic</option>
          <option value={Graph_Layout.Tree} style={{ backgroundColor: 'white', color: '#212529' }}>Tree</option>
          <option value={Graph_Layout.Circular} style={{ backgroundColor: 'white', color: '#212529' }}>Circular</option>
          <option value={Graph_Layout.Orthogonal} style={{ backgroundColor: 'white', color: '#212529' }}>Orthogonal</option>
          <option value={Graph_Layout.Organic} style={{ backgroundColor: 'white', color: '#212529' }}>Organic</option>
        </select>
      </div>

      {(layout === Graph_Layout.Hierarchic || layout === Graph_Layout.Tree) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#495057' }}>Orientation:</label>
          <select 
            value={orientation} 
            onChange={(e) => onOrientationChange(e.target.value)}
            style={{ 
              padding: '6px 10px', 
              fontSize: '14px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              backgroundColor: 'white',
              color: '#212529',
              cursor: 'pointer'
            }}
          >
            <option value={GraphOrientation.Top_to_Bottom} style={{ backgroundColor: 'white', color: '#212529' }}>Top to Bottom</option>
            <option value={GraphOrientation.Bottom_to_Top} style={{ backgroundColor: 'white', color: '#212529' }}>Bottom to Top</option>
            <option value={GraphOrientation.Left_to_Right} style={{ backgroundColor: 'white', color: '#212529' }}>Left to Right</option>
            <option value={GraphOrientation.Right_to_Left} style={{ backgroundColor: 'white', color: '#212529' }}>Right to Left</option>
          </select>
        </div>
      )}
    </div>
  )
}

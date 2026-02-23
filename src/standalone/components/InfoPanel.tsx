interface InfoPanelProps {
  nodeCount: number
  edgeCount: number
}

export function InfoPanel({ nodeCount, edgeCount }: InfoPanelProps) {
  return (
    <div style={{ 
      padding: '10px 16px', 
      backgroundColor: '#f8f9fa', 
      borderTop: '1px solid #dee2e6',
      fontSize: '13px',
      color: '#6c757d',
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    }}>
      <span><strong>Nodes:</strong> {nodeCount}</span>
      <span><strong>Edges:</strong> {edgeCount}</span>
      <span style={{ marginLeft: 'auto', fontStyle: 'italic' }}>
        💡 Drag to pan • Scroll to zoom • Click to select
      </span>
    </div>
  )
}

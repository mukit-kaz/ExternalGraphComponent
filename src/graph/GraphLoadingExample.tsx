import { useState, useEffect } from 'react'
import {
  StandaloneGraphViewer,
  Graph_Layout,
  GraphOrientation,
  getDefaultLayoutControll,
  processCompanyChartApiResponse,
  type NodeWithEdge,
} from './index'
import { ControlPanel, InfoPanel } from './components'

const API_ENDPOINT = 'https://regplusnest.api.kaz.com.bd/api/CompanyData/Charts'
const CHART_ID = '835'
const BEARER_TOKEN = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI0Mjc5NDkzZi0yZmRjLTQ5MWYtYWIxZC02M2FmYjRlYzczNTgiLCJlbWFpbCI6ImRlbW9AcmVnYW5hbHl0aWNzLmNvbSIsIm5hbWUiOiJkZW1vQHJlZ2FuYWx5dGljcy5jb20iLCJUcGFVc2VyVHlwZSI6IkVtcGx1cyIsIld0YVVzZXJUeXBlIjoiRW1wbHVzIiwiU3Vic2NyaWJlZEZlYXR1cmVzIjoiW1wiU2FsZXNQZXJzb25cIixcIkRvY3VtZW50ZXJcIl0iLCJyb2xlIjoiVXNlciIsIm5iZiI6MTc3MTkxMDU2NSwiZXhwIjoxNzcxOTk2OTY1LCJpYXQiOjE3NzE5MTA1NjUsImlzcyI6Imh0dHBzOi8vcmVncGx1cy5rYXouY29tLmJkIn0.9b87wF-B4bpTzD6B_MbfEXtWZVbyWB1f4EfLe3uZqW4lLTjglpFypA2_L8b04hRL68USa2cNW6w9zK7N5_OgVw'

/**
 * GraphLoadingExample - API-driven example for rendering the graph viewer.
 */
export function GraphLoadingExample() {
  const [graphData, setGraphData] = useState<NodeWithEdge | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [layout, setLayout] = useState(Graph_Layout.Hierarchic)
  const [orientation, setOrientation] = useState(GraphOrientation.Top_to_Bottom)
  const customConfig = getDefaultLayoutControll()

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`${API_ENDPOINT}/${CHART_ID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }

        const apiResponse = await response.json()
        const mappedData = processCompanyChartApiResponse(apiResponse)
        setGraphData(mappedData)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        setError(errorMessage)
        console.error('Chart loading error:', err)
      } finally {
        setLoading(false)
      }
    }

    loadChartData()
  }, [])

  if (loading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        Loading organization chart...
      </div>
    )
  }

  if (error && !graphData) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '18px',
        gap: '20px',
        backgroundColor: '#fff3cd',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: '20px',
        textAlign: 'center',
      }}>
        <div style={{ color: '#856404' }}>
          <strong>Error loading chart:</strong>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!graphData) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        backgroundColor: '#f5f5f5',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        No chart data available
      </div>
    )
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden'
    }}>
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px 20px',
          fontSize: '14px',
          borderBottom: '1px solid #f5c6cb',
        }}>
          ⚠️ {error}
        </div>
      )}

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

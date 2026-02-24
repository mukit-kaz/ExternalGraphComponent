# API Data Loading Instructions for Company Organization Chart

This document provides comprehensive instructions for fetching data from the Company Charts API and rendering it in the graph viewer.


## Overview

The Company Charts API endpoint returns a list of entities in an organizational structure. Each entity contains:
- Basic information (Code, Name, jurisdiction details)
- Ownership relationships (EntityOwnerList)
- Business classification (BusinessType)
- Tax information (TaxResidenceJurisdiction)

This data is transformed into node and edge structures suitable for graph visualization.

---

## Input Fields

Assume the following object is already available in your app:

```json
{
  "userEmail": "demo@reganalytics.com",
  "bearerToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiI0Mjc5NDkzZi0yZmRjLTQ5MWYtYWIxZC02M2FmYjRlYzczNTgiLCJlbWFpbCI6ImRlbW9AcmVnYW5hbHl0aWNzLmNvbSIsIm5hbWUiOiJkZW1vQHJlZ2FuYWx5dGljcy5jb20iLCJUcGFVc2VyVHlwZSI6IkVtcGx1cyIsIld0YVVzZXJUeXBlIjoiRW1wbHVzIiwiU3Vic2NyaWJlZEZlYXR1cmVzIjoiW1xcXCJTYWxlc1BlcnNvblxcXCIsXFxcIkRvY3VtZW50ZXJcXFwiXVwiLCJyb2xlIjoiVXNlciIsIm5iZiI6MTc3MTU4NzkwNywiZXhwIjoxNzcxNjc0MzA3LCJpYXQiOjE3NzE1ODc5MDcsImlzcyI6Imh0dHBzOi8vcmVncGx1cy5rYXouY29tLmJkIn0.VKBOkukRED72JQxCWMZqd9gOE2wBjbliQZWMgbMMrJ5iYtNXndpuuR4msEJgmsvsXmYcC1iweoIme40kHWn2Kg",
  "chartObject": {
    "chartName": "MG Group-P2 Test",
    "chartId": "825"
  }
}
```

### Field Usage

- Use `chartObject.chartId` to build the API URL.
- Use `bearerToken` in the `Authorization` header as `Bearer {token}`.

---

## API Request

### API Endpoint

```
GET https://regplusnest.api.kaz.com.bd/api/CompanyData/Charts/{ChartId}
```

### Required Headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer {bearerToken}` |
| `Content-Type` | `application/json` |

### Request Example

```typescript
async function fetchCompanyChartData(
  chartId: string,
  bearerToken: string
): Promise<ApiEntityData[]> {
  const url = `https://regplusnest.api.kaz.com.bd/api/CompanyData/Charts/${chartId}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `API Error: ${response.status} ${response.statusText}`
    );
  }

  const data: ApiEntityData[] = await response.json();
  return data;
}
```

### API Response Structure

The API returns an array of entities:

```json
[
  {
    "ChartId": 817,
    "Id": 11969,
    "Code": "1",
    "Name": "AU",
    "IncorporationJurisdiction": "Australia",
    "EntityOwnerList": [
      {
        "OwnerName": "Parent",
        "OwnerPercentage": 100.00
      }
    ],
    "EntityTaxList": [],
    "BusinessType": "Ultimate Parent Entity (UPE)",
    "TaxResidenceJurisdiction": "Australia",
    "SubNational": "",
    "BusinessSICCode": "2099"
  },
  {
    "ChartId": 817,
    "Id": 11973,
    "Code": "5",
    "Name": "PK",
    "IncorporationJurisdiction": "Pakistan",
    "EntityOwnerList": [
      {
        "OwnerName": "AU",
        "OwnerPercentage": 100.00
      }
    ],
    "EntityTaxList": [],
    "BusinessType": "Company",
    "TaxResidenceJurisdiction": "Pakistan",
    "SubNational": "",
    "BusinessSICCode": "2099"
  }
]
```

---

## Data Mapping

### Overview

The `processCompanyChartApiResponse` function is a simple, one-step converter:

**Raw API Response → NodeWithEdge (ready to render)**

Just pass the API response to the mapper and get graph data ready for the component props.

### Mapping Logic

The API response is transformed into graph-compatible format using the `processCompanyChartApiResponse` function:

#### Node Mapping

Each entity in the API response becomes a node:

| Graph Property | API Field |
|---|---|
| `id` | `Name` |
| `name` | `Name` |
| `businessType` | `BusinessType` |
| `entityCode` | `Code` |
| `incorporationJurisdiction` | `IncorporationJurisdiction` |
| `taxResidenceJurisdiction` | `TaxResidenceJurisdiction` |
| `subNational` | `SubNational` |
| `sicCode` | `BusinessSICCode` |
| `databaseId` | `Id` |

Example node output:
```typescript
{
  id: "AU",
  name: "AU",
  businessType: "Ultimate Parent Entity (UPE)",
  entityCode: "1",
  incorporationJurisdiction: "Australia",
  taxResidenceJurisdiction: "Australia",
  subNational: "",
  sicCode: "2099",
  databaseId: "11969"
}
```

#### Edge Mapping

Relationships are built by scanning the `EntityOwnerList` of each entity:

| Graph Property | Derivation |
|---|---|
| `id` | Concatenation of owner name and entity name (e.g., "AUPK") |
| `fromNode` | `EntityOwnerList[].OwnerName` (owner/parent entity) |
| `toNode` | Entity `Name` (owned/child entity) |
| `percentage` | `EntityOwnerList[].OwnerPercentage` |

**Special Case**: When `OwnerName` is "Parent", the entity is a root node with no incoming edges.

Example edge output:
```typescript
{
  id: "AUPK",
  fromNode: "AU",
  toNode: "PK",
  percentage: 100
}
```

### Mapping Implementation

#### Single Function: `processCompanyChartApiResponse`

This is the main function for API integration. It takes the raw API response and returns `NodeWithEdge` ready for the component:

```typescript
import { processCompanyChartApiResponse } from './graph';

async function loadChartData(
  chartId: string,
  bearerToken: string
): Promise<NodeWithEdge> {
  // Fetch from API
  const apiResponse = await fetch(
    `https://regplusnest.api.kaz.com.bd/api/CompanyData/Charts/${chartId}`,
    {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    }
  ).then(r => {
    if (!r.ok) throw new Error(`API Error: ${r.status}`);
    return r.json();
  });
  
  // Map to graph format
  const graphData = processCompanyChartApiResponse(apiResponse);
  
  // Return ready-to-use data
  return graphData;
}
```

---

## Error Handling

### API Request Errors

```typescript
async function fetchWithErrorHandling(
  chartId: string,
  bearerToken: string
): Promise<NodeWithEdge | null> {
  try {
    const apiResponse = await fetchCompanyChartData(chartId, bearerToken);
    
    if (!Array.isArray(apiResponse) || apiResponse.length === 0) {
      throw new Error('Invalid API response: empty or malformed data');
    }
    
    return mapApiResponseToGraphData(apiResponse);
    
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error:', error.message);
      // Handle offline scenario
    } else if (error instanceof Error && error.message.includes('401')) {
      console.error('Unauthorized: Invalid or expired token');
      // Handle token refresh
    } else if (error instanceof Error && error.message.includes('404')) {
      console.error('Chart not found');
      // Handle missing chart
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
}
```

---

## Complete Integration Example

Use the built-in example component and render it from App.tsx.

```typescript
import { GraphLoadingExample } from './graph';

function App() {
  return <GraphLoadingExample />;
}
```

### Simplified Flow (Alternative)

If you want a minimal integration without using the example component:

```typescript
import { processCompanyChartApiResponse } from './graph';
import type { NodeWithEdge } from './graph';

export function OrganizationChartPage({ chartId, bearerToken }: { chartId: string; bearerToken: string }) {
  const [graphData, setGraphData] = useState<NodeWithEdge | null>(null);

  useEffect(() => {
    fetch(
      `https://regplusnest.api.kaz.com.bd/api/CompanyData/Charts/${chartId}`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(r => r.json())
      .then(apiResponse => {
        const data = processCompanyChartApiResponse(apiResponse);
        setGraphData(data);
      })
      .catch(error => console.error('Failed to load chart:', error));
  }, [chartId, bearerToken]);

  return graphData ? <StandaloneGraphViewer data={graphData} /> : <div>Loading...</div>;
}
```

---

## Step-by-Step Workflow

### Simple 5-Step Flow

```
1. Fetch from API
   ↓
2. Call processCompanyChartApiResponse(apiResponse)
   ↓
3. Get NodeWithEdge data
   ↓
4. Set state
   ↓
5. <StandaloneGraphViewer data={graphData} />
```

### Detailed Breakdown

| Step | Input | Process | Output |
|------|-------|---------|--------|
| 1 | chartId, bearerToken | HTTP GET request with Bearer auth | API array response |
| 2 | API array response | processCompanyChartApiResponse() | NodeWithEdge object |
| 3 | NodeWithEdge | setGraphData(data) | State updated |
| 4 | graphData state | Component render | Graph rendered on screen |

---

## Tips and Best Practices

- **Direct integration**: Just fetch API data → `processCompanyChartApiResponse()` → pass to component
- **Error handling**: Wrap API call in try-catch to handle network and parsing errors
- **Token Expiration**: Implement token refresh logic if tokens expire during use
- **Large Datasets**: For organizations with 1000+ entities, consider pagination or filtering
- **Caching**: Cache API responses to reduce network requests
- **Error Recovery**: Provide users with fallback UI when data loading fails
- **Performance**: Use the `filterGraphData` utility to create sub-views for large charts

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Token may be expired; re-authenticate or refresh token |
| 404 Not Found | Verify chartId is correct and exists |
| Empty response | Confirm API endpoint and chartId are correct |
| Validation errors | Check that all OwnerNames reference existing entities |
| Node display issues | Ensure entity Names are unique; use databaseId if conflicts occur |


# API Design Specification

## Overview

TT-Pro API Design for backend services. Current implementation is client-side focused, but this document outlines the REST API structure for future backend development.

**Version**: 1.0.0  
**Base URL**: `https://api.tt-pro.example.com/v1`  
**Authentication**: Bearer Token (JWT)  
**Content-Type**: `application/json`

---

## Authentication

All API endpoints (except `/auth/*`) require authentication via JWT token in the Authorization header.

```http
Authorization: Bearer <JWT_TOKEN>
```

### Auth Endpoints

#### POST /auth/register

Register a new user account.

**Request Body**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "ftp": "number",
  "weightKg": "number",
  "heightCm": "number"
}
```

**Response** (201 Created):

```json
{
  "uid": "uid_001",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

#### POST /auth/login

Authenticate existing user.

**Request Body**:

```json
{
  "email": "string",
  "password": "string"
}
```

**Response** (200 OK):

```json
{
  "uid": "uid_001",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

---

## User Endpoints

### GET /users/me

Get current user profile.

**Response** (200 OK):

```json
{
  "uid": "uid_001",
  "name": "Rider One",
  "email": "rider1@example.com",
  "ftp": 280,
  "weightKg": 68.5,
  "heightCm": 178,
  "createdAt": "2023-01-15T08:30:00Z",
  "lastUpdated": "2023-10-25T14:22:00Z"
}
```

### PUT /users/me

Update current user profile.

**Request Body**:

```json
{
  "name": "string (optional)",
  "ftp": "number (optional)",
  "weightKg": "number (optional)",
  "heightCm": "number (optional)"
}
```

**Response** (200 OK):

```json
{
  "uid": "uid_001",
  "name": "Rider One",
  "ftp": 285,
  "weightKg": 68.0,
  "heightCm": 178,
  "lastUpdated": "2023-11-01T10:15:00Z"
}
```

---

## Training Endpoints

### GET /training/menus

Get all training menu templates.

**Query Parameters**:
- `type` (optional): Filter by training type (FTP, VO2Max, Endurance, Recovery)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

**Response** (200 OK):

```json
{
  "data": [
    {
      "id": "menu_001",
      "title": "2x20min FTP Intervals",
      "type": "FTP",
      "durationMin": 90,
      "tss": 85,
      "description": "Classic threshold work...",
      "createdBy": "system"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### GET /training/menus/:id

Get specific training menu by ID.

**Response** (200 OK):

```json
{
  "id": "menu_001",
  "title": "2x20min FTP Intervals",
  "type": "FTP",
  "durationMin": 90,
  "tss": 85,
  "description": "Classic threshold work. Warm up 20m, 2x20m at 100% FTP with 5m rest, Cool down.",
  "createdBy": "system"
}
```

### POST /training/menus

Create custom training menu (user-created).

**Request Body**:

```json
{
  "title": "Custom Sweetspot",
  "type": "FTP",
  "durationMin": 75,
  "tss": 70,
  "description": "3x15min at 88-93% FTP"
}
```

**Response** (201 Created):

```json
{
  "id": "menu_custom_123",
  "title": "Custom Sweetspot",
  "type": "FTP",
  "durationMin": 75,
  "tss": 70,
  "description": "3x15min at 88-93% FTP",
  "createdBy": "uid_001"
}
```

---

## Training Logs Endpoints

### GET /training/logs

Get user's training logs.

**Query Parameters**:
- `startDate` (optional): ISO 8601 date (e.g., 2023-10-01)
- `endDate` (optional): ISO 8601 date
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response** (200 OK):

```json
{
  "data": [
    {
      "id": "log_101",
      "userId": "uid_001",
      "date": "2023-10-25",
      "menuId": "menu_ftp_01",
      "actualDurationMin": 92,
      "actualTss": 82,
      "avgPower": 245,
      "normalizedPower": 268,
      "notes": "Felt strong",
      "createdAt": "2023-10-25T19:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8
  }
}
```

### POST /training/logs

Create new training log entry.

**Request Body**:

```json
{
  "date": "2023-11-01",
  "menuId": "menu_ftp_01",
  "actualDurationMin": 90,
  "actualTss": 85,
  "avgPower": 250,
  "normalizedPower": 270,
  "notes": "Good session"
}
```

**Response** (201 Created):

```json
{
  "id": "log_157",
  "userId": "uid_001",
  "date": "2023-11-01",
  "menuId": "menu_ftp_01",
  "actualDurationMin": 90,
  "actualTss": 85,
  "avgPower": 250,
  "normalizedPower": 270,
  "notes": "Good session",
  "createdAt": "2023-11-01T20:10:00Z"
}
```

### GET /training/logs/:id

Get specific training log.

**Response** (200 OK):

```json
{
  "id": "log_101",
  "userId": "uid_001",
  "date": "2023-10-25",
  "menuId": "menu_ftp_01",
  "menu": {
    "title": "2x20min FTP Intervals",
    "type": "FTP"
  },
  "actualDurationMin": 92,
  "actualTss": 82,
  "avgPower": 245,
  "normalizedPower": 268,
  "notes": "Felt strong",
  "createdAt": "2023-10-25T19:45:00Z"
}
```

### DELETE /training/logs/:id

Delete training log.

**Response** (204 No Content)

---

## Aero Analysis Endpoints

### GET /aero/sessions

Get user's aero analysis sessions.

**Query Parameters**:
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response** (200 OK):

```json
{
  "data": [
    {
      "id": "as_552",
      "userId": "uid_001",
      "timestamp": 1698220000,
      "videoUrl": "https://storage.example.com/videos/as_552.mp4",
      "analysisResults": {
        "estimatedCdA": 0.235,
        "avgHipAngle": 45.3,
        "positionScore": 82
      },
      "notes": "New aero bars setup"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "totalPages": 1
  }
}
```

### POST /aero/sessions

Create new aero analysis session.

**Request Body** (multipart/form-data):
- `video`: File upload (video file)
- `notes`: String (optional)

**Response** (201 Created):

```json
{
  "id": "as_553",
  "userId": "uid_001",
  "timestamp": 1698230000,
  "videoUrl": "https://storage.example.com/videos/as_553.mp4",
  "status": "processing",
  "estimatedProcessingTime": 120
}
```

### GET /aero/sessions/:id

Get specific aero session with full analysis results.

**Response** (200 OK):

```json
{
  "id": "as_552",
  "userId": "uid_001",
  "timestamp": 1698220000,
  "videoUrl": "https://storage.example.com/videos/as_552.mp4",
  "videoMetadata": {
    "durationSec": 120,
    "fps": 30,
    "resolution": "1920x1080"
  },
  "analysisResults": {
    "estimatedCdA": 0.235,
    "avgHipAngle": 45.3,
    "positionScore": 82
  },
  "frameData": [
    {
      "frameNumber": 1,
      "hipAngle": 44.5,
      "markerX": 640,
      "markerY": 360
    }
  ],
  "notes": "New aero bars setup"
}
```

### POST /aero/calculate-cda

Calculate virtual CdA from ride data.

**Request Body**:

```json
{
  "power": 300,
  "speedKmh": 40,
  "crr": 0.004,
  "airDensity": 1.225,
  "weightKg": 75,
  "elevationGainM": 0
}
```

**Response** (200 OK):

```json
{
  "estimatedCdA": 0.242,
  "calculation": {
    "aeroPower": 285,
    "rollingResistancePower": 15,
    "gravitationalPower": 0
  },
  "confidence": "medium",
  "notes": "Calculation assumes flat terrain and no wind"
}
```

---

## Weight Tracking Endpoints

### GET /weight/history

Get user's weight history.

**Query Parameters**:
- `startDate` (optional): ISO 8601 date
- `endDate` (optional): ISO 8601 date
- `limit` (optional): Number of records (default: 100)

**Response** (200 OK):

```json
{
  "data": [
    {
      "id": "wh_001",
      "userId": "uid_001",
      "date": "2023-06-01",
      "weight": 67.5,
      "bodyFatPercentage": 8.5,
      "notes": "Morning weight"
    },
    {
      "id": "wh_002",
      "userId": "uid_001",
      "date": "2023-05-01",
      "weight": 67.9,
      "bodyFatPercentage": 9.0
    }
  ]
}
```

### POST /weight/history

Add weight measurement.

**Request Body**:

```json
{
  "date": "2023-11-01",
  "weight": 67.2,
  "bodyFatPercentage": 8.2,
  "notes": "Post-race weight"
}
```

**Response** (201 Created):

```json
{
  "id": "wh_123",
  "userId": "uid_001",
  "date": "2023-11-01",
  "weight": 67.2,
  "bodyFatPercentage": 8.2,
  "notes": "Post-race weight"
}
```

---

## Race Endpoints

### GET /races

Get race profiles.

**Query Parameters**:
- `type` (optional): Filter by race type (Flat, Hilly, Mountain, TT)
- `upcoming` (optional): Boolean, show only future races

**Response** (200 OK):

```json
{
  "data": [
    {
      "id": "r1",
      "name": "Mt. Fuji Hillclimb",
      "distanceKm": 24,
      "elevationGainM": 1255,
      "type": "Mountain",
      "description": "Constant gradient averaging 5.2%",
      "location": {
        "country": "Japan",
        "region": "Shizuoka"
      },
      "dateScheduled": "2024-07-15"
    }
  ]
}
```

### GET /races/:id

Get specific race profile.

**Response** (200 OK):

```json
{
  "id": "r1",
  "name": "Mt. Fuji Hillclimb",
  "distanceKm": 24,
  "elevationGainM": 1255,
  "type": "Mountain",
  "description": "Constant gradient averaging 5.2%. Aerodynamics matter less than W/kg.",
  "location": {
    "country": "Japan",
    "region": "Shizuoka",
    "coordinates": {
      "lat": 35.3606,
      "lng": 138.7274
    }
  },
  "dateScheduled": "2024-07-15"
}
```

---

## AI Strategy Endpoints

### POST /ai/race-strategy

Generate AI-powered race strategy.

**Request Body**:

```json
{
  "raceId": "r1",
  "userFtp": 280,
  "userWeight": 68.5
}
```

**Response** (200 OK):

```json
{
  "id": "strat_001",
  "raceId": "r1",
  "generatedAt": "2023-11-01T10:00:00Z",
  "strategyContent": {
    "pacingPlan": "Start conservatively at 250W for first 5km...",
    "gearRecommendations": "Medium-depth wheels (50mm), 25mm tires at 80psi...",
    "nutritionPlan": "60g carbs/hour, consume gel every 20 minutes...",
    "aeroFocus": "Focus on steady power delivery rather than aero position on steep sections..."
  },
  "aiModel": "gemini-2.5-flash"
}
```

### POST /ai/generate-workout

Generate race-specific workout plan.

**Request Body**:

```json
{
  "raceId": "r1"
}
```

**Response** (200 OK):

```json
{
  "workoutName": "Mt. Fuji Specific Intervals",
  "totalDuration": 120,
  "warmup": "20 minutes progressive to Zone 2",
  "mainSet": "4x8min at 95% FTP (5.2% gradient simulation) with 4min recovery",
  "cooldown": "15 minutes easy spin",
  "rationale": "Simulates sustained climbing effort at race gradient to build specific strength",
  "generatedAt": "2023-11-01T10:05:00Z",
  "aiModel": "gemini-2.5-flash"
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common Error Codes

| HTTP Status | Code | Description |
|-------------|------|-------------|
| 400 | INVALID_REQUEST | Request body validation failed |
| 401 | UNAUTHORIZED | Missing or invalid authentication token |
| 403 | FORBIDDEN | User lacks permission for resource |
| 404 | NOT_FOUND | Requested resource does not exist |
| 409 | CONFLICT | Resource conflict (e.g., duplicate email) |
| 422 | VALIDATION_ERROR | Data validation failed |
| 429 | RATE_LIMIT_EXCEEDED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |
| 503 | SERVICE_UNAVAILABLE | External service (e.g., Gemini API) unavailable |

---

## Rate Limiting

API requests are rate-limited per user:

- **Standard tier**: 100 requests/minute, 10,000 requests/day
- **Premium tier**: 500 requests/minute, 100,000 requests/day

Rate limit headers are included in responses:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1698230400
```

---

## Webhooks (Future)

TT-Pro will support webhooks for async events:

### Supported Events

- `aero.analysis.completed` - Video analysis finished
- `training.milestone.reached` - User achieves training goal
- `race.reminder` - Race date approaching

### Webhook Payload Example

```json
{
  "event": "aero.analysis.completed",
  "timestamp": "2023-11-01T10:30:00Z",
  "data": {
    "sessionId": "as_553",
    "userId": "uid_001",
    "estimatedCdA": 0.228
  }
}
```

---

## GraphQL API (Alternative, Future)

For complex queries, a GraphQL endpoint may be provided:

```graphql
query GetUserDashboard {
  user {
    name
    ftp
    weightKg
    recentLogs(limit: 5) {
      date
      actualTss
      notes
    }
    aeroSessions(limit: 3) {
      timestamp
      estimatedCdA
    }
  }
}
```

---

## SDK & Client Libraries

Official client libraries (planned):

- **JavaScript/TypeScript**: `@tt-pro/sdk`
- **Python**: `tt-pro-sdk`
- **Swift**: `TTPro` (iOS)

**Example Usage**:

```typescript
import { TTPro } from '@tt-pro/sdk';

const client = new TTPro({ apiKey: 'your_api_key' });

const logs = await client.training.logs.list({
  startDate: '2023-10-01',
  endDate: '2023-10-31'
});
```

---

## API Versioning

TT-Pro uses URL-based versioning:

- Current: `/v1/...`
- Future: `/v2/...`

Deprecated versions will be supported for minimum 12 months after successor release.

---

## OpenAPI Specification

Full OpenAPI 3.0 specification available at:
- JSON: `https://api.tt-pro.example.com/v1/openapi.json`
- YAML: `https://api.tt-pro.example.com/v1/openapi.yaml`
- Interactive Docs: `https://api.tt-pro.example.com/docs`

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-08 | Initial API design specification |

---

## Notes

- All timestamps are in UTC and follow ISO 8601 format
- All endpoints support CORS for web applications
- WebSocket support planned for real-time features
- Current client-side implementation uses Google Gemini API directly
- Backend API to be implemented in Phase 2 of development

# 🗂️ Sessions & Preferences — Postman Guide

> **Base URL:** `http://localhost:3000/api/sessions`

---

## 1. Create Session

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/sessions` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "user": "USER_OBJECT_ID",
  "title": "Design Session #1",
  "preferences": {
    "video": { "resolution": "1080p", "fps": 30 },
    "image": { "style": "photorealistic", "ratio": "16:9" },
    "chat": { "model": "gemini", "temperature": 0.7 }
  }
}
```

> Replace `USER_OBJECT_ID` with a real user `_id`.

**✅ Success (201):** The created session object.

---

## 2. Get All Sessions

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/sessions` |

**✅ Success (200):** Array of sessions (user populated).

---

## 3. Get Session by ID

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/sessions/:id` |

> Replace `:id` with a real session `_id`.

---

## 4. Update Session

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{baseUrl}}/api/sessions/:id` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "title": "Renamed Session"
}
```

---

## 5. Delete Session

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{baseUrl}}/api/sessions/:id` |

**✅ Success (200):** `{ "message": "Session deleted" }`

---

## 6. Get Session Preferences

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/sessions/:id/preferences` |

**✅ Success (200):**
```json
{
  "video": { "resolution": "1080p", "fps": 30 },
  "image": { "style": "photorealistic", "ratio": "16:9" },
  "chat": { "model": "gemini", "temperature": 0.7 }
}
```

---

## 7. Update Session Preferences

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{baseUrl}}/api/sessions/:id/preferences` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):** *(partial update supported)*
```json
{
  "image": { "style": "anime", "ratio": "1:1" }
}
```

**✅ Success (200):** Updated preferences object.

---

## 8. Delete (Reset) Session Preferences

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{baseUrl}}/api/sessions/:id/preferences` |

**✅ Success (200):** `{ "message": "Preferences reset" }`

---

## 📌 Postman Variable

| Variable | Value |
|---|---|
| `baseUrl` | `http://localhost:3000` |

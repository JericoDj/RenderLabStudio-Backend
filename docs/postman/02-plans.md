# 📋 Plans — Postman Guide

> **Base URL:** `http://localhost:3000/api/plans`

---

## 1. Create Plan

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/plans` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "name": "Pro Plan",
  "price": 29.99,
  "durationInDays": 30,
  "limits": {
    "images": 100,
    "videos": 20,
    "messages": 500
  },
  "features": ["HD Export", "Priority Support", "Custom Watermarks"]
}
```

**✅ Success (201):**
```json
{
  "_id": "664f2a...",
  "name": "Pro Plan",
  "price": 29.99,
  "durationInDays": 30,
  "limits": { "images": 100, "videos": 20, "messages": 500 },
  "features": ["HD Export", "Priority Support", "Custom Watermarks"],
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 2. Get All Plans

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/plans` |

**✅ Success (200):** Array of plan objects.

---

## 3. Get Plan by ID

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/plans/:id` |

> Replace `:id` with a real plan `_id`.

---

## 4. Update Plan

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{baseUrl}}/api/plans/:id` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "price": 19.99,
  "features": ["HD Export", "Priority Support"]
}
```

---

## 5. Delete Plan

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{baseUrl}}/api/plans/:id` |

**✅ Success (200):** `{ "message": "Plan deleted" }`

---

## 📌 Postman Variable

| Variable | Value |
|---|---|
| `baseUrl` | `http://localhost:3000` |

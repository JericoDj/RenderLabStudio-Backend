# 💳 Payments — Postman Guide

> **Base URL:** `http://localhost:3000/api/payments`

---

## 1. Create Payment

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/payments` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "user": "USER_OBJECT_ID",
  "plan": "PLAN_OBJECT_ID",
  "amount": 29.99,
  "currency": "USD",
  "status": "pending",
  "providerId": "stripe_pi_abc123",
  "metadata": {
    "source": "web",
    "coupon": "SAVE10"
  }
}
```

> Replace `USER_OBJECT_ID` and `PLAN_OBJECT_ID` with real MongoDB `_id` values.

**✅ Success (201):**
```json
{
  "_id": "664f3a...",
  "user": "USER_OBJECT_ID",
  "plan": "PLAN_OBJECT_ID",
  "amount": 29.99,
  "currency": "USD",
  "status": "pending",
  "providerId": "stripe_pi_abc123",
  "metadata": { "source": "web", "coupon": "SAVE10" },
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 2. Get All Payments

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/payments` |

**✅ Success (200):** Array of payment objects.

---

## 3. Get Payment by ID

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/payments/:id` |

> Replace `:id` with a real payment `_id`.

---

## 4. Update Payment

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{baseUrl}}/api/payments/:id` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "status": "completed"
}
```

---

## 5. Delete Payment

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{baseUrl}}/api/payments/:id` |

**✅ Success (200):** `{ "message": "Payment deleted" }`

---

## 📌 Postman Variable

| Variable | Value |
|---|---|
| `baseUrl` | `http://localhost:3000` |

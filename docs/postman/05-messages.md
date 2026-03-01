# 💬 Messages — Postman Guide

> **Base URL:** `http://localhost:3000/api/messages`

---

## 1. Create Message

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/messages` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "session": "SESSION_OBJECT_ID",
  "user": "USER_OBJECT_ID",
  "role": "user",
  "content": "Generate a sunset landscape in 4K",
  "response": ""
}
```

> - Replace `SESSION_OBJECT_ID` and `USER_OBJECT_ID` with real `_id` values.  
> - `role` accepts: `"user"`, `"assistant"`, or `"system"`.  
> - `response` is optional (for paired message storage).

**✅ Success (201):** The created message object.

---

## 2. Get All Messages

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/messages` |

**✅ Success (200):** Array of message objects.

---

## 3. Get Message by ID

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/messages/:id` |

> Replace `:id` with a real message `_id`.

---

## 4. Update Message

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{baseUrl}}/api/messages/:id` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "content": "Updated message content"
}
```

---

## 5. Delete Message

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{baseUrl}}/api/messages/:id` |

**✅ Success (200):** `{ "message": "Message deleted" }`

---

## 📌 Postman Variable

| Variable | Value |
|---|---|
| `baseUrl` | `http://localhost:3000` |

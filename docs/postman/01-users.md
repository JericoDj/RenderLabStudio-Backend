# 👤 Users & Auth — Postman Guide

> **Base URL:** `http://localhost:3000/api/users`

---

## 1. Register User

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/users/register` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "email": "testuser@example.com",
  "password": "MySecurePass123",
  "name": "Test User"
}
```

**✅ Success (201):**
```json
{
  "_id": "664f1a...",
  "email": "testuser@example.com",
  "name": "Test User",
  "createdAt": "2026-03-01T...",
  "updatedAt": "2026-03-01T..."
}
```

**❌ Error (400):** `{ "message": "User already exists" }`

---

## 2. Login

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/users/login` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "email": "testuser@example.com",
  "password": "MySecurePass123"
}
```

**✅ Success (200):**
```json
{
  "_id": "664f1a...",
  "name": "Test User",
  "email": "testuser@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**❌ Error (400):** `{ "message": "Invalid credentials" }`

---

## 3. Google Login

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/users/google-login` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "email": "googleuser@gmail.com",
  "googleId": "google-uid-abc123",
  "name": "Google User"
}
```

**✅ Success (200):**
```json
{
  "_id": "664f1b...",
  "name": "Google User",
  "email": "googleuser@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 4. Forgot Password (Send OTP)

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/users/forgot-password` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "email": "testuser@example.com"
}
```

**✅ Success (200):** `{ "message": "OTP sent" }`  
**❌ Error (404):** `{ "message": "User not found" }`

---

## 5. Send OTP

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/users/send-otp` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "email": "testuser@example.com"
}
```

**✅ Success (200):** `{ "message": "OTP sent" }`

---

## 6. Reset Password

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/users/reset-password` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "email": "testuser@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePass456"
}
```

**✅ Success (200):** `{ "message": "Password reset successful" }`  
**❌ Error (400):** `{ "message": "Invalid or expired OTP" }`

---

## 7. Get All Users

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/users` |

**✅ Success (200):** Array of user objects (password excluded).

---

## 8. Get Current User

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/users/me` |

> ⚠️ **Note:** Requires auth middleware (not yet implemented). Will return 500 until middleware sets `req.user`.

---

## 9. Create User

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/users` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "email": "newuser@example.com",
  "password": "Password123",
  "name": "New User"
}
```

---

## 10. Update User

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{baseUrl}}/api/users/:id` |
| **Headers** | `Content-Type: application/json` |

> Replace `:id` with a real user `_id`.

**Body (raw JSON):**
```json
{
  "name": "Updated Name"
}
```

---

## 11. Delete User

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{baseUrl}}/api/users/:id` |

> Replace `:id` with a real user `_id`.

**✅ Success (200):** `{ "message": "User deleted" }`

---

## 📌 Postman Variable

Set a **Collection Variable** or **Environment Variable**:

| Variable | Value |
|---|---|
| `baseUrl` | `http://localhost:3000` |

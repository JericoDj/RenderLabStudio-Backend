# 📁 Albums — Postman Guide

> **Base URL:** `http://localhost:3000/api/albums`

---

## 1. Create Album

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/albums` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "user": "USER_OBJECT_ID",
  "title": "Landscape Collection",
  "description": "AI-generated landscape images",
  "coverImage": "https://example.com/cover.jpg"
}
```

> Replace `USER_OBJECT_ID` with a real user `_id`.

**✅ Success (201):** The created album object.

---

## 2. Get All Albums

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/albums` |

**✅ Success (200):** Array of album objects.

---

## 3. Get Albums by User

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/albums/user/:userId` |

> Replace `:userId` with a real user `_id`.

---

## 4. Get Album by ID

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/albums/:id` |

> Replace `:id` with a real album `_id`.

---

## 5. Update Album

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{baseUrl}}/api/albums/:id` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "title": "Updated Album Title",
  "description": "Updated description"
}
```

---

## 6. Delete Album

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{baseUrl}}/api/albums/:id` |

**✅ Success (200):** `{ "message": "Album deleted" }`

---

## 📌 Postman Variable

| Variable | Value |
|---|---|
| `baseUrl` | `http://localhost:3000` |

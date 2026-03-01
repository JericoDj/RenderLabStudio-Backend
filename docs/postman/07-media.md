# 🖼️ Media (Images & Videos) — Postman Guide

> **Base URL:** `http://localhost:3000/api/media`

---

# Images

## 1. Create Image

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/media/images` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "user": "USER_OBJECT_ID",
  "album": "ALBUM_OBJECT_ID",
  "url": "https://storage.example.com/images/sunset.png",
  "storageId": "images/sunset.png",
  "prompt": "A beautiful sunset over the ocean in 4K",
  "metadata": {
    "width": 3840,
    "height": 2160,
    "format": "png"
  }
}
```

> - Replace `USER_OBJECT_ID` and `ALBUM_OBJECT_ID` with real `_id` values.  
> - `album`, `storageId`, `prompt`, `metadata` are optional.

**✅ Success (201):** The created image object.

---

## 2. Get All Images

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/media/images` |

---

## 3. Get Images by User

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/media/images/user/:userId` |

> Replace `:userId` with a real user `_id`.

---

## 4. Get Images by Album

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/media/images/album/:albumId` |

> Replace `:albumId` with a real album `_id`.

---

## 5. Get Image by ID

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/media/images/:id` |

---

## 6. Update Image

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{baseUrl}}/api/media/images/:id` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "prompt": "Updated prompt description"
}
```

---

## 7. Delete Image

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{baseUrl}}/api/media/images/:id` |

**✅ Success (200):** `{ "message": "Image deleted" }`

---

# Videos

## 8. Create Video

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `{{baseUrl}}/api/media/videos` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "user": "USER_OBJECT_ID",
  "album": "ALBUM_OBJECT_ID",
  "url": "https://storage.example.com/videos/intro.mp4",
  "storageId": "videos/intro.mp4",
  "prompt": "A cinematic intro animation",
  "metadata": {
    "duration": 15,
    "resolution": "1080p",
    "format": "mp4"
  }
}
```

**✅ Success (201):** The created video object.

---

## 9. Get All Videos

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/media/videos` |

---

## 10. Get Videos by User

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/media/videos/user/:userId` |

---

## 11. Get Videos by Album

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/media/videos/album/:albumId` |

---

## 12. Get Video by ID

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `{{baseUrl}}/api/media/videos/:id` |

---

## 13. Update Video

| Field | Value |
|---|---|
| **Method** | `PUT` |
| **URL** | `{{baseUrl}}/api/media/videos/:id` |
| **Headers** | `Content-Type: application/json` |

**Body (raw JSON):**
```json
{
  "prompt": "Updated video prompt"
}
```

---

## 14. Delete Video

| Field | Value |
|---|---|
| **Method** | `DELETE` |
| **URL** | `{{baseUrl}}/api/media/videos/:id` |

**✅ Success (200):** `{ "message": "Video deleted" }`

---

## 📌 Postman Variable

| Variable | Value |
|---|---|
| `baseUrl` | `http://localhost:3000` |

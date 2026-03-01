# 📮 RenderLabStudio API — Postman Documentation

> **Base URL:** `http://localhost:3000/api`  
> Set `{{baseUrl}}` to `http://localhost:3000` in your Postman Environment.

---

## Route Guides

| # | File | Prefix | Endpoints |
|---|---|---|---|
| 1 | [01-users.md](./01-users.md) | `/api/users` | Register, Login, Google Login, Forgot/Reset Password, CRUD |
| 2 | [02-plans.md](./02-plans.md) | `/api/plans` | CRUD for subscription plans |
| 3 | [03-payments.md](./03-payments.md) | `/api/payments` | CRUD for payment records |
| 4 | [04-sessions.md](./04-sessions.md) | `/api/sessions` | CRUD + Preferences sub-resource |
| 5 | [05-messages.md](./05-messages.md) | `/api/messages` | CRUD for chat messages |
| 6 | [06-albums.md](./06-albums.md) | `/api/albums` | CRUD + filter by user |
| 7 | [07-media.md](./07-media.md) | `/api/media` | Images & Videos CRUD + filter by user/album |
| 8 | [08-ai.md](./08-ai.md) | `/api/ai` | Improve Prompt, Chat, Signal Check |

---

## Quick Setup

1. Open Postman → **Environments** → Create new
2. Add variable: `baseUrl` = `http://localhost:3000`
3. Select the environment before making requests
4. Start your backend: `npm run dev`
5. Copy any JSON body from the guides above and paste into Postman's **Body → raw → JSON**

# Security Audit - CRUD Routes

Scope: backend Express API under `src/routes`, focused on P2 CRUD routes and auth/input edge cases.

## Auth middleware coverage

| Route group | Methods | Middleware status |
| --- | --- | --- |
| `/api/missions` | GET, POST, PUT, DELETE | Protected by `router.use(requireAuth)` before every route. |
| `/api/vehicles` | GET, POST, PUT, DELETE | Protected by `router.use(requireAuth)` before every route. |
| `/api/intel` | GET, POST, PUT, DELETE | Protected by `router.use(requireAuth)` before every route. |
| `/api/agents` | GET, POST | Protected by `router.use(requireAuth)` before every route. POST now also requires `GODFATHER`. |
| `/api/auth/me`, `/api/auth/logout` | GET, POST | Protected by per-route `requireAuth`. |
| `/api/auth/login`, `/health` | POST, GET | Intentionally public. Login has rate limiting. |

## Edge cases checked

- Missing `Authorization` header returns `401`.
- Malformed `Authorization` header returns `401`.
- Empty bearer token returns `401`.
- Expired JWT returns `401` with `token_expired`.
- Invalid JWT returns `401` with `invalid_token`.
- Token for a deleted/non-existent agent returns `401`.
- Invalid route params like `/api/missions/abc` return `400`.
- Invalid enum filters/status values return `400`.
- Invalid foreign keys return explicit `400` errors (`invalid_assignee`, `invalid_driver`).
- Duplicate vehicle plate and agent alias return `409`.

## Fixes applied

- Added `requireRole` middleware in `src/middleware/roles.js`.
- Restricted `POST /api/agents` to `GODFATHER` users to prevent any logged-in agent from recruiting/promoting accounts.
- Added validation for agent `status`, `isOnline`, `heistCount`, and `missionsCount` before inserting them.
- Converted validated integer body fields with `.toInt()` so Prisma receives numbers, not numeric strings.
- Split Express app creation into `src/app.js` so integration tests can import the app without opening a port.
- Upgraded `bcrypt` to `^6.0.0` to remove production dependency vulnerabilities.

## Automated tests added

`test/security.test.js` covers:

- Missing bearer token on CRUD routes.
- Expired token handling.
- Malformed token handling.
- Invalid mission enum payloads.
- Invalid vehicle foreign-key types.
- Non-GODFATHER agent recruitment denial.
- GODFATHER recruitment numeric sanitization.

## Remaining recommendations

- Set `JWT_SECRET` and `DATABASE_URL` in deployment; the API cannot safely run without them.
- Consider role-based permissions for destructive CRUD operations if normal agents should not edit/delete shared resources.
- Dev-only `npm audit` still reports moderate issues through `@mermaid-js/mermaid-cli` / `prisma-erd-generator`; production audit is clean.

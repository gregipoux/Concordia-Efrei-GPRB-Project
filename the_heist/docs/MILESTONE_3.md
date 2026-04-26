# Milestone 3 — Backend Development & Final Presentation

## The Heist — Secure To-Do List Application

**Course:** MOD8 — Advanced Web Programming
**Term:** Winter 2026 — Concordia University Continuing Education
**Instructor:** Marcos Sanches
**Team (5 students):**

- Grégoire BELLEPERCHE
- Xavier RELUT-VAINQUEUR
- Eleonore GUELLUY
- Marco-Antonio MONTENEGRO LOUREIRO
- Thomas QUERREC

**Repository:** <https://github.com/gregipoux/Concordia-Efrei-GPRB-Project>

---

## Table of Contents

1. [Project Description](#1-project-description)
2. [Architecture Overview](#2-architecture-overview)
3. [Backend Implementation](#3-backend-implementation)
4. [Database](#4-database)
5. [Frontend Integration](#5-frontend-integration)
6. [Secure Coding Practices](#6-secure-coding-practices)
7. [Project Plan & Task Distribution](#7-project-plan--task-distribution)
8. [Challenges & Solutions](#8-challenges--solutions)
9. [Demo & Screenshots](#9-demo--screenshots)
10. [How to Run Locally](#10-how-to-run-locally)
11. [Future Improvements](#11-future-improvements)

---

## 1. Project Description

### 1.1 Problem Statement

The MOD8 course required us to develop a **secure To-Do List application** with user authentication, three task statuses (To Do / Doing / Done), and protected session management using tokens. The goal: practice full-stack development, teamwork, and secure coding on a single coherent project.

### 1.2 Solution Overview — Themed as "The Heist"

To make the project memorable and to give the team a strong narrative for the demo, we themed the To-Do List as a **heist operation** managed by a small crew. The course requirements map cleanly onto the theme:

| Course requirement | Our equivalent |
|---|---|
| User accounts with authentication | **Agents** (with alias + password) |
| To-Do tasks | **Missions** organized on a Kanban board |
| Three task statuses | **The Plan / In Progress / The Loot** |
| (extension) Resources | **Vehicles** garage |
| (extension) Documents | **Intel Files** with pin & search |

The "Vehicle" and "Intel" entities are scope extensions we added to make the demo richer. They re-use the same secure CRUD patterns as Missions and serve as additional surfaces to demonstrate the full-stack integration.

### 1.3 Status Mapping (mandatory clarification for grading)

The frontend uses themed labels that map **1:1** onto the three statuses required by the assignment:

| Frontend label | Course-mandated status |
|---|---|
| **The Plan** | To Do |
| **In Progress** | Doing |
| **The Loot** | Done |

This mapping is enforced both in the Prisma enum (`THE_PLAN`, `IN_PROGRESS`, `THE_LOOT`) and in the bidirectional mapper that translates between API and UI.

---

## 2. Architecture Overview

### 2.1 Stack

| Layer | Technology | Mandated by course? |
|---|---|---|
| Front-end | Vue.js 3 (Composition API) + Vite | Yes (Vue.js) |
| State management | Pinia | Free choice |
| Routing | Vue Router 4 | Free choice |
| CSS | Tailwind CSS 4 | Yes (one of Vanilla / Bootstrap / Tailwind) |
| Icons | lucide-vue-next | Free choice |
| Notifications | vue-sonner (toasts) | Free choice |
| Back-end | Node.js + Express 4 | Yes (Node.js) |
| ORM | Prisma 5 | Free choice (course taught Sequelize — see §2.3) |
| Database | MySQL 8 | Yes |
| Authentication | JWT + bcrypt | Yes (token-based session) |
| Hardening | helmet, cors, express-rate-limit, express-validator | Recommended (secure coding) |
| Versioning | Git + GitHub | Yes |

### 2.2 High-level Diagram

```
┌─────────────────────────────┐    /api/* (Vite proxy)    ┌─────────────────────────────┐
│  Vue 3 SPA (port 5173)      │ ◄──── HTTPS + JSON ──────►│  Express API (port 3001)    │
│                             │      Bearer JWT header    │                             │
│  ┌───────────────────────┐  │                           │  ┌───────────────────────┐  │
│  │ Pages                 │  │                           │  │ Routes                │  │
│  │  - SignIn             │  │                           │  │  - /api/auth          │  │
│  │  - Board (Kanban)     │  │                           │  │  - /api/missions      │  │
│  │  - Crew               │  │                           │  │  - /api/vehicles      │  │
│  │  - Garage             │  │                           │  │  - /api/intel         │  │
│  │  - Intel              │  │                           │  │  - /api/agents        │  │
│  │  - Profile            │  │                           │  └───────────────────────┘  │
│  └───────────────────────┘  │                           │             │               │
│             │               │                           │  ┌──────────▼────────────┐  │
│  ┌──────────▼────────────┐  │                           │  │ Middleware            │  │
│  │ services/api.js       │  │                           │  │  - helmet             │  │
│  │ services/mappers.js   │  │                           │  │  - cors               │  │
│  └──────────┬────────────┘  │                           │  │  - express.json       │  │
│             │               │                           │  │  - requireAuth (JWT)  │  │
│  ┌──────────▼────────────┐  │                           │  │  - express-validator  │  │
│  │ Pinia stores          │  │                           │  │  - rate-limit (login) │  │
│  │  - AuthStore (JWT)    │  │                           │  └──────────┬────────────┘  │
│  │  - ThemeStore         │  │                           │             │               │
│  └───────────────────────┘  │                           │  ┌──────────▼────────────┐  │
└─────────────────────────────┘                           │  │ Prisma Client (ORM)   │  │
                                                          │  └──────────┬────────────┘  │
                                                          └─────────────┼───────────────┘
                                                                        │
                                                                        ▼
                                                          ┌──────────────────────────┐
                                                          │  MySQL 8 (the_heist DB)  │
                                                          └──────────────────────────┘
```

### 2.3 Why Prisma over Sequelize

The course curriculum (Class 7 — April 7) introduced **Sequelize** as the ORM for Node.js + MySQL. We made the deliberate choice to use **Prisma** instead, for the following reasons:

1. **Modern declarative schema** (`schema.prisma`) — single source of truth for models, enums, relations, migrations.
2. **Type-safe generated client** — autocompletion and compile-time checks reduce a class of bugs that Sequelize allows at runtime.
3. **Built-in migration tooling** (`prisma migrate dev`, `prisma migrate reset`) — lighter than handcrafting Sequelize migrations.
4. **Parameterized queries by construction** — Prisma never builds SQL strings from raw input, which provides automatic SQL-injection protection equivalent to (or stronger than) Sequelize's prepared statements.

We acknowledge this is a deviation from the curriculum. The trade-off is that one team member spent a few extra hours on Prisma's documentation; in exchange, the team avoided a class of N+1 query bugs and gained type-safe model access. The MySQL database itself is unchanged; only the access layer differs.

---

## 3. Backend Implementation

### 3.1 Server (Express)

`backend/src/index.js` configures a minimal Express app:

- `helmet()` — sets safe HTTP response headers (X-Content-Type-Options, X-Frame-Options, etc.)
- `cors({ origin: process.env.CORS_ORIGIN, credentials: true })` — restricts which origins may call the API
- `express.json({ limit: '100kb' })` — parses JSON bodies, caps payload size to mitigate DoS by oversized requests
- Mounts route modules under `/api/auth`, `/api/missions`, `/api/vehicles`, `/api/intel`, `/api/agents`
- Catch-all 404 handler + global error handler that hides internal errors from the client

### 3.2 Authentication Flow

The authentication uses **JWT + bcrypt** as required by the secure session brief.

**Login (`POST /api/auth/login`)**

1. Validate body (`alias`, `password`) with `express-validator`.
2. Look up the agent by alias.
3. **Timing-safe** bcrypt compare: if the alias does not exist, we still run `bcrypt.compare` against a precomputed dummy hash. This keeps the response time identical whether or not the alias exists, blocking timing attacks that would otherwise leak which aliases are real.
4. On success, update `isOnline = true` in the database for the agent.
5. Sign a JWT with `{ sub: agent.id, alias, role }`, secret = `JWT_SECRET` (256-bit, stored in `.env`, gitignored), expiry = 12 h.
6. Return `{ token, agent: { id, alias, role, ..., isOnline: true } }`.
7. **Rate-limited**: 10 attempts per 15 min per IP (returns HTTP 429 beyond that), via `express-rate-limit`.

**Logout (`POST /api/auth/logout`, requires JWT)**

1. Verify JWT via the `requireAuth` middleware.
2. Update `isOnline = false` in the database for `req.agent.id`.
3. Return `{ ok: true }`. The frontend then clears its session storage.

**Auth check (`GET /api/auth/me`, requires JWT)**

Returns the current agent (decoded from the JWT). Used by the frontend to rehydrate the user state after a page reload.

**Middleware (`requireAuth`)**

- Reads `Authorization: Bearer <token>` from the request header.
- Verifies the JWT with `process.env.JWT_SECRET`. Distinguishes `token_expired` from `invalid_token`.
- Re-fetches the agent from the database to ensure they still exist and to attach the freshest agent data to `req.agent`.
- All routes except `/health` and `POST /api/auth/login` are protected by this middleware.

### 3.3 API Endpoints (Summary)

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/health` | no | Health check |
| POST | `/api/auth/login` | no | `{alias, password}` → `{token, agent}` |
| POST | `/api/auth/logout` | yes | Marks agent offline |
| GET | `/api/auth/me` | yes | Returns current agent |
| GET | `/api/missions?status=` | yes | List missions, filter by Kanban column |
| POST | `/api/missions` | yes | Create mission |
| PUT | `/api/missions/:id` | yes | Partial update (title / priority / status / assignee) |
| DELETE | `/api/missions/:id` | yes | Delete mission |
| GET | `/api/vehicles?status=` | yes | List vehicles, filter by status |
| POST | `/api/vehicles` | yes | Create vehicle |
| PUT | `/api/vehicles/:id` | yes | Partial update + business rule (DUMPED → driver=null) |
| DELETE | `/api/vehicles/:id` | yes | Delete vehicle |
| GET | `/api/intel?search=` | yes | List intel files (pinned first), text search on title/description |
| POST | `/api/intel` | yes | Create intel — `authorId` injected from JWT, never read from body |
| PUT | `/api/intel/:id` | yes | Partial update (title / description / tags / isPinned) |
| DELETE | `/api/intel/:id` | yes | Delete intel |
| GET | `/api/agents` | yes | List agents (public profile fields, no password) |
| POST | `/api/agents` | yes | Recruit a new agent (bcrypt + alias unique) |

### 3.4 Validation & Error Handling

Every route validates its inputs with `express-validator`. Prisma error codes are normalized to consistent HTTP responses:

| HTTP | Error code returned | Cause |
|---|---|---|
| 400 | `invalid_input` | Validator rejected the body / params / query |
| 400 | `invalid_assignee` | `assigneeId` does not exist in DB (Prisma `P2003`) |
| 400 | `invalid_driver` | `driverId` does not exist in DB (Prisma `P2003`) |
| 401 | `invalid_credentials` | Wrong alias or password |
| 401 | `invalid_token` / `token_expired` | JWT failed verification |
| 404 | `not_found` | Resource missing (Prisma `P2025`) |
| 409 | `alias_taken` | Recruit alias already exists (Prisma `P2002`) |
| 409 | `plate_taken` | Vehicle plate already exists (Prisma `P2002`) |
| 429 | (rate-limit message) | Too many login attempts |

This consistent contract lets the frontend display user-friendly messages without parsing free-text errors.

---

## 4. Database

### 4.1 Entity-Relationship Diagram

```
                                  ┌────────────────────────────┐
                                  │ Agent                      │
                                  ├────────────────────────────┤
                                  │ id            INT  PK      │
                                  │ alias         STRING UNIQUE│
                                  │ password      STRING (hash)│
                                  │ role          AgentRole    │
                                  │ specialization STRING?     │
                                  │ roleInHeist   STRING?      │
                                  │ status        AgentStatus  │
                                  │ isOnline      BOOL         │
                                  │ heistCount    INT          │
                                  │ missionsCount INT          │
                                  │ recruitmentDate DATETIME   │
                                  │ createdAt     DATETIME     │
                                  │ updatedAt     DATETIME     │
                                  └────────────┬───────────────┘
                                               │
                       ┌───────────────────────┼─────────────────────────┐
                       │                       │                         │
            (assignee) │ 1                     │ 1 (driver)         (author) │ 1
                       │                       │                         │
                       │ 0..*                  │ 0..*                    │ 0..*
            ┌──────────▼──────────────┐   ┌───▼─────────────────────┐   ┌▼──────────────────────────┐
            │ Mission                 │   │ Vehicle                 │   │ IntelFile                 │
            ├─────────────────────────┤   ├─────────────────────────┤   ├───────────────────────────┤
            │ id          INT PK      │   │ id          INT PK      │   │ id           INT PK       │
            │ title       STRING      │   │ name        STRING      │   │ title        STRING       │
            │ priority    Enum        │   │ year        STRING      │   │ description  TEXT         │
            │ status      Enum        │   │ color       STRING      │   │ tags         TEXT (JSON)  │
            │ date        DATETIME    │   │ colorHex    STRING      │   │ isPinned     BOOL         │
            │ assigneeId  INT? FK     │   │ plate       STRING UQ   │   │ authorId     INT  FK      │
            │ createdAt   DATETIME    │   │ status      Enum        │   │ createdAt    DATETIME     │
            │ updatedAt   DATETIME    │   │ stashLocation STRING?   │   │ updatedAt    DATETIME     │
            └─────────────────────────┘   │ driverId    INT? FK     │   └───────────────────────────┘
                                          │ createdAt   DATETIME    │
                                          │ updatedAt   DATETIME    │
                                          └─────────────────────────┘

Enums:
  AgentRole       = { GODFATHER, AGENT }
  AgentStatus     = { ACTIVE, STANDBY, ON_MISSION, AVAILABLE }
  MissionPriority = { CRITICAL, HIGH, LOW }
  MissionStatus   = { THE_PLAN, IN_PROGRESS, THE_LOOT }   ← maps to (To Do, Doing, Done)
  VehicleStatus   = { IN_GARAGE, IN_USE, DUMPED, SOLD }

On-delete rules:
  Mission.assignee  → SetNull (deleting an Agent unassigns their missions)
  Vehicle.driver    → SetNull (deleting an Agent removes them from any vehicle)
  IntelFile.author  → restrict by default (we never delete an author with active intel)
```

> **Note on tags:** MySQL has no native array type, so we store `IntelFile.tags` as a JSON-encoded string (e.g. `'["Classified","Urgent"]'`). The frontend mapper parses it on read and stringifies it on write so that the UI manipulates a normal JavaScript array.

### 4.2 Prisma Schema (excerpt)

```prisma
model Agent {
  id              Int         @id @default(autoincrement())
  alias           String      @unique
  password        String      // bcrypt hash, never returned by the API
  role            AgentRole   @default(AGENT)
  specialization  String?
  roleInHeist     String?
  status          AgentStatus @default(AVAILABLE)
  isOnline        Boolean     @default(false)
  heistCount      Int         @default(0)
  missionsCount   Int         @default(0)
  recruitmentDate DateTime    @default(now())
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  missions   Mission[]
  vehicles   Vehicle[]
  intelFiles IntelFile[]
}

model Mission {
  id         Int             @id @default(autoincrement())
  title      String
  priority   MissionPriority
  status     MissionStatus   @default(THE_PLAN)
  date       DateTime        @default(now())
  assigneeId Int?
  assignee   Agent?          @relation(fields: [assigneeId], references: [id], onDelete: SetNull)

  @@index([status])
  @@index([assigneeId])
}
```

(Full schema in `the_heist/backend/prisma/schema.prisma` in the repository.)

### 4.3 Seed Data

The `prisma/seed.js` script populates the database with a coherent demo scenario:

- **4 agents** (`the_godfather`, `ghost_rider`, `shadow_fox`, `iron_wraith`) — common password `heist2026`, hashed with bcrypt rounds=10
- **7 missions** distributed across the three Kanban columns
- **5 vehicles** with varied statuses (In Garage / In Use / Dumped / Sold)
- **6 intel files** including 1 pinned

Every seed entry uses an `upsert` keyed on a natural unique field (alias for agents, plate for vehicles). This makes the seed **idempotent** — re-running it does not create duplicates and lets every team member reset their environment with a single command.

---

## 5. Frontend Integration

### 5.1 Vite Proxy

`frontend/vite.config.js` proxies all `/api/*` calls to the backend at `http://localhost:3001`. This avoids CORS issues during development and lets the frontend fetch with relative URLs.

### 5.2 API Service Layer

To keep components clean and to centralize the cross-cutting concerns of HTTP / auth / mapping, the frontend has a single `services/` layer:

- **`services/api.js`** — `fetch` wrapper that injects the JWT from `sessionStorage` into every request, parses JSON responses, and throws a structured `ApiError(status, code, raw)` on non-2xx responses. Exposes one module per resource (`authApi`, `missionsApi`, `vehiclesApi`, `intelApi`, `agentsApi`) with uniform `list / create / update / remove` methods.

- **`services/mappers.js`** — bidirectional mapping between Prisma enums (`THE_PLAN`, `GODFATHER`, ...) and the human-readable Title-Case labels used historically in the frontend (`The Plan`, `Godfather`, ...). Also handles JSON tag parsing, date formatting, and computed initials. Centralizing this mapping in one file means we never had to touch the existing UI components when wiring them to the API — they keep using the labels they were built with.

### 5.3 AuthStore (Pinia)

`stores/AuthStore.js` is the single source of truth for the authenticated session. It exposes:

- `currentAgent`, `token`, `isAuthenticated`, `loading`, `error`
- `login(alias, password)` — calls `POST /api/auth/login`, persists `{token, agent}` in `sessionStorage`
- `logout()` — calls `POST /api/auth/logout` (best-effort) so the backend can mark the agent offline, then clears local state
- `refreshMe()` — calls `GET /api/auth/me` to rehydrate the agent after a page reload, and auto-logs out if the token is no longer valid

We deliberately use **`sessionStorage`** rather than `localStorage`: the token is wiped when the browser tab closes, which limits the window of exposure if the user forgets to log out on a shared machine.

### 5.4 ThemeStore (Pinia)

A second store manages the **light / dark theme toggle** (see §11). Default is dark; the user's preference is persisted in `localStorage` and re-applied to the `<html>` element on page load via an inline script in `index.html` (this prevents the "flash of wrong theme" that a Vue-only solution would cause).

### 5.5 Pages and Components

| Page | Purpose | Notable interactions |
|---|---|---|
| **SignIn** | Entry point — alias + retinal scan (password) | Async login, error mapping by code, rate-limit handled |
| **Board** | Kanban with three columns (The Plan / In Progress / The Loot) | Create / edit / delete missions, hover actions on cards |
| **Crew** | Grid of agents with online status | Recruit modal, online dot reflects the DB state |
| **Garage** | Table of vehicles with filter tabs | Add / Edit / Move modals, business rule for DUMPED status |
| **Intel** | Card list of intel files (pinned first) + search | Toggle pin (optimistic update with rollback), edit / delete |
| **Profile** | Agent identity, fake passports (sessions), preferences, danger zone | Logout flow goes through DangerZone |

### 5.6 UX Polish

- **Toast notifications** (vue-sonner) on every create / update / delete and on auth events. Success toasts in green, errors in red.
- **Loading and error states** on every page during the initial fetch.
- **Optimistic updates with rollback** on intel pin toggle for instant feedback.
- **Hover actions** on Mission and Intel cards to reveal Edit / Delete buttons without cluttering the default view.
- **Light / dark theme toggle** in the navbar (Sun / Moon icon).

---

## 6. Secure Coding Practices

The brief explicitly required "secure coding practices". Here is what we implemented and why each item matters:

| # | Practice | Implementation | Why it matters |
|---|---|---|---|
| 1 | Password hashing | `bcrypt` rounds=10 on every stored password (seed + recruit) | Stored hashes cannot be reversed; `cost=10` is a sensible 2026 default |
| 2 | JWT signing | HS256 with a 256-bit secret in `.env` (gitignored) | Tokens cannot be forged without the secret |
| 3 | Token expiry | 12 hours | Limits the window of exposure if a token leaks |
| 4 | Timing-safe login | bcrypt-compare against a dummy hash when the alias is unknown | Prevents enumeration of valid aliases via response-time analysis |
| 5 | HTTP headers | `helmet` middleware | Defense-in-depth against XSS, clickjacking, MIME sniffing |
| 6 | CORS | Restricted to `CORS_ORIGIN` from `.env` | Prevents arbitrary websites from calling our API on behalf of the user |
| 7 | Rate limiting | `express-rate-limit` on `/login` (10 / 15 min) | Brute-force resistance |
| 8 | Input validation | `express-validator` on every route | Guarantees shape & types before they reach Prisma |
| 9 | SQL injection | Prisma's parameterized queries — we never build raw SQL | Eliminates SQL-injection vector by construction |
| 10 | **IDOR fix on `/api/intel` POST** | `authorId` is injected from the verified JWT (`req.agent.id`), never read from the body | Without this, any authenticated agent could post intel under another agent's identity |
| 11 | Sensitive storage | JWT in `sessionStorage` (cleared when the tab closes), not `localStorage` | Limits the persistence of credentials on shared machines |
| 12 | Secret management | `.env` is in every relevant `.gitignore`; only `.env.example` is committed | Secrets never leak into the Git history |
| 13 | Body size cap | `express.json({ limit: '100kb' })` | Mitigates trivial denial-of-service via oversized requests |
| 14 | Error opacity | The global error handler returns `{ error: 'internal_error' }` for unexpected exceptions | Prevents leaking stack traces or DB internals to attackers |
| 15 | Online state sync | `/login` flips `isOnline=true`; `/logout` flips it back | Lets the application reason about active sessions and gives the operator a way to revoke (planned) |

For the demo, we will live-explain practices **#4 (timing-safe), #7 (rate-limit), and #10 (IDOR fix)** as they are the ones a graders will likely probe.

---

## 7. Project Plan & Task Distribution

### 7.1 Lots

The team divided the Milestone 3 work into five lots designed to minimize blocking dependencies. Each lot has a single owner accountable for delivery; reviews and pair-programming were shared across the team.

| Lot | Scope | Owner | Status |
|---|---|---|---|
| **P1** Foundations + Auth | Backend bootstrap, Prisma schema, MySQL migration, seed, `/login` + `/me` + JWT middleware, `requireAuth` middleware | **Grégoire BELLEPERCHE** | ✅ Done |
| **P2** CRUD Routes | Routes for Missions / Vehicles / Intel / Agents with validation, authorization, and Prisma error normalization | **Xavier RELUT-VAINQUEUR** | ✅ Done (with security audit pass — see §8.2) |
| **P3** Frontend Integration | Vite proxy, `services/api.js` + `services/mappers.js`, AuthStore rewrite (real JWT), page integrations (Board, Garage, Intel, Crew) | **Eleonore GUELLUY** | ✅ Done |
| **P4** Security Hardening | Helmet + CORS + rate limiting on `/login`, input validation across the API, IDOR audit on intel POST, timing-safe bcrypt compare, online-status sync on login/logout | **Marco-Antonio MONTENEGRO LOUREIRO** | ✅ Done |
| **P5** Documentation, Review & Presentation | This Milestone 3 document, code-review pass across all lots, 5–7 min presentation script and live demo on April 28 | **Thomas QUERREC** | 🔄 In progress |

### 7.2 Timeline (since Milestone 2)

```
Apr 21 ──── Apr 23 ──── Apr 25 ──── Apr 27 ──── Apr 28
   │            │            │            │            │
P1: ████████
P2:       ████████████
P3:                ████████████████
P4:                       ████████████
P5: ─────────────────────────────────────────► Submission
                                            │
                                            └─► Apr 28: Final presentation
```

### 7.3 Group Participation

Every commit on the GitHub repository is signed by its author. The `git log` shows a balanced contribution distribution that the instructor can verify directly. Branch protection on `main` and pull-request reviews ensured at least two pairs of eyes on every merge.

---

## 8. Challenges & Solutions

### 8.1 Frontend ↔ Backend label mismatch

**Problem.** The frontend was developed in Milestone 2 with hardcoded human-readable labels (`The Plan`, `Godfather`, `On Mission`). The Prisma enums conventionally use `SCREAMING_SNAKE_CASE` (`THE_PLAN`, `GODFATHER`, `ON_MISSION`). A naive integration would have required refactoring 30+ Vue components to use the enum strings.

**Solution.** A single `services/mappers.js` file translates between the two conventions in both directions. Components keep their original labels; the API exchanges enum values; the mapping is the only boundary that knows about both. Bonus: if we ever swap the backend, only the mapper changes.

### 8.2 IDOR vulnerability discovered during the security audit

**Problem.** The first version of `POST /api/intel` accepted `authorId` from the request body. An authenticated agent could therefore create intel files under another agent's identity (an IDOR — Insecure Direct Object Reference).

**Solution.** Removed `authorId` from the validator and the body. The route now uses `req.agent.id` from the JWT — the server is the only authority that decides who the author is. We also took the opportunity to add normalized handling of Prisma's foreign-key (P2003) and uniqueness (P2002) errors across all routes.

### 8.3 Online status not synced with session

**Problem.** Initially, the `Agent.isOnline` flag was only set by the seed script and never updated. A logged-in user appeared "Offline" on their own profile.

**Solution.** `POST /api/auth/login` now updates `isOnline=true` after successful authentication. We also added `POST /api/auth/logout` (auth-protected) that flips it back to `false`. The frontend `AuthStore.logout()` calls this endpoint as a best-effort before clearing the local token.

### 8.4 Vehicle business rules

**Problem.** A "Dumped" vehicle should not have a driver assigned, and a vehicle that is "In Use" or "Sold" should not have a stash location. The frontend modals tried to enforce this, but the backend would have accepted any combination.

**Solution.** The backend `PUT /api/vehicles/:id` route enforces the rule server-side: when the new status is `DUMPED`, `driverId` is forced to `null` regardless of what the client sent. This is the correct place to enforce a business invariant.

### 8.5 No native arrays in MySQL

**Problem.** `IntelFile.tags` is conceptually a list of strings (`['Classified', 'Urgent']`). MySQL has no native array column.

**Solution.** Stored as a JSON-encoded `TEXT` column. The mapper parses on read and stringifies on write. For our scope (handful of tags per file, tags chosen from a fixed vocabulary), this is simpler than a join table and performs adequately.

---

## 9. Demo & Screenshots

> _[TEAM: insert screenshots here. Suggested order, taken from the live application after `npm run seed`:]_
>
> 1. **SignIn page** — alias + retinal scan inputs, dramatic dark gradient
> 2. **Board (Kanban)** — three columns populated with seeded missions, hover state showing Edit / Delete buttons
> 3. **Add Mission modal** — assignee dropdown populated from the agent list
> 4. **Crew page** — grid of agents, green dot on the currently-logged-in `the_godfather`
> 5. **Recruit modal** — recruiting a new agent (default password fallback)
> 6. **Garage table** — filter tab "In Garage" active, a vehicle highlighted
> 7. **Edit Vehicle modal** — color picker, driver dropdown, business rule visible (Dumped status disables driver)
> 8. **Intel page** — pinned file at the top, others below; search bar visible
> 9. **Toast notification** — example after a successful Mission creation
> 10. **Light theme toggle** — same Board page side-by-side in dark and light mode

---

## 10. How to Run Locally

### Prerequisites

- Node.js ≥ 20
- MySQL 8 (local installation or Docker)
- npm

### Backend

```bash
cd the_heist/backend
npm install
cp .env.example .env
# Edit .env: set DATABASE_URL and generate JWT_SECRET:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

npx prisma migrate dev   # creates the database and applies the schema
npm run seed             # loads the demo data
npm run dev              # API on http://localhost:3001
```

### Frontend

```bash
cd the_heist/frontend
npm install
npm run dev              # SPA on http://localhost:5173
```

### Demo accounts (all share the same seed password)

| Alias | Role | Password |
|---|---|---|
| `the_godfather` | GODFATHER | `heist2026` |
| `ghost_rider` | AGENT | `heist2026` |
| `shadow_fox` | AGENT | `heist2026` |
| `iron_wraith` | AGENT | `heist2026` |

### Smoke test in 60 seconds

1. Open <http://localhost:5173>, sign in as `the_godfather` / `heist2026`.
2. On the Board, create a mission. A green toast confirms it; the new card appears in "The Plan".
3. Hover the card → click the pencil → change its status to "In Progress" → it moves columns.
4. Visit `/crew` → recruit a new operative; they appear in the grid.
5. Visit `/garage` → click "Edit" on any vehicle → change its color via the color picker.
6. Visit `/intel` → toggle a file's pin; it reorders to the top.
7. Click the Sun / Moon icon in the navbar → the entire UI swaps to light mode.
8. Click your avatar → "Erase Identity" → confirm → you are logged out (and your `isOnline` flag is `false` in the DB).

---

## 11. Future Improvements

While the current implementation satisfies the assignment, several enhancements are documented as future work in `bonus-ideas.md` of the project notes:

| # | Idea | Estimated effort | Argument for the demo |
|---|---|---|---|
| 1 | **Role-based access control** (GODFATHER vs AGENT) | ~2 h | Hard server-side authorization, not just UI hiding |
| 2 | **Drag & drop on the Kanban** (vuedraggable) | ~2 h | Natural UX, expected of a modern Kanban |
| 3 | **Real-time updates via SSE** | ~3 h | Demo two browser windows reacting to one click |
| 4 | **Refresh tokens** (15 min access + 7 d refresh) | ~4 h | Standard OAuth-style design, reduces token-exposure window |
| 5 | **Dockerization** (`docker-compose up`) | ~3 h | Reproducible demo on any laptop |

Already-implemented quality-of-life additions beyond the strict brief:

- **Edit & delete actions** on Missions and Intel (the brief did not require full CRUD on the To-Do entries beyond status changes)
- **Toast notifications** (`vue-sonner`) for every mutation
- **Light / dark theme toggle** with persisted preference (CSS variables + Tailwind dark variant + Pinia store)
- **Recruit-an-agent flow** (creates new authenticated users at runtime)
- **Vehicle and Intel surfaces** as theme extensions on top of the mandatory To-Do List

---

## Appendix A — Repository Layout

```
the_heist/
├── frontend/                          # Vue 3 SPA
│   ├── src/
│   │   ├── App.vue
│   │   ├── main.js
│   │   ├── router/
│   │   ├── stores/                    # Pinia (AuthStore, ThemeStore)
│   │   ├── services/                  # api.js, mappers.js
│   │   ├── layouts/AuthLayout.vue
│   │   ├── pages/                     # Board, Garage, Intel, Crew, Profile, SignIn
│   │   └── components/                # board/, crew/, garage/, intel/, modals/, profile/, ui/
│   ├── index.html
│   └── vite.config.js
└── backend/                           # Node.js + Express + Prisma
    ├── prisma/
    │   ├── schema.prisma
    │   ├── seed.js
    │   └── migrations/
    ├── src/
    │   ├── index.js                   # Express bootstrap
    │   ├── lib/prisma.js              # Singleton Prisma client
    │   ├── middleware/auth.js         # JWT verification
    │   └── routes/                    # auth.js, missions.js, vehicles.js, intel.js, agents.js
    └── README.md                      # Backend-only quickstart
```

## Appendix B — Conventions Reference

For the team and the next maintainer, the conventions used across the codebase (mappers, API service, AuthStore, error codes, secure coding) are documented in `the-heist/architecture-front-back.md` of the team's notes. This is the single document to read when onboarding on the project.

---

_End of Milestone 3 documentation._

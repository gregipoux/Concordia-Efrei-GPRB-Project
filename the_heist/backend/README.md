# the-heist — Backend

API Node.js/Express + Prisma + MySQL pour la To-Do List sécurisée (MOD8).

## Prérequis

- Node.js ≥ 20
- MySQL local (port 3306)
- npm

## Installation

```bash
# 1. Installer les dépendances
cd the_heist/backend
npm install

# 2. Créer le fichier d'environnement
cp .env.example .env
# puis éditer .env et remplir DATABASE_URL + JWT_SECRET
# (JWT_SECRET : node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# 3. Créer la base + appliquer les migrations
npx prisma migrate dev

# 4. Seed les données initiales (agents, missions, véhicules, intel)
npm run seed
```

## Lancement

```bash
# Mode dev (hot reload)
npm run dev

# Mode prod
npm start
```

L'API tourne sur `http://localhost:3001`.

## Comptes seedés

Password commun : **`heist2026`**

| Alias           | Rôle      | Statut     |
| --------------- | --------- | ---------- |
| `the_godfather` | GODFATHER | Active     |
| `ghost_rider`   | AGENT     | Standby    |
| `shadow_fox`    | AGENT     | On Mission |
| `iron_wraith`   | AGENT     | Available  |

## Endpoints disponibles

**Auth** : envoyer `Authorization: Bearer <token>` dans les headers (sauf `/health` et `/api/auth/login`).

### Auth

| Méthode | Route              | Auth | Description                            |
| ------- | ------------------ | ---- | -------------------------------------- |
| GET     | `/health`          | non  | Healthcheck                            |
| POST    | `/api/auth/login`  | non  | `{alias, password}` → `{token, agent}` (rate-limit 10 req / 15 min) |
| GET     | `/api/auth/me`     | oui  | Retourne l'agent courant               |
| POST    | `/api/auth/logout` | oui  | Flip `isOnline = false` côté DB        |

### Missions

| Méthode | Route                    | Auth | Description                                      |
| ------- | ------------------------ | ---- | ------------------------------------------------ |
| GET     | `/api/missions?status=…` | oui  | Liste, filtre optionnel par status               |
| POST    | `/api/missions`          | oui  | `{title, priority, status?, assigneeId?}`        |
| PUT     | `/api/missions/:id`      | oui  | Partial update (title, priority, status, assigneeId) |
| DELETE  | `/api/missions/:id`      | oui  | Supprime une mission                             |

`status` ∈ `THE_PLAN`, `IN_PROGRESS`, `THE_LOOT`. `priority` ∈ `CRITICAL`, `HIGH`, `LOW`.

### Vehicles

| Méthode | Route                    | Auth | Description                                      |
| ------- | ------------------------ | ---- | ------------------------------------------------ |
| GET     | `/api/vehicles?status=…` | oui  | Liste, filtre optionnel par status               |
| POST    | `/api/vehicles`          | oui  | `{name, year, color, colorHex, plate, status?, driverId?, stashLocation?}` |
| PUT     | `/api/vehicles/:id`      | oui  | Partial update — règle métier : `DUMPED` → `driverId=null` |
| DELETE  | `/api/vehicles/:id`      | oui  | Supprime un véhicule                             |

`status` ∈ `IN_GARAGE`, `IN_USE`, `DUMPED`, `SOLD`.

### Intel

| Méthode | Route                    | Auth | Description                                      |
| ------- | ------------------------ | ---- | ------------------------------------------------ |
| GET     | `/api/intel?search=…`    | oui  | Liste (recherche optionnelle title/description), tri pinned d'abord |
| POST    | `/api/intel`             | oui  | `{title, description, tags}` — `authorId` injecté depuis le JWT |
| PUT     | `/api/intel/:id`         | oui  | Partial update (`title`, `description`, `tags`, `isPinned`) |
| DELETE  | `/api/intel/:id`         | oui  | Supprime un fichier intel                        |

Pour toggle un pin, le client envoie `{ isPinned: !current }`.

### Agents (Crew)

| Méthode | Route                    | Auth | Description                                      |
| ------- | ------------------------ | ---- | ------------------------------------------------ |
| GET     | `/api/agents`            | oui  | Liste publique (sans password) avec stats        |
| POST    | `/api/agents`            | oui (GODFATHER) | Recrutement : `{alias, password?, role?, status?, isOnline?, heistCount?, missionsCount?, specialization?, roleInHeist?}` |

`role` ∈ `GODFATHER`, `AGENT` (défaut `AGENT`). `status` ∈ `ACTIVE`, `STANDBY`, `ON_MISSION`, `AVAILABLE` (défaut `AVAILABLE`). `password` ≥ 8 chars, hashé bcrypt côté serveur ; si omis, fallback `heist2026` (default seed password). Un agent non-GODFATHER reçoit `403 forbidden` sur cette route.

### Codes d'erreur normalisés

| Status | Code retourné                | Cause                                        |
| ------ | ---------------------------- | -------------------------------------------- |
| 400    | `invalid_input`              | Validation `express-validator` KO            |
| 400    | `invalid_assignee`           | `assigneeId` mission inexistant (FK)         |
| 400    | `invalid_driver`             | `driverId` vehicle inexistant (FK)           |
| 401    | `invalid_token` / `token_expired` | JWT KO ou expiré                       |
| 401    | `invalid_credentials`        | Login KO                                     |
| 403    | `forbidden`                  | Rôle insuffisant (ex. AGENT sur `POST /api/agents`) |
| 404    | `not_found`                  | Resource introuvable                         |
| 409    | `alias_taken`                | Alias agent déjà pris (unicité)              |
| 409    | `plate_taken`                | Plaque véhicule déjà prise (unicité)         |
| 429    | rate-limited                 | Trop de tentatives login (10 / 15 min)       |

## Scripts npm

| Script                | Action                                  |
| --------------------- | --------------------------------------- |
| `npm run dev`         | Serveur + hot reload (`node --watch`)   |
| `npm start`           | Serveur en mode classique               |
| `npm test`            | Suite de tests sécu (`node:test` + `supertest`) |
| `npm run seed`        | Remplit la DB avec les mocks            |
| `npm run prisma:migrate` | Applique les migrations               |
| `npm run prisma:generate` | Régénère le client Prisma           |
| `npm run prisma:studio`   | Interface GUI pour inspecter la DB  |

## Structure

```
backend/
├── .env                    ← DATABASE_URL, JWT_SECRET (gitignored)
├── .env.example
├── SECURITY_AUDIT.md       ← Audit sécu CRUD (couverture middleware, edge cases, fixes)
├── prisma/
│   ├── schema.prisma       ← 4 modèles + 5 enums
│   ├── seed.js
│   └── migrations/
├── src/
│   ├── app.js              ← createApp() : middlewares + routes + error handler
│   ├── index.js            ← Démarre le serveur (app.listen)
│   ├── lib/prisma.js       ← Singleton PrismaClient
│   ├── middleware/
│   │   ├── auth.js         ← JWT Bearer
│   │   └── roles.js        ← requireRole(...roles)
│   └── routes/             ← auth, missions, vehicles, intel, agents
└── test/
    └── security.test.js    ← 7 tests node:test + supertest (auth + RBAC + validation)
```

## Test rapide (curl)

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"alias":"the_godfather","password":"heist2026"}'

# /me avec le token obtenu
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer <token>"
```

## Reset complet de la DB

```bash
npx prisma migrate reset   # drop + recreate + seed
```

## Sécurité (rappel — consigne "secure coding")

- [x] Passwords hashés bcrypt v6 (rounds=10) — `npm audit --omit=dev` propre
- [x] JWT signé avec secret 256 bits
- [x] Helmet (headers HTTP)
- [x] CORS restreint à l'origine du front
- [x] Rate limiting sur `/login` (10 req / 15 min)
- [x] Validation des inputs (`express-validator`) + `.toInt()` sur les FK numériques
- [x] `.env` gitignored
- [x] Prisma = requêtes paramétrées (pas d'injection SQL)
- [x] Compare bcrypt timing-safe (même coût qu'un user existant ou non)
- [x] IDOR fix `POST /api/intel` : `authorId` injecté depuis le JWT
- [x] RBAC `POST /api/agents` : `requireRole('GODFATHER')`
- [x] Suite de tests sécu (`npm test` — 7 cas)
- [ ] RBAC sur les opérations destructives (DELETE missions / vehicles / intel) — recommandé par `SECURITY_AUDIT.md`

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

## Endpoints disponibles (P1)

| Méthode | Route              | Auth | Description                      |
| ------- | ------------------ | ---- | -------------------------------- |
| GET     | `/health`          | non  | Healthcheck                      |
| POST    | `/api/auth/login`  | non  | `{alias, password}` → `{token, agent}` |
| GET     | `/api/auth/me`     | oui  | Retourne l'agent courant         |

**Auth** : envoyer `Authorization: Bearer <token>` dans les headers.

## Scripts npm

| Script                | Action                                  |
| --------------------- | --------------------------------------- |
| `npm run dev`         | Serveur + hot reload (`node --watch`)   |
| `npm start`           | Serveur en mode classique               |
| `npm run seed`        | Remplit la DB avec les mocks            |
| `npm run prisma:migrate` | Applique les migrations               |
| `npm run prisma:generate` | Régénère le client Prisma           |
| `npm run prisma:studio`   | Interface GUI pour inspecter la DB  |

## Structure

```
backend/
├── .env                    ← DATABASE_URL, JWT_SECRET (gitignored)
├── .env.example
├── prisma/
│   ├── schema.prisma       ← 4 modèles + 5 enums
│   ├── seed.js
│   └── migrations/
└── src/
    ├── index.js            ← Express app (helmet, cors, error handler)
    ├── lib/prisma.js       ← Singleton PrismaClient
    ├── middleware/auth.js  ← JWT Bearer
    └── routes/auth.js      ← /login + /me
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

- [x] Passwords hashés bcrypt (rounds=10)
- [x] JWT signé avec secret 256 bits
- [x] Helmet (headers HTTP)
- [x] CORS restreint à l'origine du front
- [x] Rate limiting sur `/login` (10 req / 15 min)
- [x] Validation des inputs (`express-validator`)
- [x] `.env` gitignored
- [x] Prisma = requêtes paramétrées (pas d'injection SQL)
- [x] Compare bcrypt timing-safe (même coût qu'un user existant ou non)

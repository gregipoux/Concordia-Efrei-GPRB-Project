# Commit Notes

Suggested commit title:

```text
Harden backend CRUD security and add auth edge-case tests
```

Suggested commit body:

```text
- Add reusable requireRole middleware so routes can enforce role-based access.
- Restrict POST /api/agents to GODFATHER users to prevent regular authenticated agents from creating or promoting accounts.
- Validate optional agent fields (status, isOnline, heistCount, missionsCount) before account creation to reject malformed payloads.
- Convert validated integer request fields with express-validator .toInt() so Prisma receives numeric values for assigneeId, driverId, heistCount, and missionsCount.
- Split Express app setup into src/app.js and keep src/index.js focused on starting the server, allowing integration tests to import the app without opening a port.
- Add node:test + supertest security coverage for missing auth, expired token, invalid token, invalid CRUD inputs, forbidden recruitment, and numeric sanitization.
- Upgrade bcrypt to ^6.0.0 to remove production npm audit vulnerabilities caused by the old native dependency chain.
- Document route middleware coverage, edge cases checked, fixes applied, and remaining recommendations in SECURITY_AUDIT.md.
```

Validation run:

```text
npm test
node --check src/index.js && node --check src/app.js && node --check test/security.test.js && npm audit --omit=dev
```

Validation result:

```text
7 tests passed
Production npm audit: 0 vulnerabilities
```

Known follow-up:

```text
Full npm audit still reports dev-only moderate issues through @mermaid-js/mermaid-cli / prisma-erd-generator.
npm run prisma:generate generates Prisma Client but ERD image generation fails in this environment because Chromium cannot launch without browser sandbox support.
```

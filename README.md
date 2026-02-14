# Book API

Express 5 REST API with Prisma ORM and MySQL.

## Setup

```bash
npm install
cp .env.example .env   # configure DATABASE_URL
npx prisma migrate dev  # apply migrations & generate client
npm run server           # start dev server with --watch
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run server` | Start dev server (auto-restart on changes) |
| `npm run db:seed` | Seed the database |

---

## Prisma Migrations Guide

Prisma manages your database schema through **migration files** stored in `prisma/migrations/`. Each migration is a SQL file that transforms the database from one state to the next.

### 1. Creating a migration

After editing `prisma/schema.prisma`, generate a new migration:

```bash
npx prisma migrate dev --name <descriptive-name>
```

This will:
- Compare your schema to the current database
- Generate a new SQL migration file in `prisma/migrations/`
- Apply it to your database
- Regenerate the Prisma Client

Use short, descriptive names like `add-category-model` or `add-unique-to-author-name`.

### 2. Applying existing migrations

When you pull a branch that has new migrations, run:

```bash
npx prisma migrate dev
```

This applies any pending migrations and regenerates the Prisma Client.

### 3. Resetting the database

When migrations are out of sync or conflicting:

```bash
npx prisma migrate reset
```

This will **drop the database**, re-create it, apply all migrations from scratch, and run the seed script. All data will be lost.

### 4. Regenerating the Prisma Client

If the Prisma Client is out of date (e.g. types don't match your schema):

```bash
npx prisma generate
```

This regenerates the client without touching the database. Usually `migrate dev` already does this, but run it manually if you see type mismatches.

### 5. Common problems & solutions

#### Migration conflicts after pulling changes

**Symptom:** `prisma migrate dev` fails because your local database has diverged from the migration history.

**Fix:**
```bash
npx prisma migrate reset
```
This drops and re-creates everything. Safe in development since the seed script restores test data.

#### "Migration has already been applied" drift error

**Symptom:** Prisma says a migration was already applied but the database doesn't match.

**Fix:**
```bash
npx prisma migrate reset
```
If the error persists, delete the `prisma/migrations/` folder, then create a fresh baseline:
```bash
npx prisma migrate dev --name init
```

#### Schema changes without a migration

**Symptom:** You changed `schema.prisma` but forgot to create a migration. The database doesn't reflect your changes.

**Fix:** Create the migration:
```bash
npx prisma migrate dev --name <describe-your-change>
```

If you just want to push the schema directly without creating a migration file (quick prototyping only):
```bash
npx prisma db push
```
Note: `db push` does **not** create migration files and should not be used when you need a reproducible migration history.

#### When to delete `prisma/migrations/` and start fresh

Only do this in **development** when:
- The migration history is too broken to reset cleanly
- You want a single clean baseline migration

Steps:
```bash
rm -rf prisma/migrations
npx prisma migrate dev --name init
```

Never do this in production or on shared branches with applied migrations.

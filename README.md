# Next.js App Router Template

Fullstack Next.js project template using App Router.

## Features

- Based on new Next.js App Router and Server Components
- Internationalization (i18n) using next-intl including support for Server Components
- Type-safe translation messages in React Components
- Client-side data fetching using tRPC + superjson
- Client-side form validation using React Hook Form + Zod schemas
- Data persistence using Drizzle ORM including database migrations
- Authentication using next-auth with database session storage using Drizzle ORM adapter
- Personalized server-side rendering (using next-auth session in Server Components)
- Type-safe environment variables with validation using Zod

## Getting Started

### Prepare Database

The database is required for persistence of app data and sessions.

1. Set up a [PostgreSQL](https://www.postgresql.org/) installation.
2. Create a database with a `public` schema.

### Prepare GitHub OAuth Client

The OAuth client is required to sign in with GitHub account.

1. Go to <https://github.com/settings/apps>.
2. Create a GitHub App.
   - Homepage URL: <http://localhost:3000>
   - Callback URL: <http://localhost:3000/api/auth/callback/github>
   - Account permissions - Email addresses: Read only
3. Save the client ID and client secret.

### Create Local Environment

1. Create a file `.env.local` in the project directory with the following variables.

   ```bash
   # Database connection string
   DB_URL=postgres://username:password@localhost:5432/database
   # Client ID of GitHub app
   GITHUB_CLIENT_ID=12345
   # Client secret of GitHub app
   GITHUB_CLIENT_SECRET=23456
   # Absolute base URL of Next.js app
   NEXTAUTH_URL=http://localhost:3000
   # next-auth secret, e.g. generate with "openssl rand -hex 32"
   NEXTAUTH_SECRET=34567
   ```

2. Install [pnpm](https://pnpm.io/) package manager.
3. Run dependencies installation in the project directory.

   ```bash
   pnpm install
   ```

4. Run database migrations in the project directory.

   ```bash
   pnpm db:migrate
   ```

5. Run development server in the project directory.

   ```bash
   pnpm dev
   ```

Open <http://localhost:3000> with your browser.

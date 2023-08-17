# Next.js App Router Template

Fullstack [Next.js](https://nextjs.org/) project template using App Router.

## Features

- Based on new [Next.js](https://nextjs.org/) App Router and [Server Components](https://nextjs.org/docs/getting-started/react-essentials)
- Internationalization (i18n) using [next-intl](https://next-intl-docs.vercel.app/) including support for Server Components
- Type-safe keys for translation messages in React Components
- Client-side data fetching with end-to-end type-safety using [tRPC](https://trpc.io/) + [superjson](https://github.com/blitz-js/superjson) + [React Query](https://tanstack.com/query)
- Client-side form validation using [React Hook Form](https://www.react-hook-form.com/) + [Zod](https://zod.dev/) schemas
- Data persistence using [Drizzle ORM](https://orm.drizzle.team/) including database migrations
- Authentication using [NextAuth.js](https://next-auth.js.org/) with database session storage using [Drizzle ORM adapter](https://authjs.dev/reference/adapter/drizzle)
- Personalized server-side rendering (using NextAuth.js session in Server Components)
- Type-safe environment variables with validation using Zod (inspired by [Create T3 App](https://create.t3.gg/))

## Getting Started

### Prepare Database

The database is required for persistence of app data and NextAuth.js sessions.

1. Set up a [PostgreSQL](https://www.postgresql.org/) installation.
2. Create a database with a `public` schema.

### Prepare GitHub OAuth Client

The OAuth client is required to sign in with GitHub account. You can swap providers in `src/server/auth.ts` if you want to use different identity providers.

1. Go to <https://github.com/settings/apps>.
2. Create a GitHub App.
   - Homepage URL: <http://localhost:3000>
   - Callback URL: <http://localhost:3000/api/auth/callback/github>
   - Account permissions - Email addresses: Read only
3. Save the client ID and client secret for next step.

### Create Local Environment

1. Create a file `.env.local` in the project directory with the following variables.

   ```bash
   # Database connection string for Next.js app
   DB_URL=postgres://username:password@localhost:5432/database
   # Database connection string for database migration
   DB_MIGRATE_URL=postgres://username:password@localhost:5432/database
   # Client ID of GitHub app
   GITHUB_CLIENT_ID=12345
   # Client secret of GitHub app
   GITHUB_CLIENT_SECRET=23456
   # Absolute base URL of Next.js app
   NEXTAUTH_URL=http://localhost:3000
   # NextAuth.js secret, e.g. generate with "openssl rand -hex 32"
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

### Create Production Server

1. Run production build in the project directory.

   ```bash
   pnpm build
   ```

2. Run production server in the project directory.

   ```bash
   pnpm start
   ```

## Project Structure

### General Structure

- `.vscode`: Project-specific configuration for Visual Studio Code. Contains a launch configuration for debugging in Chrome.
- `drizzle`: Drizzle ORM migrations directory. Should only be modified using [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) commands.
- `public`: Public assets like favicons to include in Next.js app.
- `src/app`: Next.js app directory containing routes. See below for more details.
- `src/components`: Contains React components shared by the whole Next.js app.
- `src/messages`: Contains next-intl translation files for the supported locales.
- `src/schemas`: Contains Zod schemas shared by tRPC procedures and client-side form validation.
- `src/server`: Contains server-side implementation like tRPC router, Drizzle database client and NextAuth.js configuration. See below for more details.
- `src/auth.ts`: Authentication-specific helpers shared by the whole Next.js app (client-side and server-side).
- `src/env.mjs`: Provides type-safe access to environment variables. Variables must be declared here with appropriate Zod schema.
- `src/globals.css`: Global stylesheet loaded by root layouts.
- `src/i18n.ts`: Internationalization-specific configuration and helpers shared by the whole Next.js app (client-side and server-side).
- `src/messages.d.ts`: Type declaration to enable type-safe keys for next-intl functions like `useTranslations`. Infers type from `src/messages/en.json`.
- `src/middleware.ts`: Next.js middleware executed for every server request except API routes and static ressources. See below for more details.
- `src/next-auth.d.ts`: Type declaration to augment NextAuth.js session interface to reflect user data provided by `session` callback in auth options.
- `src/trpc.ts`: tRPC client based on React Query. Used for type-safe calls to tRPC procedures from React client components.

### App Directory Structure

- `src/app/[locale]`: Localized base route for all pages of the app.
  - `src/app/[locale]/_components`: Contains React components shared by all pages or layouts, e.g. page layout component with common React context providers.
  - `src/app/[locale]/_providers`: Contains React context providers shared by all pages or layouts.
  - `src/app/[locale]/(auth)`: Route group for authentication-related pages, e.g. sign-in page.
  - `src/app/[locale]/(auth)/layout.tsx`: Root layout component for authentication-related pages. Demonstrates how to apply different root layout to some pages.
  - `src/app/[locale]/(auth)/auth/signin`: Contains sign-in page component and its related React components.
  - `src/app/[locale]/(default)`: Route group for all other pages.
  - `src/app/[locale]/(default)/layout.tsx`: Root layout component for all other pages.
  - `src/app/[locale]/(default)/page.tsx`: Home page component.
  - `src/app/[locale]/(default)/todos`: Contains todos page component and its related React components and hooks.
- `src/app/api`: Base route for all API endpoints of the app.
  - `src/app/api/auth/[...nextauth]/route.ts`: Route handler for NextAuth.js to process authentication.
  - `src/app/api/trpc/[trpc]/route.ts`: Route handler for tRPC to process calls to tRPC procedures.

### Server Directory Structure

- `src/server/api`: Contains tRPC routers implementing the tRPC procedures.
- `src/server/api/router.ts`: Root API router merging all partial routers to one tRPC router.
- `src/server/api/todos/router.ts`: Partial tRPC router for todos procedures.
- `src/server/db`: Contains Drizzle ORM database client, schema definition and migration script.
- `src/server/db/db.ts`: Drizzle ORM database client used to perform database operations in the app.
- `src/server/db/migrate.mjs`: Node.js script to run database migrations.
- `src/server/db/schema.ts`: Drizzle ORM database schema defining tables and its relations.
- `src/server/auth-i18n-middleware.ts`: Partial middleware function to handle i18n on sign-in page. See below for more details.
- `src/server/auth.ts`: NextAuth.js configuration defining identity providers, database adapter and more settings.
- `src/server/i18n-middleware.ts`: next-intl middleware with i18n configuration.
- `src/server/i18n.ts`: next-intl server request config providing messages for React Server Components.
- `src/server/trpc.ts`: tRPC server configuration with NextAuth.js session integration for protected procedures.

### Middleware

[Next.js middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) is required for two i18n-related features in this project.

1. Since NextAuth.js has no concept for multi-language support on its pages yet invocations of `signIn()` will send users to the exact same route `/en/auth/signin` (configured in NextAuth.js settings) no matter which locale they are currently using. Users coming from a locale other than `en` would switch to English on the sign-in page. The middleware handles this scenario by checking if the incoming request matches the sign-in page and contains a callback URL with a locale. If so, it extracts the locale from the callback URL (which is the original locale of the user) and redirects to the sign-in page using this original locale. Thus, users coming from the locale `de` will eventually land on `/de/auth/signin` and see the German version of the sign-in page.
2. Next.js has dropped built-in support for internationalized routing with the app router. Instead, developers are supposed to [build their own solution](https://nextjs.org/docs/app/building-your-application/routing/internationalization) which involves creating middleware logic to handle redirects to the user's preferred language. Luckily, next-intl provides a middleware implementation to handle everything for us.

## License

[MIT](https://opensource.org/licenses/MIT)

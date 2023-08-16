import nextIntlPlugin from "next-intl/plugin";

/**
 * Run `build` or `dev` script with `SKIP_ENV_VALIDATION` to skip validation
 * of environment variables. This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/**
 * Create config wrapper required for using next-intl with RSCs.
 * See https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
 */
const withNextIntl = nextIntlPlugin("./src/server/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({});

export default nextConfig;

import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";

import { server, serverBaseUrl } from "./server";

process.env.NEXTAUTH_URL = serverBaseUrl;
process.env.NEXTAUTH_SECRET = "topsecret";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

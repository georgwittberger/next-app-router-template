import { setupServer } from "msw/node";
import { http, HttpResponse, type JsonBodyType } from "msw";
import superjson from "superjson";

export const serverBaseUrl = "http://localhost:9999";
export const serverTrpcUrl = `${serverBaseUrl}/api/trpc`;
export const server = setupServer();

type TrpcQueryBodyResolver = (
  info: Parameters<Parameters<typeof http.get>[1]>[0],
) => JsonBodyType;

export const createTrpcQueryHandler = (
  query: string,
  bodyResolver: TrpcQueryBodyResolver,
) =>
  http.get(`${serverTrpcUrl}/${query}`, (info) => {
    return HttpResponse.json({
      result: {
        data: superjson.serialize(bodyResolver(info)),
      },
    });
  });

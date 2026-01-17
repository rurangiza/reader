import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "@api/types/api";

const fetchClient = createFetchClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000",
  fetch: (request: Request) =>
    fetch(request, {
      credentials: "include",
    }),
});
export const $api = createClient(fetchClient);

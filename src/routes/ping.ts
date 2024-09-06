import type { ArbitraryResponse } from "@types";

export function Route(req: Request): ArbitraryResponse {
    return new Response("Pong");
}
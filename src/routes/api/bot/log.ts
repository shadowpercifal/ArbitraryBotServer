import { LogMessage } from "@bot";
import type { ArbitraryResponse } from "@types";

export function Route(req: Request): ArbitraryResponse {
    const reqUrl: URL = new URL(req.url);
    if (!reqUrl.searchParams.has("message")) {
        return new Response("No message provided");
    }
    return new Promise(async (resolve, reject) => {
        const success = await LogMessage(reqUrl.searchParams.get("message")?.toString() ?? "Error logging");
        resolve(new Response(success ? "success" : "error"));
    });
}
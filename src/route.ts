import { Routes } from "@routes";
import type { ArbitraryResponse } from "@types";

export function RouteRequest(req: Request): ArbitraryResponse {
    const reqUrl: URL = new URL(req.url);
    let path = reqUrl.pathname;
    if (path.endsWith("/")) path = path.substring(0, path.length - 2);
    console.log(`Routing path ${path}`);
    if (Object.keys(Routes).includes(path)) {
        console.log(`Route found!`);
        return Routes[path](req);
    }
    console.log("Route not found");
    return new Response("404 Not found");
}
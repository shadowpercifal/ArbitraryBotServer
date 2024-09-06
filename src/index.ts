import { Login } from "@bot";
import Configure from "@logs";
import { RouteRequest } from "@route";
import type { ArbitraryResponse } from "@types";
Configure("K8_Test_bot");

console.log("Starting server");
const server = Bun.serve({
    fetch(req: Request): ArbitraryResponse {
        return RouteRequest(req);
    },
    hostname: Bun.env.HOST,
    port: Bun.env.PORT
});
console.log(`Server started on ${Bun.env.HOST}:${Bun.env.PORT}`);
console.log("Starting discord bot");
Login(Bun.env.TOKEN);
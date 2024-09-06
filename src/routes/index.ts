import { Route as LogRoute } from "./api/bot/log";
import { Route as PingRoute } from "./ping";
export const Routes: Record<string, Function> = {
    "/api/bot/log": LogRoute,
    "/ping": PingRoute
};
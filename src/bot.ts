import { CurrentTimestamp } from "@utils";
import { BaseGuildTextChannel, Client } from "discord.js";

const _Bot = new Client({ intents: "GuildMessages" });;

export const Bot = _Bot;

_Bot.once("ready", () => {
    console.log(`Logged in as ${_Bot.user?.tag} (${_Bot.user?.id})`);
});

export async function LogMessage(text: string): Promise<Boolean> {
    console.log(`Logging message ${text}`);
    if (!Bun.env.CHANNEL_ID) {
        console.log("ENV CHANNEL_ID is not provided!");
        return false;
    }
    const log_channel = await _Bot.channels.fetch(Bun.env.CHANNEL_ID);
    if (!(log_channel instanceof BaseGuildTextChannel)) {
        console.log(`Specified channel (${log_channel!.id}) is not GuildTextChannel`)
        return false;
    }
    console.log(`Message sent!`);
    log_channel.send({ content: `[<t:${CurrentTimestamp()}:T>] \`${text}\`` });
    return true;
}

export function Login(token: string | undefined): undefined {
    if (!token) return;
    _Bot.login(token);
}
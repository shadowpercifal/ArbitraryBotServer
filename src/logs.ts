import { createWriteStream, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { format } from "util";
function AppData() {
    return process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share");
}
export default function Configure(appName: string, ...additionalPaths: string[]) {
    process.on("uncaughtException", (err) => {
        console.log(`[Error] UncaughtException:`);
        console.log(err);
    });
    function GetLogTime() {
        let currentdate = new Date();
        return currentdate.getDate() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear() + "_"
            + currentdate.getHours() + "."
            + currentdate.getMinutes() + "."
            + currentdate.getSeconds();
    }

    const logsDirPath = join(AppData(), appName, "Logs", ...additionalPaths);

    if (!existsSync(logsDirPath)) {
        mkdirSync(logsDirPath, { recursive: true });
    }
    const logFilePath = join(logsDirPath, `${appName}_Logs_${GetLogTime()}.txt`);
    console.log("Starting logging on", logFilePath);
    const log_file = createWriteStream(logFilePath, { flags: 'w' });
    const log_stdout = process.stdout;

    console.log = function (d) { //
        log_file.write(format("[" + GetLogTime() + "] " + d) + '\n');
        log_stdout.write(format(d) + '\n');
    };
}